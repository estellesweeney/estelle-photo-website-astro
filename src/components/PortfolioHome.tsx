import { useState } from "react";
import AsciiIntro from "@/components/AsciiIntro";

const nav = [
  { label: "Home",        href: "/" },
  { label: "Portfolio",   href: "/runway" },
  { label: "Collections", href: "/backstage" },
  { label: "Contact",     href: "/about" },
];

export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(true);
  const [hovered,   setHovered]   = useState(false);

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
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* ── Hero image ─────────────────────────────────────────────────── */}
        <img
          src="/slides/home/01.jpg"
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
              ? "grayscale(0%) brightness(0.82) sepia(18%) saturate(1.25) contrast(1.08)"
              : "grayscale(100%) brightness(0.68) contrast(1.15)",
            transition: "filter 1.1s cubic-bezier(0.25,0.1,0.25,1)",
            willChange: "filter",
          }}
        />

        {/* ── Dark + warm gradient overlay ────────────────────────────────── */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(10,5,0,0.12) 35%, rgba(60,15,5,0.38) 70%, rgba(10,4,2,0.78) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.42) 70%, rgba(0,0,0,0.85) 100%)",
          transition: "background 1.1s ease",
          zIndex: 1,
        }} />

        {/* ── Film grain ──────────────────────────────────────────────────── */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none", opacity: 0.32 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" opacity="0.18" />
        </svg>

        {/* ── Navigation ──────────────────────────────────────────────────── */}
        <nav style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px 40px",
          zIndex: 10,
        }}>
          <a href="/" style={{
            color: "rgba(245,240,232,0.9)",
            textDecoration: "none",
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            ES
          </a>

          <div style={{ display: "flex", gap: "32px" }}>
            {nav.map(({ label, href }) => (
              <a key={label} href={href} style={{
                color: "rgba(245,240,232,0.5)",
                textDecoration: "none",
                fontFamily: "Arial, sans-serif",
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.95)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── Centered text ───────────────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          pointerEvents: "none",
        }}>
          {/* Name */}
          <h1 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(42px, 7vw, 96px)",
            fontWeight: 400,
            letterSpacing: "0.12em",
            color: "rgba(245,240,232,0.96)",
            margin: 0,
            lineHeight: 1,
            textTransform: "uppercase",
          }}>
            Estelle Sweeney
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "clamp(8px, 1vw, 11px)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.45)",
            margin: "20px 0 0",
            lineHeight: 1,
          }}>
            Analog Fashion Photography &nbsp;/&nbsp; Runway &nbsp;/&nbsp; Backstage
          </p>

          {/* Tagline */}
          <p style={{
            fontFamily: "'Bodoni Moda', serif",
            fontStyle: "italic",
            fontSize: "clamp(12px, 1.4vw, 18px)",
            letterSpacing: "0.04em",
            color: "rgba(245,240,232,0.28)",
            margin: "28px 0 0",
            lineHeight: 1,
          }}>
            Shot on film. Worn once. Remembered always.
          </p>
        </div>

        {/* ── Bottom scroll hint ───────────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.3,
          pointerEvents: "none",
        }}>
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "7px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,1)" }}>
            Scroll
          </span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(245,240,232,0.6), transparent)" }} />
        </div>

      </div>
    </>
  );
}
