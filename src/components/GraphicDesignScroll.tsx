import { useState, useRef } from "react";
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

  const scrollToImages = () => {
    imagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section style={{ borderTop: index > 0 ? "1px solid rgba(245,240,232,0.06)" : "none" }}>

      {/* ── Cover / hero ── */}
      {hasCover && (
        <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", maxHeight: "90vh" }} className="project-cover">
          <img
            src={piece.cover}
            alt={piece.title}
            draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
          {/* Overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(13,13,13,0.88) 100%)" }} />

          {/* Title + meta */}
          <div style={{ position: "absolute", bottom: "32px", left: "40px", right: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }} className="cover-meta">
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
              <button onClick={scrollToImages}
                style={{ background: "none", border: "1px solid rgba(245,240,232,0.25)", borderRadius: "50%", width: "48px", height: "48px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: cream, fontSize: "18px", flexShrink: 0, transition: "border-color 0.2s, background 0.2s" }}
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
              <ImageTile key={i} src={src} alt={`${piece.title} ${i + 1}`} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ImageTile({ src, alt }: { src: string; alt: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#111", cursor: "zoom-in" }}
      className="image-tile"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.7s ease",
          display: "block",
        }}
      />
    </div>
  );
}
