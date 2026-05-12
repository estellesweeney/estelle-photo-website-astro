import { useState, useEffect, useCallback } from "react";

interface Props {
  images: string[];
  alt?: string;
}

export default function GalleryLightbox({ images, alt = "" }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = () => setLightbox(null);
  const go = useCallback((dir: number) => {
    setLightbox((prev) => prev === null ? null : (prev + dir + images.length) % images.length);
  }, [images.length]);

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
        >
          {/* Image */}
          <img
            src={images[lightbox]}
            alt={alt}
            className="max-h-screen max-w-full object-contain select-none"
            style={{ maxHeight: "90vh", maxWidth: "90vw" }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl leading-none transition-colors"
            aria-label="Close"
          >
            ×
          </button>

          {/* Prev — full height left zone */}
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="absolute left-0 top-0 h-full w-1/4 flex items-center justify-start pl-5 text-white/60 hover:text-white transition-colors text-sm"
            aria-label="Previous"
          >
            &#8592;
          </button>

          {/* Next — full height right zone */}
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="absolute right-0 top-0 h-full w-1/4 flex items-center justify-end pr-5 text-white/60 hover:text-white transition-colors text-sm"
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
