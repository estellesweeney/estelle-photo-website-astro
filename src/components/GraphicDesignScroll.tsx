import { useState, useRef, useEffect, useCallback } from "react";
import { galleryPieces } from "@/data/graphicDesign";

const cream = "rgba(245,240,232,0.9)";
const dim   = "rgba(245,240,232,0.35)";

export default function GraphicDesignScroll() {
  return (
    <div style={{ background: "#0d0d0d", paddingTop: "80px", minHeight: "100vh" }}>
      {galleryPieces.map((piece, pi) => (
        <ProjectSection key={piece.slug} piece={piece} index={pi} />
      ))}

      {/* Footer spacer */}
      <div style={{ padding: "80px 40px", borderTop: "1px solid rgba(245,240,232,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "11px", letterSpacing: "0.18em", color: "rgba(245,240,232,0.2)", textTransform: "uppercase" }}>
          Estelle Sweeney
        </span>
        <a href="/" style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.2)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = cream)}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.2)")}
        >
          ↑ Back to top
        </a>
      </div>
    </div>
  );
}

function ProjectSection({ piece, index }: { piece: (typeof galleryPieces)[0]; index: number }) {
  const imagesRef = useRef<HTMLDivElement>(null);
  const hasImages = piece.images && piece.images.length > 0;
  const hasCover  = !!piece.cover;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // All images available for this project (cover first if present, then the rest)
  const allImages = [
    ...(piece.cover ? [piece.cover] : []),
    ...(piece.images ?? []),
  ];

  const openLightbox = (src: string) => {
    const i = allImages.indexOf(src);
    setLightboxIndex(i >= 0 ? i : 0);
  };

  const scrollToImages = () => {
    imagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section style={{ borderTop: index > 0 ? "1px solid rgba(245,240,232,0.06)" : "none" }}>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox images={allImages} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}

      {/* ── Cover / hero ── */}
      {hasCover && (
        <div
          onClick={() => openLightbox(piece.cover!)}
          style={{ position: "relative", width: "100%", maxHeight: "90vh", overflow: "hidden", background: "#0d0d0d", cursor: "zoom-in" }}
          className="project-cover"
        >
          <img
            src={piece.cover}
            alt={piece.title}
            draggable={false}
            style={{ width: "100%", height: "auto", maxHeight: "90vh", objectFit: "contain", display: "block", pointerEvents: "none" }}
          />
          {/* Overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(13,13,13,0.88) 100%)", pointerEvents: "none" }} />

          {/* Title + meta */}
          <div style={{ position: "absolute", bottom: "32px", left: "40px", right: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", pointerEvents: "none" }} className="cover-meta">
            <div>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: dim, margin: "0 0 8px" }}>
                {piece.medium}{piece.year ? ` · ${piece.year}` : ""}
              </p>
              <h2 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(22px, 3vw, 40px)", fontWeight: 400, letterSpacing: "0.05em", color: cream, margin: 0 }}>
                {piece.title}
              </h2>
            </div>

            {/* Scroll arrow */}
            {hasImages && (
              <button
                onClick={(e) => { e.stopPropagation(); scrollToImages(); }}
                style={{ background: "none", border: "1px solid rgba(245,240,232,0.25)", borderRadius: "50%", width: "48px", height: "48px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: cream, fontSize: "18px", flexShrink: 0, transition: "border-color 0.2s, background 0.2s", pointerEvents: "all" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cream; e.currentTarget.style.background = "rgba(245,240,232,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,240,232,0.25)"; e.currentTarget.style.background = "none"; }}
                aria-label="Scroll to images"
              >
                ↓
              </button>
            )}
          </div>
        </div>
      )}

      {/* Placeholder if no cover */}
      {!hasCover && (
        <div style={{ padding: "60px 40px 24px" }}>
          <h2 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(22px, 3vw, 40px)", fontWeight: 400, letterSpacing: "0.05em", color: cream, margin: 0 }}>
            {piece.title}
          </h2>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: dim, margin: "10px 0 0" }}>
            {piece.medium}{piece.year ? ` · ${piece.year}` : ""} · Coming soon
          </p>
        </div>
      )}

      {/* ── Images grid ── */}
      {hasImages && (
        <div ref={imagesRef} style={{ padding: "2px 2px 0" }}>
          <div className="images-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px" }}>
            {piece.images!.map((src, i) => (
              <ImageTile key={i} src={src} alt={`${piece.title} ${i + 1}`} onClick={() => openLightbox(src)} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ImageTile({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{ position: "relative", overflow: "hidden", background: "#111", cursor: "zoom-in" }}
      className="image-tile"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.7s ease",
        }}
      />
    </div>
  );
}

// ── Fullscreen lightbox ────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const [loaded, setLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((dir: number) => {
    setLoaded(false);
    setIdx(i => (i + dir + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  // Preload adjacent
  useEffect(() => {
    const preload = (src: string) => { const img = new window.Image(); img.src = src; };
    preload(images[(idx + 1) % images.length]);
    preload(images[(idx - 1 + images.length) % images.length]);
  }, [idx, images]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.97)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Spinner */}
      {!loaded && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.15)", borderTopColor: "rgba(255,255,255,0.5)", animation: "spin 0.8s linear infinite" }} />
        </div>
      )}

      {/* Image */}
      <img
        key={idx}
        src={images[idx]}
        alt=""
        draggable={false}
        onLoad={() => setLoaded(true)}
        onClick={e => e.stopPropagation()}
        style={{
          maxHeight: "92vh", maxWidth: "90vw",
          objectFit: "contain",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* Close */}
      <button onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{ position: "absolute", top: "18px", right: "22px", background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: "28px", cursor: "pointer", lineHeight: 1, padding: "8px", transition: "color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.color = "white")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
        aria-label="Close"
      >
        &times;
      </button>

      {/* Prev zone */}
      <button onClick={(e) => { e.stopPropagation(); go(-1); }}
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "22%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", paddingLeft: "20px", color: "rgba(255,255,255,0.3)", fontSize: "20px", transition: "color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.color = "white")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
        aria-label="Previous"
      >
        ←
      </button>

      {/* Next zone */}
      <button onClick={(e) => { e.stopPropagation(); go(1); }}
        style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "22%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "20px", color: "rgba(255,255,255,0.3)", fontSize: "20px", transition: "color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.color = "white")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
        aria-label="Next"
      >
        →
      </button>

      {/* Counter */}
      <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.28)", fontFamily: "Arial, sans-serif", fontSize: "11px", letterSpacing: "0.2em" }}>
        {idx + 1} / {images.length}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
