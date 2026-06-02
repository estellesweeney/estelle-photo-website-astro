import { useState, useEffect, useCallback, useRef } from "react";

interface Props {
  images: string[];
  alt?: string;
}

function preload(src: string) {
  const img = new window.Image();
  img.src = src;
}

export default function GalleryLightbox({ images, alt = "" }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const open = (i: number) => {
    setLoaded(false);
    setLightbox(i);
  };

  const close = () => setLightbox(null);

  const go = useCallback(
    (dir: number) => {
      setLoaded(false);
      setLightbox((prev) =>
        prev === null ? null : (prev + dir + images.length) % images.length
      );
    },
    [images.length]
  );

  // Preload adjacent images whenever index changes
  useEffect(() => {
    if (lightbox === null) return;
    preload(images[(lightbox + 1) % images.length]);
    preload(images[(lightbox - 1 + images.length) % images.length]);
  }, [lightbox, images]);

  // Keyboard nav + scroll lock
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

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <>
      {/* ── Thumbnail grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
        {images.map((src, i) => (
          <button
            key={src}
            className="block w-full overflow-hidden bg-[#111] focus:outline-none group"
            style={{ aspectRatio: "3 / 2" }}
            onClick={() => open(i)}
            aria-label={`${alt} ${i + 1}`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-85"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Spinner — shows until image loads */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200"
            style={{ opacity: loaded ? 0 : 1 }}
          >
            <div className="w-5 h-5 rounded-full border-2 border-white/15 border-t-white/50 animate-spin" />
          </div>

          {/* Main image — key forces remount on index change so onLoad fires correctly */}
          <img
            key={lightbox}
            src={images[lightbox]}
            alt={alt}
            className="object-contain select-none transition-opacity duration-300 pointer-events-none"
            style={{
              maxHeight: "90vh",
              maxWidth: "88vw",
              opacity: loaded ? 1 : 0,
            }}
            onLoad={() => setLoaded(true)}
            draggable={false}
          />

          {/* Close */}
          <button
            className="absolute top-5 right-6 text-white/50 hover:text-white transition-colors text-3xl leading-none z-10"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Prev */}
          <button
            className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start pl-5 text-white/40 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous"
          >
            <span className="text-lg">&#8592;</span>
          </button>

          {/* Next */}
          <button
            className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end pr-5 text-white/40 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next"
          >
            <span className="text-lg">&#8594;</span>
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.2em]">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
