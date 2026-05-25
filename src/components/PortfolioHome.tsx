import { useState, useCallback } from "react";
import AsciiIntro from "@/components/AsciiIntro";

const nav = [
  { label: "Home",        href: "/" },
  { label: "Portfolio",   href: "/runway" },
  { label: "Collections", href: "/backstage" },
  { label: "Contact",     href: "/about" },
];

const carousel = [
  { src: "/slides/home/01.jpg",           label: "Runway",        href: "/runway" },
  { src: "/slides/home/11.jpg",           label: "Backstage",     href: "/backstage" },
  { src: "/slides/home/05.jpg",           label: "Campaigns",     href: "/campaigns" },
  { src: "/art/bbc-illustrations.jpg",    label: "Graphic Design",href: "/graphic-design" },
  { src: "/slides/home/14.jpg",           label: "Archive",       href: "/runway" },
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
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 15%",
            filter: hovered
              ? "grayscale(0%) brightness(0.72) sepia(22%) saturate(1.3) contrast(1.08)"
              : "grayscale(100%) brightness(0.6) contrast(1.18)",
            transition: "filter 1.2s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        />

        {/* ── Gradient ─────────────────────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(105deg, rgba(120,35,10,0.5) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.7) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 100%)",
          transition: "background 1.2s ease",
          zIndex: 1,
        }} />

        {/* ── Film grain ──────────────────────────────────────────────────── */}
        <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",zIndex:2,pointerEvents:"none",opacity:0.28 }} xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" opacity="0.18"/>
        </svg>

        {/* ── Nav ─────────────────────────────────────────────────────────── */}
        <nav style={{
          position: "absolute", top: 0, left: 0, right: 0,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px 40px", zIndex: 10,
        }}>
          <a href="/" style={{ color:"rgba(245,240,232,0.88)", textDecoration:"none", fontFamily:"'Bodoni Moda', serif", fontSize:"13px", letterSpacing:"0.2em", textTransform:"uppercase" }}>
            Estelle Sweeney
          </a>
          <div style={{ display:"flex", gap:"28px" }}>
            {nav.map(({ label, href }) => (
              <a key={label} href={href} style={{ color:"rgba(245,240,232,0.42)", textDecoration:"none", fontFamily:"Arial, sans-serif", fontSize:"8px", letterSpacing:"0.22em", textTransform:"uppercase", transition:"color 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.color="rgba(245,240,232,0.95)")}
                onMouseLeave={e => (e.currentTarget.style.color="rgba(245,240,232,0.42)")}
              >{label}</a>
            ))}
          </div>
        </nav>

        {/* ── Subtitle strip ───────────────────────────────────────────────── */}
        <div style={{
          position: "absolute", top: "76px", left: 0, right: 0,
          display: "flex", justifyContent: "center",
          zIndex: 10, pointerEvents: "none",
        }}>
          <span style={{ fontFamily:"Arial, sans-serif", fontSize:"7px", letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(245,240,232,0.28)" }}>
            Analog Fashion Photography &nbsp;/&nbsp; Runway &nbsp;/&nbsp; Backstage
          </span>
        </div>

        {/* ── Carousel — full width, vertically centered ───────────────────── */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 10,
        }}>
          {/* Thumbnails — full viewport width, square aspect, flex-grow */}
          <div style={{ display:"flex", width:"100%", gap:"3px" }}>
            {carousel.map((item, i) => {
              const isActive = i === active;
              return (
                <a
                  key={i}
                  href={item.href}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    display: "block",
                    flex: isActive ? "3 0 0" : "1 0 0",
                    minWidth: 0,
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: "1 / 1",
                    transition: "flex 0.55s cubic-bezier(0.4,0,0.2,1)",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    draggable={false}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 18%",
                      filter: isActive
                        ? "grayscale(0%) brightness(0.88)"
                        : "grayscale(100%) brightness(0.38)",
                      transition: "filter 0.65s ease",
                    }}
                  />
                  {/* label on active */}
                  <div style={{
                    position: "absolute", bottom:0, left:0, right:0,
                    padding: "28px 14px 12px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}>
                    <span style={{ color:"rgba(245,240,232,0.92)", fontFamily:"Arial, sans-serif", fontSize:"8px", letterSpacing:"0.24em", textTransform:"uppercase" }}>
                      {item.label}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Dots */}
          <div style={{ display:"flex", justifyContent:"center", gap:"6px", marginTop:"14px" }}>
            {carousel.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? "18px" : "4px",
                height: "4px", borderRadius:"2px",
                background: i === active ? "rgba(245,240,232,0.65)" : "rgba(245,240,232,0.2)",
                border:"none", padding:0, cursor:"pointer",
                transition:"all 0.3s ease",
              }}/>
            ))}
          </div>
        </div>

        {/* ── Prev / Next arrows ───────────────────────────────────────────── */}
        {[{ fn: prev, label:"‹", side:"left"  as const },
          { fn: next, label:"›", side:"right" as const }].map(({ fn, label, side }) => (
          <button key={side} onClick={fn} style={{
            position: "absolute", top:"50%", [side]:"12px",
            transform: "translateY(-50%)",
            background:"none", border:"none",
            color:"rgba(245,240,232,0.3)", fontSize:"22px",
            cursor:"pointer", zIndex:11, lineHeight:1, padding:"8px",
            transition:"color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color="rgba(245,240,232,0.9)")}
            onMouseLeave={e => (e.currentTarget.style.color="rgba(245,240,232,0.3)")}
          >{label}</button>
        ))}

      </div>
    </>
  );
}
