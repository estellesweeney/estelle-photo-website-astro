import { useState, useCallback } from "react";
import AsciiIntro from "@/components/AsciiIntro";

const projects = [
  {
    num: "001",
    title: "Runway",
    year: "2025–26",
    link: "/runway",
    image: "/slides/home/01.jpg",
  },
  {
    num: "002",
    title: "Campaigns",
    year: "2025",
    link: "/campaigns",
    image: "/slides/home/05.jpg",
  },
  {
    num: "003",
    title: "Backstage",
    year: "2025–26",
    link: "/backstage",
    image: "/slides/home/09.jpg",
  },
  {
    num: "004",
    title: "Graphic Design",
    year: "2025",
    link: "/graphic-design",
    image: "/art/bbc-illustrations.jpg",
  },
  {
    num: "005",
    title: "About",
    year: "",
    link: "/about",
    image: "/slides/home/03.jpg",
  },
];

const menuLinks = [
  { label: "Runway",         link: "/runway" },
  { label: "Campaigns",      link: "/campaigns" },
  { label: "Backstage",      link: "/backstage" },
  { label: "Graphic Design", link: "/graphic-design" },
  { label: "About",          link: "/about" },
];

export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {showIntro && <AsciiIntro onDone={() => setShowIntro(false)} />}

      <div style={{
        background: "#080808",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* ── Header ── */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 32px",
          position: "relative",
          zIndex: 20,
          borderBottom: "1px solid rgba(255,255,255,0.055)",
        }}>
          <a href="/" style={{
            color: "rgba(245,240,232,0.9)",
            textDecoration: "none",
            fontSize: "11px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            fontFamily: "'Bodoni Moda', serif",
          }}>
            Estelle Sweeney
          </a>

          <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <a href="/runway" style={{
              color: "rgba(245,240,232,0.45)",
              textDecoration: "none",
              fontSize: "9px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "Arial, sans-serif",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}
            >
              Services
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                color: "rgba(245,240,232,0.6)",
                background: "none",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
                lineHeight: 1,
                padding: "4px 0",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
              aria-label="Open menu"
            >
              +
            </button>
          </nav>
        </header>

        {/* ── Menu overlay ── */}
        {menuOpen && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "#080808",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(14px, 2.5vh, 28px)",
          }}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: "22px", right: "32px",
                color: "rgba(245,240,232,0.5)",
                background: "none",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
              }}
              aria-label="Close menu"
            >
              ×
            </button>
            {menuLinks.map(({ label, link }) => (
              <a
                key={label}
                href={link}
                style={{
                  color: "rgba(245,240,232,0.85)",
                  textDecoration: "none",
                  fontSize: "clamp(28px, 5vw, 56px)",
                  fontFamily: "'Bodoni Moda', serif",
                  letterSpacing: "0.04em",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.3")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {label}
              </a>
            ))}
          </div>
        )}

        {/* ── Main: project list + image preview ── */}
        <main style={{
          flex: 1,
          display: "flex",
          position: "relative",
        }}>

          {/* Image preview panel — right side, desktop */}
          <div style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "52%",
            overflow: "hidden",
            pointerEvents: "none",
          }}
            className="hidden md:block"
          >
            {projects.map((p, i) => (
              <img
                key={i}
                src={p.image}
                alt={p.title}
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: hovered === i ? 1 : 0,
                  transition: "opacity 0.45s ease",
                }}
              />
            ))}
            {/* Overlay gradient so image bleeds into left */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, #080808 0%, transparent 18%)",
              zIndex: 2,
            }} />
          </div>

          {/* Project list — left side */}
          <div style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "560px",
            padding: "clamp(40px, 6vh, 80px) 32px clamp(40px, 6vh, 80px) 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            {projects.map((p, i) => (
              <a
                key={i}
                href={p.link}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(16px, 3vw, 36px)",
                  padding: "clamp(14px, 2.2vh, 26px) 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  color: "inherit",
                  opacity: hovered === null ? 1 : hovered === i ? 1 : 0.25,
                  transition: "opacity 0.3s ease",
                }}
              >
                {/* Number */}
                <span style={{
                  color: "rgba(245,240,232,0.25)",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "clamp(9px, 1vw, 11px)",
                  letterSpacing: "0.15em",
                  minWidth: "28px",
                  lineHeight: 1,
                }}>
                  {p.num}
                </span>

                {/* Title */}
                <span style={{
                  color: "rgba(245,240,232,0.92)",
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: "clamp(28px, 4.5vw, 58px)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                  fontWeight: 400,
                  flex: 1,
                }}>
                  {p.title}
                </span>

                {/* Year */}
                {p.year && (
                  <span style={{
                    color: "rgba(245,240,232,0.22)",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "clamp(9px, 1vw, 11px)",
                    letterSpacing: "0.12em",
                    lineHeight: 1,
                    alignSelf: "center",
                  }}>
                    {p.year}
                  </span>
                )}
              </a>
            ))}
          </div>
        </main>

        {/* ── Footer ── */}
        <footer style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
          zIndex: 20,
        }}>
          <span style={{
            color: "rgba(245,240,232,0.2)",
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "Arial, sans-serif",
          }}>
            Estelle Sweeney © All Rights Reserved
          </span>
          <a
            href="https://www.instagram.com/estellesweeney_"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(245,240,232,0.3)", display: "block", transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.3")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </footer>

      </div>
    </>
  );
}
