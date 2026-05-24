import { useState, useEffect, useCallback } from "react";

interface Props {
  images: (string | null)[];
  brand: string;
}

export default function RunwayGalleryGrid({ images, brand }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Only real photos for the lightbox swipe sequence
  const photos = images.filter((src): src is string => src !== null);

  const open = (src: string) => {
    const idx = photos.indexOf(src);
    if (idx !== -1) setLightbox(idx);
  };

  const close = () => setLightbox(null);

  const go = useCallback(
    (dir: number) => {
      setLightbox((prev) =>
        prev === null ? null : (prev + dir + photos.length) % photos.length
      );
    },
    [photos.length]
  );

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
      <div
        style={{ columns: 2, gap: "3px" }}
      >
        {images.map((src, i) => (
          <div key={i} className="break-inside-avoid mb-[3px]">
            {src ? (
              <div
                className="w-full overflow-hidden cursor-pointer group"
                style={{ aspectRatio: "4/5" }}
                onClick={() => open(src)}
              >
                <img
                  src={src}
                  alt={`${brand} ${i + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ) : (
              <div
                className="w-full border border-white/10 flex items-center justify-center"
                style={{
                  aspectRatio: "4/5",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span className="text-white/15 text-xs tracking-[0.2em] uppercase select-none font-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={close}
        >
          {/* Image */}
          <img
            src={photos[lightbox]}
            alt={`${brand} ${lightbox + 1}`}
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div
            className="absolute top-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.2em] uppercase text-white/40"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {lightbox + 1} / {photos.length}
          </div>

          {/* Close */}
          <button
            className="absolute top-5 right-6 text-white/50 hover:text-white text-xl transition-colors"
            onClick={close}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Left arrow */}
          <button
            className="absolute left-0 top-0 h-full w-1/4 flex items-center justify-start pl-6 text-white/40 hover:text-white transition-colors text-2xl"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous"
          >
            ←
          </button>

          {/* Right arrow */}
          <button
            className="absolute right-0 top-0 h-full w-1/4 flex items-center justify-end pr-6 text-white/40 hover:text-white transition-colors text-2xl"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
