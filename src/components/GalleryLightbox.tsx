import { useState, useEffect, useCallback, useRef } from "react";

interface Props {
  images: string[];
  alt?: string;
}

export default function GalleryLightbox({ images, alt = "" }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = () => setLightbox(null);
  const go = useCallback((dir: number) => {
    setLightbox((prev) => prev === null ? null : (prev + dir + images.length) % images.length);
  }, [images.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, go]);

  return (
    <>
      {/* Grid */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 space-y-4">
        {images.map((src, i) => (
          <div
            key={src}
            className="break-inside-avoid overflow-hidden cursor-pointer"
            onClick={() => setLightbox(i)}
          >
            <img
              src={src}
              alt={alt}
              className="w-full object-cover transition-opacity duration-300 hover:opacity-80"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Image */}
          <img
            src={images[lightbox]}
            alt={alt}
            className="max-h-screen max-w-full object-contain select-none"
            style={{ maxHeight: "90vh", maxWidth: "90vw" }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Close — highest z so it's never covered */}
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            style={{ zIndex: 60 }}
            className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl leading-none transition-colors"
            aria-label="Close"
          >
            ×
          </button>

          {/* Prev — full height left zone, stops below top 60px to avoid X */}
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="absolute left-0 bottom-0 flex items-center justify-start pl-5 text-white/60 hover:text-white transition-colors text-sm"
            style={{ top: "60px", width: "25%" }}
            aria-label="Previous"
          >
            &#8592;
          </button>

          {/* Next — full height right zone, stops below top 60px to avoid X */}
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="absolute bottom-0 flex items-center justify-end pr-5 text-white/60 hover:text-white transition-colors text-sm"
            style={{ top: "60px", right: 0, width: "25%" }}
            aria-label="Next"
          >
            &#8594;
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
