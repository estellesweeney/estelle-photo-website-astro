import { useState, useEffect, useCallback } from "react";
import { galleryPieces, type GalleryPiece } from "@/data/graphicDesign";

// ─── Frame ────────────────────────────────────────────────────────────────────

function Frame({
  piece,
  variant,
}: {
  piece: GalleryPiece;
  variant: "main" | "side";
}) {
  const mat = variant === "main" ? 16 : 9;
  const frameW = variant === "main" ? "clamp(200px, 34vw, 520px)" : "clamp(100px, 16vw, 240px)";

  return (
    <div
      style={{
        padding: `${mat}px`,
        background: "#ede8dc",
        border: `${variant === "main" ? 3 : 2}px solid #1c1c1c`,
        boxShadow:
          variant === "main"
            ? "0 40px 100px rgba(0,0,0,0.95), 0 8px 30px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(0,0,0,0.15)"
            : "0 15px 40px rgba(0,0,0,0.8)",
      }}
    >
      <div
        style={{
          width: frameW,
          aspectRatio: "4/5",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0e0e",
        }}
      >
        {piece.cover ? (
          <img
            src={piece.cover}
            alt={piece.title}
            draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              padding: "20px",
            }}
          >
            <div style={{ width: "28px", borderTop: "1px solid rgba(255,255,255,0.1)" }} />
            <span
              style={{
                color: "rgba(255,255,255,0.13)",
                fontFamily: "var(--font-display, serif)",
                fontSize: variant === "main" ? "clamp(10px, 1.1vw, 14px)" : "9px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              {piece.title}
            </span>
            <div style={{ width: "28px", borderTop: "1px solid rgba(255,255,255,0.1)" }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function VirtualGallery() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const total = galleryPieces.length;
  const hasPrev = current > 0;
  const hasNext = current < total - 1;

  const go = useCallback(
    (dir: number) => {
      const next = current + dir;
      if (next < 0 || next >= total) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(next);
        setFading(false);
      }, 280);
    },
    [current, total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const piece = galleryPieces[current];
  const prevPiece = hasPrev ? galleryPieces[current - 1] : null;
  const nextPiece = hasNext ? galleryPieces[current + 1] : null;

  return (
    <div
      style={{
        width: "100%",
        height: "100svh",
        background: "#0e0e0e",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── Room shell ─────────────────────────────────────────────────────── */}

      {/* Ceiling — dark vignette receding upward */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "28%",
          background: "linear-gradient(to bottom, #060606 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Floor — warm parquet tone receding downward */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "42%",
          background: "linear-gradient(to top, #1a1510 0%, #121010 35%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Floor plank lines (subtle horizontal stripes converging) */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "38%",
          backgroundImage: "repeating-linear-gradient(to top, transparent, transparent 18px, rgba(255,255,255,0.018) 19px)",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Perspective vanishing lines — corners to eye-level center */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Four vanishing lines from corners to ~eye level center */}
        <line x1="0" y1="0"   x2="50" y2="44" stroke="white" strokeWidth="0.25" opacity="0.08" />
        <line x1="100" y1="0" x2="50" y2="44" stroke="white" strokeWidth="0.25" opacity="0.08" />
        <line x1="0" y1="100" x2="50" y2="44" stroke="white" strokeWidth="0.25" opacity="0.06" />
        <line x1="100" y1="100" x2="50" y2="44" stroke="white" strokeWidth="0.25" opacity="0.06" />
        {/* Horizon / wainscot line */}
        <line x1="0" y1="58" x2="100" y2="58" stroke="white" strokeWidth="0.2" opacity="0.04" />
      </svg>

      {/* Back wall panel — the "room end" behind the artwork */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "15%",
          right: "15%",
          bottom: "20%",
          background: "#161616",
          zIndex: 0,
        }}
      />

      {/* Spotlight beam above center artwork */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "25%",
          right: "25%",
          height: "65%",
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,248,220,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Scene contents ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "10%",
          zIndex: 10,
          opacity: fading ? 0 : 1,
          transition: "opacity 0.28s ease",
        }}
      >
        {/* Left wall piece — desktop only */}
        {prevPiece && (
          <div
            onClick={() => go(-1)}
            style={{
              position: "absolute",
              left: "3%",
              top: "50%",
              transform: "translateY(-52%) scale(0.46)",
              transformOrigin: "center center",
              opacity: 0.38,
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            className="hidden md:block hover:!opacity-60"
          >
            <Frame piece={prevPiece} variant="side" />
          </div>
        )}

        {/* Center — main artwork */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>
          <a
            href={`/graphic-design/${piece.slug}`}
            style={{ display: "block" }}
            className="transition-transform duration-300 hover:scale-[1.015]"
          >
            <Frame piece={piece} variant="main" />
          </a>

          {/* Gallery plaque */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              marginTop: "22px",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.22)",
                fontSize: "9px",
                fontFamily: "Arial, sans-serif",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
              }}
            >
              {String(current + 1).padStart(2, "0")}
            </span>
            <span
              style={{
                color: "white",
                fontFamily: "var(--font-display, serif)",
                fontSize: "clamp(11px, 1.3vw, 15px)",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
              }}
            >
              {piece.title}
            </span>
            {(piece.medium || piece.year) && (
              <span
                style={{
                  color: "rgba(255,255,255,0.28)",
                  fontSize: "8px",
                  fontFamily: "Arial, sans-serif",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                {[piece.medium, piece.year].filter(Boolean).join(" · ")}
              </span>
            )}
          </div>
        </div>

        {/* Right wall piece — desktop only */}
        {nextPiece && (
          <div
            onClick={() => go(1)}
            style={{
              position: "absolute",
              right: "3%",
              top: "50%",
              transform: "translateY(-52%) scale(0.46)",
              transformOrigin: "center center",
              opacity: 0.38,
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            className="hidden md:block hover:!opacity-60"
          >
            <Frame piece={nextPiece} variant="side" />
          </div>
        )}
      </div>

      {/* ── Navigation ──────────────────────────────────────────────────────── */}

      <button
        onClick={() => go(-1)}
        disabled={!hasPrev}
        aria-label="Previous"
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          padding: "14px",
          fontSize: "20px",
          cursor: hasPrev ? "pointer" : "default",
          color: hasPrev ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.07)",
          transition: "color 0.2s",
          zIndex: 20,
        }}
        className="hover:!text-white"
      >
        ←
      </button>

      <button
        onClick={() => go(1)}
        disabled={!hasNext}
        aria-label="Next"
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          padding: "14px",
          fontSize: "20px",
          cursor: hasNext ? "pointer" : "default",
          color: hasNext ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.07)",
          transition: "color 0.2s",
          zIndex: 20,
        }}
        className="hover:!text-white"
      >
        →
      </button>

      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        {galleryPieces.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setFading(true);
              setTimeout(() => { setCurrent(i); setFading(false); }, 280);
            }}
            aria-label={`Go to piece ${i + 1}`}
            style={{
              width: i === current ? "18px" : "5px",
              height: "5px",
              borderRadius: "3px",
              background: i === current ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.18)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
