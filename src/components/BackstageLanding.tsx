import { useState, useEffect, useRef } from "react";
import { backstageBrands } from "@/data/backstage";

// Only show brands with covers
const brands = backstageBrands.filter(b => b.cover);

// Pre-set organic rotations — alternating feel
const ROTATIONS = [-3.2, 1.8, -1.4, 2.6, -2.0, 1.2, -2.8, 1.5];

// Polaroid card
function PolaroidCard({ brand, rotation, index, onClick }: {
  brand: typeof brands[0];
  rotation: number;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const haptic = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(8);
    }
  };

  return (
    <a
      href={`/backstage/${brand.slug}`}
      onClick={haptic}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        transform: hovered
          ? `rotate(0deg) scale(1.04) translateY(-6px)`
          : `rotate(${rotation}deg) scale(1)`,
        transition: "transform 0.4s cubic-bezier(0.2,0,0,1)",
        position: "relative",
        zIndex: hovered ? 10 : index,
        cursor: "pointer",
      }}
    >
      {/* Pin dot */}
      <div style={{
        position: "absolute",
        top: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(180,180,180,0.6))",
        boxShadow: "0 1px 4px rgba(0,0,0,0.6)",
        zIndex: 2,
      }} />

      {/* Polaroid frame */}
      <div style={{
        background: "#f5f2ec",
        padding: "8px 8px 28px",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.9), 0 6px 20px rgba(0,0,0,0.6)"
          : "0 8px 24px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.5)",
        transition: "box-shadow 0.4s ease",
      }}>
        {/* Image */}
        <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>
          <img
            src={brand.cover}
            alt={brand.name}
            draggable={false}
            loading="lazy"
            style={{
              width: "100%",
              aspectRatio: "3/4",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
              filter: hovered ? "grayscale(0%) brightness(1)" : "grayscale(20%) brightness(0.92)",
              transition: "filter 0.4s ease",
            }}
          />
          {/* Coming soon overlay */}
          {brand.images.length === 0 && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "flex-end", justifyContent: "flex-start",
              padding: "8px",
              background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}>
              <span style={{ fontFamily: "monospace", fontSize: "7px", letterSpacing: "0.14em", color: "rgba(245,240,232,0.7)", textTransform: "uppercase" }}>
                Coming Soon
              </span>
            </div>
          )}
        </div>

        {/* Polaroid label area */}
        <div style={{ paddingTop: "6px", textAlign: "center" }}>
          <div style={{ fontFamily: "monospace", fontSize: "8px", letterSpacing: "0.12em", color: "#2a2a2a", textTransform: "uppercase", marginBottom: "2px" }}>
            {brand.name}
          </div>
          {brand.season && (
            <div style={{ fontFamily: "monospace", fontSize: "7px", letterSpacing: "0.1em", color: "rgba(0,0,0,0.35)", textTransform: "uppercase" }}>
              {brand.season}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

// Live clock
function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

export default function BackstageLanding() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Horizontal swipe on mobile
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50 && navigator.vibrate) navigator.vibrate(6);
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const ink = "#0d0d0d";

  return (
    <div style={{ minHeight: "100dvh", background: "#0a0a0a", color: "rgba(245,240,232,0.85)", fontFamily: "monospace" }}>

      {/* ── Header ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 32px",
        borderBottom: "1px solid rgba(245,240,232,0.07)",
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(10px)",
      }}>
        <a href="/" style={{ color: "rgba(245,240,232,0.88)", textDecoration: "none", fontFamily: "'Bodoni Moda', serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase" }}>
          Estelle Sweeney
        </a>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {[
            { label: "Portfolio", href: "/runway" },
            { label: "Backstage", href: "/backstage" },
            { label: "Contact", href: "/about" },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{ color: "rgba(245,240,232,0.38)", textDecoration: "none", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.38)")}
            >{label}</a>
          ))}
        </div>
      </header>

      {/* ── Page title strip ── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 32px",
        borderBottom: "1px solid rgba(245,240,232,0.05)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "7px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)" }}>
            BACKSTAGE_ARCHIVE
          </span>
          <span style={{ fontSize: "7px", color: "rgba(245,240,232,0.12)" }}>·</span>
          <span style={{ fontSize: "7px", letterSpacing: "0.18em", color: "rgba(245,240,232,0.2)" }}>
            {brands.length} BRANDS
          </span>
        </div>
        <span style={{ fontSize: "7px", letterSpacing: "0.18em", color: "rgba(245,240,232,0.2)" }}>
          <LiveClock />
        </span>
      </div>

      {/* ── Moodboard — scrollable, pinboard feel ── */}
      <main ref={scrollRef} style={{ padding: "clamp(32px, 6vh, 80px) clamp(20px, 5vw, 60px)" }}>

        {/* Hint */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          marginBottom: "clamp(28px, 5vh, 56px)",
          opacity: 0.25,
        }}>
          <span style={{ fontSize: "7px", letterSpacing: "0.24em", textTransform: "uppercase" }}>Select a brand</span>
          <span style={{ fontSize: "12px" }}>→</span>
          <span style={{ fontSize: "7px", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)" }}>Swipe through gallery</span>
        </div>

        {/* Polaroid grid — 2 col mobile, 3 col desktop */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(clamp(130px, 22vw, 220px), 1fr))",
          gap: "clamp(28px, 5vw, 64px)",
          paddingTop: "20px",
        }}>
          {brands.map((brand, i) => (
            <PolaroidCard
              key={brand.slug}
              brand={brand}
              rotation={ROTATIONS[i % ROTATIONS.length]}
              index={i}
              onClick={() => {}}
            />
          ))}
        </div>

        {/* ── Bottom navigation ── */}
        <div style={{
          marginTop: "clamp(48px, 8vh, 80px)",
          paddingTop: "24px",
          borderTop: "1px solid rgba(245,240,232,0.07)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "16px",
        }}>
          <div style={{ display: "flex", gap: "24px" }}>
            <a href="/runway" style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.85)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.3)")}
            >→ Runway</a>
            <a href="/campaigns" style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.85)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.3)")}
            >→ Campaigns</a>
            <a href="/graphic-design" style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.85)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.3)")}
            >→ Graphic Design</a>
          </div>
          <span style={{ fontSize: "7px", letterSpacing: "0.14em", color: "rgba(245,240,232,0.15)", textTransform: "uppercase" }}>
            Estelle Sweeney © 2025
          </span>
        </div>
      </main>
    </div>
  );
}
