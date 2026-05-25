import { useState } from "react";
import AsciiIntro from "@/components/AsciiIntro";

// ─── Data ────────────────────────────────────────────────────────────────────

const menuLinks = [
  { label: "Runway",         link: "/runway" },
  { label: "Campaigns",      link: "/campaigns" },
  { label: "Backstage",      link: "/backstage" },
  { label: "Graphic Design", link: "/graphic-design" },
  { label: "About",          link: "/about" },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface ImageItem {
  src: string;
  label: string;
  sub?: string;
  link: string;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function PhotoCard({ item, style }: { item: ImageItem; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={item.link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        ...style,
      }}
    >
      <div style={{
        overflow: "hidden",
        background: "#111",
        transform: hovered ? "scale(1.015)" : "scale(1)",
        transition: "transform 0.55s cubic-bezier(0.2,0,0,1)",
      }}>
        <img
          src={item.src}
          alt={item.label}
          draggable={false}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.55s cubic-bezier(0.2,0,0,1)",
          }}
        />
      </div>
      <div style={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: "12px",
      }}>
        <span style={{
          color: hovered ? "rgba(245,240,232,0.9)" : "rgba(245,240,232,0.55)",
          fontFamily: "'Bodoni Moda', serif",
          fontSize: "clamp(11px, 1.1vw, 14px)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          transition: "color 0.3s ease",
        }}>
          {item.label}
        </span>
        {item.sub && (
          <span style={{
            color: "rgba(245,240,232,0.2)",
            fontFamily: "Arial, sans-serif",
            fontSize: "9px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}>
            {item.sub}
          </span>
        )}
      </div>
    </a>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {showIntro && <AsciiIntro onDone={() => setShowIntro(false)} />}

      <div style={{ background: "#080808", minHeight: "100dvh", color: "rgba(245,240,232,0.9)" }}>

        {/* ── Header ── */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 32px",
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(8,8,8,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.045)",
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

          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {[
              { label: "Work", href: "/runway" },
              { label: "Services", href: "/campaigns" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{
                color: "rgba(245,240,232,0.38)",
                textDecoration: "none",
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontFamily: "Arial, sans-serif",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.38)")}
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                color: "rgba(245,240,232,0.55)",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                lineHeight: 1,
                padding: "4px 0",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.55)")}
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
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(12px, 2.2vh, 26px)",
          }}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: "22px", right: "32px",
                color: "rgba(245,240,232,0.45)",
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
                  fontSize: "clamp(28px, 5vw, 58px)",
                  fontFamily: "'Bodoni Moda', serif",
                  letterSpacing: "0.04em",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.25")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {label}
              </a>
            ))}
          </div>
        )}

        {/* ── Content ── */}
        <main style={{ padding: "0 clamp(20px, 4vw, 56px)", paddingBottom: "120px" }}>

          {/* ─ Section 1: Two images, offset ─ */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "clamp(16px, 2.5vw, 40px)",
            marginTop: "clamp(40px, 7vh, 80px)",
          }}>
            <div style={{ flex: "0 0 54%" }}>
              <PhotoCard
                item={{ src: "/slides/home/01.jpg", label: "Runway", sub: "2025–26", link: "/runway" }}
              />
            </div>
            <div style={{ flex: "0 0 36%", marginTop: "clamp(60px, 12vh, 130px)" }}>
              <PhotoCard
                item={{ src: "/slides/home/02.jpg", label: "Backstage", sub: "2025", link: "/backstage" }}
              />
            </div>
          </div>

          {/* ─ Section 2: Text ─ */}
          <div style={{
            marginTop: "clamp(60px, 10vh, 110px)",
            maxWidth: "680px",
            padding: "0 4px",
          }}>
            <p style={{
              color: "rgba(245,240,232,0.82)",
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "clamp(22px, 3.2vw, 42px)",
              lineHeight: 1.25,
              letterSpacing: "0.01em",
              fontWeight: 400,
              margin: "0 0 32px 0",
            }}>
              Runway, backstage, and editorial photography at the intersection of fashion and fine art.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {[
                { label: "All Work", href: "/runway" },
                { label: "About", href: "/about" },
              ].map(({ label, href }) => (
                <a key={label} href={href} style={{
                  color: "rgba(245,240,232,0.55)",
                  textDecoration: "none",
                  fontSize: "9px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontFamily: "Arial, sans-serif",
                  padding: "10px 20px",
                  border: "1px solid rgba(245,240,232,0.15)",
                  transition: "all 0.25s ease",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "rgba(245,240,232,0.9)";
                    e.currentTarget.style.borderColor = "rgba(245,240,232,0.45)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(245,240,232,0.55)";
                    e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)";
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ─ Section 3: Three images ─ */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "clamp(16px, 2.5vw, 40px)",
            marginTop: "clamp(60px, 10vh, 110px)",
          }}>
            <div style={{ flex: "0 0 26%", marginTop: "clamp(30px, 6vh, 70px)" }}>
              <PhotoCard
                item={{ src: "/slides/home/05.jpg", label: "Campaigns", link: "/campaigns" }}
              />
            </div>
            <div style={{ flex: "0 0 42%" }}>
              <PhotoCard
                item={{ src: "/slides/home/06.jpg", label: "Walter Van Bierendonck", sub: "AW25", link: "/runway/walter-van-bierendonck" }}
              />
            </div>
            <div style={{ flex: "0 0 24%", marginTop: "clamp(80px, 16vh, 160px)" }}>
              <PhotoCard
                item={{ src: "/slides/home/09.jpg", label: "KidSuper", sub: "AW26", link: "/runway/kidsuper-aw2627" }}
              />
            </div>
          </div>

          {/* ─ Section 4: Full width ─ */}
          <div style={{ marginTop: "clamp(60px, 10vh, 110px)" }}>
            <PhotoCard
              item={{ src: "/slides/home/11.jpg", label: "Runway", sub: "NYC · 2025–26", link: "/runway" }}
            />
          </div>

          {/* ─ Section 5: Two images, reversed offset ─ */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "clamp(16px, 2.5vw, 40px)",
            marginTop: "clamp(60px, 10vh, 110px)",
          }}>
            <div style={{ flex: "0 0 38%", marginTop: "clamp(50px, 10vh, 100px)" }}>
              <PhotoCard
                item={{ src: "/slides/home/13.jpg", label: "Graphic Design", link: "/graphic-design" }}
              />
            </div>
            <div style={{ flex: "0 0 52%" }}>
              <PhotoCard
                item={{ src: "/slides/home/14.jpg", label: "Backstage", sub: "2025–26", link: "/backstage" }}
              />
            </div>
          </div>

          {/* ─ Section 6: Three equal ─ */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "clamp(16px, 2.5vw, 40px)",
            marginTop: "clamp(60px, 10vh, 110px)",
          }}>
            {[
              { src: "/slides/home/15.jpg", label: "Runway", link: "/runway" },
              { src: "/slides/home/16.jpg", label: "KidSuper", sub: "AW25", link: "/runway/kidsuper-aw25", offset: "clamp(40px, 8vh, 80px)" },
              { src: "/slides/home/17.jpg", label: "Backstage", link: "/backstage", offset: "clamp(16px, 3vh, 30px)" },
            ].map((item, i) => (
              <div key={i} style={{ flex: "1", marginTop: item.offset ?? "0" }}>
                <PhotoCard item={{ src: item.src, label: item.label, sub: item.sub, link: item.link }} />
              </div>
            ))}
          </div>

        </main>

        {/* ── Footer ── */}
        <footer style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 32px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <span style={{
            color: "rgba(245,240,232,0.18)",
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
            style={{ color: "rgba(245,240,232,0.25)", display: "block", transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.25")}
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
