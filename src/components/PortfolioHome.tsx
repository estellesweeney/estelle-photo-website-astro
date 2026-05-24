import { useState, useCallback } from "react";
import AsciiIntro from "@/components/AsciiIntro";

const slides = [
  { src: "/slides/wvb/01.jpg",             link: "/runway/walter-van-bierendonck" },
  { src: "/slides/runway/03.jpg",           link: "/runway/shows" },
  { src: "/slides/bbc-spring2.jpg",         link: "/gallery/billionaire-boys-club" },
  { src: "/slides/wvb/05.jpg",             link: "/runway/walter-van-bierendonck" },
  { src: "/slides/kidsuper/otb-01.jpg",     link: "/runway/kidsuper-aw2627" },
  { src: "/slides/wvb/09.jpg",             link: "/runway/walter-van-bierendonck" },
  { src: "/slides/runway/07.jpg",           link: "/runway/shows" },
  { src: "/slides/kidsuper/moon-06.jpg",    link: "/runway/kidsuper-aw25" },
];

const nav = [
  { label: "Runway",         link: "/runway" },
  { label: "Campaigns",      link: "/campaigns" },
  { label: "Backstage",      link: "/backstage" },
  { label: "Graphic Design", link: "/graphic-design" },
  { label: "About",          link: "/about" },
];

export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(true);
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const go = useCallback((dir: number) => {
    setCurrent(prev => (prev + dir + slides.length) % slides.length);
  }, []);

  return (
    <>
      {showIntro && <AsciiIntro onDone={() => setShowIntro(false)} />}

      <div style={{
        background: "black",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Header */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 28px",
          position: "absolute",
          top: 0, left: 0, right: 0,
          zIndex: 10,
        }}>
          <a href="/" style={{
            color: "rgba(245,240,232,0.9)",
            textDecoration: "none",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "'Bodoni Moda', serif",
          }}>
            Estelle Sweeney
          </a>
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              color: "rgba(245,240,232,0.7)",
              background: "none",
              border: "none",
              fontSize: "22px",
              cursor: "pointer",
              lineHeight: 1,
              padding: "4px 0",
            }}
            aria-label="Open menu"
          >
            +
          </button>
        </header>

        {/* Menu overlay */}
        {menuOpen && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "black",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(16px, 3vh, 32px)",
          }}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: "20px", right: "28px",
                color: "rgba(245,240,232,0.6)",
                background: "none",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
              }}
              aria-label="Close menu"
            >
              ×
            </button>
            {nav.map(({ label, link }) => (
              <a
                key={label}
                href={link}
                style={{
                  color: "rgba(245,240,232,0.85)",
                  textDecoration: "none",
                  fontSize: "clamp(28px, 5vw, 52px)",
                  fontFamily: "'Bodoni Moda', serif",
                  letterSpacing: "0.04em",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.4")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {label}
              </a>
            ))}
          </div>
        )}

        {/* Main image */}
        <main style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px clamp(48px, 8vw, 120px)",
        }}>
          <div style={{ position: "relative" }}>
            {/* Left arrow */}
            <button
              onClick={() => go(-1)}
              style={{
                position: "absolute",
                left: "clamp(-36px, -5vw, -56px)",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "rgba(245,240,232,0.4)",
                fontSize: "clamp(20px, 3vw, 28px)",
                cursor: "pointer",
                transition: "color 0.2s",
                padding: "8px",
                zIndex: 2,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.4)")}
              aria-label="Previous"
            >
              ‹
            </button>

            {/* Image */}
            <a href={slides[current].link} style={{ display: "block", textDecoration: "none" }}>
              <div style={{
                width: "clamp(200px, 55vw, 480px)",
                aspectRatio: "4/5",
                overflow: "hidden",
              }}>
                <img
                  src={slides[current].src}
                  alt="Estelle Sweeney"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "opacity 0.4s ease",
                  }}
                  draggable={false}
                />
              </div>
            </a>

            {/* Right arrow */}
            <button
              onClick={() => go(1)}
              style={{
                position: "absolute",
                right: "clamp(-36px, -5vw, -56px)",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "rgba(245,240,232,0.4)",
                fontSize: "clamp(20px, 3vw, 28px)",
                cursor: "pointer",
                transition: "color 0.2s",
                padding: "8px",
                zIndex: 2,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.4)")}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 28px",
        }}>
          <span style={{
            color: "rgba(245,240,232,0.25)",
            fontSize: "9px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "Arial, sans-serif",
          }}>
            Estelle Sweeney © All Rights Reserved
          </span>
          <a
            href="https://www.instagram.com/estellesweeney_"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(245,240,232,0.4)", display: "block", transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </footer>

      </div>
    </>
  );
}
