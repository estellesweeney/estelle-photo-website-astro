import { useState, useRef, useCallback, useEffect } from "react";

interface Props {
  images: string[];
  alt?: string;
}

export default function HorizontalGallery({ images, alt = "" }: Props) {
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current?.children[i] as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setCurrent(i);
  }, []);

  const prev = useCallback(() => goTo(Math.max(0, current - 1)), [current, goTo]);
  const next = useCallback(() => goTo(Math.min(images.length - 1, current + 1)), [current, images.length, goTo]);

  // Hide swipe hint after first interaction
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // Track scroll position to update current index
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    setCurrent(idx);
    setShowHint(false);
  }, []);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#080808", zIndex: 0 }}>

      {/* ── Slide track ── */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        style={{
          position: "absolute", inset: 0,
          display: "flex",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            style={{
              flexShrink: 0,
              width: "100%",
              height: "100%",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
              position: "relative",
            }}
          >
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Top nav overlay ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        padding: "20px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        zIndex: 20,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
      }}>
        <a href="/campaigns" style={{
          color: "rgba(245,240,232,0.8)", textDecoration: "none",
          fontFamily: "Arial, sans-serif", fontSize: "9px",
          letterSpacing: "0.22em", textTransform: "uppercase",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.4")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >← Back</a>

        {/* Image counter */}
        <span style={{
          color: "rgba(245,240,232,0.5)",
          fontFamily: "Arial, sans-serif", fontSize: "9px",
          letterSpacing: "0.18em",
        }}>
          {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Prev / Next arrows (desktop) ── */}
      {current > 0 && (
        <button onClick={prev} style={{
          position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.35)", border: "1px solid rgba(245,240,232,0.15)",
          color: "rgba(245,240,232,0.7)", width: "40px", height: "40px",
          borderRadius: "50%", fontSize: "16px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 20, transition: "all 0.2s",
          backdropFilter: "blur(6px)",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.6)"; e.currentTarget.style.color = "rgba(245,240,232,1)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.35)"; e.currentTarget.style.color = "rgba(245,240,232,0.7)"; }}
          className="hidden md:flex"
        >‹</button>
      )}
      {current < images.length - 1 && (
        <button onClick={next} style={{
          position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.35)", border: "1px solid rgba(245,240,232,0.15)",
          color: "rgba(245,240,232,0.7)", width: "40px", height: "40px",
          borderRadius: "50%", fontSize: "16px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 20, transition: "all 0.2s",
          backdropFilter: "blur(6px)",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.6)"; e.currentTarget.style.color = "rgba(245,240,232,1)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.35)"; e.currentTarget.style.color = "rgba(245,240,232,0.7)"; }}
          className="hidden md:flex"
        >›</button>
      )}

      {/* ── Bottom: dots + swipe hint ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "32px 24px 28px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
        zIndex: 20,
        background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
      }}>

        {/* Swipe hint — fades out after 3s */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          opacity: showHint ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: "none",
        }}>
          <span style={{ color: "rgba(245,240,232,0.35)", fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
            Swipe
          </span>
          <span style={{ color: "rgba(245,240,232,0.35)", fontSize: "12px" }}>→</span>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? "20px" : "5px",
                height: "5px",
                borderRadius: "3px",
                background: i === current ? "rgba(245,240,232,0.85)" : "rgba(245,240,232,0.25)",
                border: "none", padding: 0, cursor: "pointer",
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
