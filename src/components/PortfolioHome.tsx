import { useState, useCallback } from "react";
import AsciiIntro from "@/components/AsciiIntro";

const nav = [
  { label: "Home",        href: "/" },
  { label: "Portfolio",   href: "/runway" },
  { label: "Collections", href: "/backstage" },
  { label: "Contact",     href: "/about" },
];

const carousel = [
  { src: "/slides/home/01.jpg",  label: "Runway",        href: "/runway" },
  { src: "/slides/home/11.jpg",  label: "Backstage",     href: "/backstage" },
  { src: "/slides/home/05.jpg",  label: "Campaigns",     href: "/campaigns" },
  { src: "/art/bbc-illustrations.jpg", label: "Graphic Design", href: "/graphic-design" },
  { src: "/slides/home/14.jpg",  label: "Archive",       href: "/runway" },
];

export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(true);
  const [hovered,   setHovered]   = useState(false);
  const [active,    setActive]    = useState(0);

  const prev = useCallback(() => setActive(i => (i - 1 + carousel.length) % carousel.length), []);
  const next = useCallback(() => setActive(i => (i + 1) % carousel.length), []);

  return (
    <>
      {showIntro && <AsciiIntro onDone={() => setShowIntro(false)} />}

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#080808",
          opacity: showIntro ? 0 : 1,
          transition: "opacity 0.6s ease",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* ── Hero image ─────────────────────────────────────────────────── */}
        <img
          src="/slides/home/hero.jpg"
          alt="Estelle Sweeney"
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 15%",
            filter: hovered
              ? "grayscale(0%) brightness(0.78) sepia(22%) saturate(1.3) contrast(1.08)"
              : "grayscale(100%) brightness(0.65) contrast(1.18)",
            transition: "filter 1.2s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        />

        {/* ── Gradient overlay ─────────────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(105deg, rgba(120,35,10,0.55) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.72) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 100%)",
          transition: "background 1.2s ease",
          zIndex: 1,
        }} />

        {/* ── Film grain ──────────────────────────────────────────────────── */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none", opacity: 0.28 }} xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" opacity="0.18" />
        </svg>

        {/* ── Nav ─────────────────────────────────────────────────────────── */}
        <nav style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 44px", zIndex: 10 }}>
          <a href="/" style={{ color: "rgba(245,240,232,0.9)", textDecoration: "none", fontFamily: "'Bodoni Moda', serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase" }}>
            ES
          </a>
          <div style={{ display: "flex", gap: "32px" }}>
            {nav.map(({ label, href }) => (
              <a key={label} href={href} style={{ color: "rgba(245,240,232,0.45)", textDecoration: "none", fontFamily: "Arial, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", transition: "color 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.95)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}
              >{label}</a>
            ))}
          </div>
        </nav>

        {/* ── Text block — upper center ────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          top: "24%",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          pointerEvents: "none",
        }}>
          <h1 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(38px, 6.5vw, 88px)",
            fontWeight: 400,
            letterSpacing: "0.12em",
            color: "rgba(245,240,232,0.96)",
            margin: 0,
            lineHeight: 1,
            textTransform: "uppercase",
          }}>
            Estelle Sweeney
          </h1>

          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "clamp(7px, 0.9vw, 10px)", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", margin: "18px 0 0", lineHeight: 1 }}>
            Analog Fashion Photography &nbsp;/&nbsp; Runway &nbsp;/&nbsp; Backstage
          </p>

          {/* Star divider */}
          <div style={{ margin: "18px 0", color: "rgba(245,240,232,0.28)", fontSize: "10px", letterSpacing: "0.4em" }}>✦ ✦ ✦</div>

          <p style={{ fontFamily: "'Bodoni Moda', serif", fontStyle: "italic", fontSize: "clamp(11px, 1.3vw, 17px)", letterSpacing: "0.04em", color: "rgba(245,240,232,0.28)", margin: 0, lineHeight: 1 }}>
            Fashion, movement, and memory caught on film.
          </p>
        </div>

        {/* ── Carousel ─────────────────────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "0 44px 36px",
        }}>
          {/* Carousel track */}
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>

            {/* Prev */}
            <button onClick={prev} style={{ background: "none", border: "none", color: "rgba(245,240,232,0.35)", fontSize: "18px", cursor: "pointer", padding: "0 4px", lineHeight: 1, flexShrink: 0, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.35)")}
            >‹</button>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "10px", flex: 1, overflow: "hidden" }}>
              {carousel.map((item, i) => {
                const isActive = i === active;
                return (
                  <a
                    key={i}
                    href={item.href}
                    style={{
                      display: "block",
                      flex: isActive ? "0 0 clamp(100px,14vw,180px)" : "0 0 clamp(54px,7vw,88px)",
                      transition: "flex 0.5s cubic-bezier(0.4,0,0.2,1)",
                      textDecoration: "none",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={() => setActive(i)}
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      draggable={false}
                      style={{
                        width: "100%",
                        height: "clamp(80px,12vw,150px)",
                        objectFit: "cover",
                        objectPosition: "center 15%",
                        display: "block",
                        filter: isActive ? "grayscale(0%) brightness(0.9)" : "grayscale(100%) brightness(0.55)",
                        transition: "filter 0.6s ease",
                      }}
                    />
                    {/* label */}
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "6px 8px",
                      background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}>
                      <span style={{ color: "rgba(245,240,232,0.9)", fontFamily: "Arial, sans-serif", fontSize: "7px", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                        {item.label}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Next */}
            <button onClick={next} style={{ background: "none", border: "none", color: "rgba(245,240,232,0.35)", fontSize: "18px", cursor: "pointer", padding: "0 4px", lineHeight: 1, flexShrink: 0, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.35)")}
            >›</button>
          </div>

          {/* Dot indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "12px" }}>
            {carousel.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? "16px" : "4px",
                height: "4px",
                borderRadius: "2px",
                background: i === active ? "rgba(245,240,232,0.7)" : "rgba(245,240,232,0.2)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
