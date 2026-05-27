import { useState, useEffect, useRef } from "react";

const NAV = [
  { label: "Portfolio",   href: "/runway" },
  { label: "Backstage",   href: "/backstage" },
  { label: "Contact",     href: "/about" },
];

const SECTIONS = [
  { label: "Runway",        sub: "Editorial & Shows",    href: "/runway",          src: "/slides/home/11.jpg"  },
  { label: "Backstage",     sub: "Behind the Collection",href: "/backstage",        src: "/slides/home/01.jpg"  },
  { label: "Graphic Design",sub: "Art Direction",        href: "/graphic-design",   src: "/art/bbc-illustrations.jpg" },
];

export default function PortfolioHome() {
  const [loaded, setLoaded]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/slides/home/hero.jpg";
    img.onload = () => setLoaded(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#080808", minHeight: "100dvh" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "28px 40px",
        background: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}>
        <a href="/" style={{
          fontFamily: "'Bodoni Moda', serif",
          fontSize: "13px", letterSpacing: "0.22em",
          color: "rgba(245,240,232,0.9)", textDecoration: "none",
          textTransform: "uppercase",
        }}>
          Estelle Sweeney
        </a>
        <div style={{ display: "flex", gap: "36px" }}>
          {NAV.map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "9px", letterSpacing: "0.24em", textTransform: "uppercase",
              color: "rgba(245,240,232,0.4)", textDecoration: "none",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.4)")}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        height: "100dvh", minHeight: "-webkit-fill-available",
        position: "relative", overflow: "hidden",
      }}>
        {/* Image */}
        <img
          src="/slides/home/hero.jpg"
          alt=""
          fetchPriority="high"
          draggable={false}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 15%",
            filter: "brightness(0.55) grayscale(10%)",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />

        {/* Bottom vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(8,8,8,0.85) 100%)",
          pointerEvents: "none",
        }} />

        {/* Name — centered */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 24px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.4s ease 0.2s",
        }}>
          <p style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "clamp(7px, 0.75vw, 9px)",
            letterSpacing: "0.38em", textTransform: "uppercase",
            color: "rgba(245,240,232,0.35)", margin: "0 0 20px",
          }}>
            Analog Fashion Photography
          </p>
          <h1 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(52px, 7vw, 110px)",
            fontWeight: 400, letterSpacing: "0.1em",
            color: "rgba(245,240,232,0.96)",
            margin: 0, lineHeight: 1,
            textTransform: "uppercase",
          }}>
            Estelle
          </h1>
          <div style={{
            width: "1px", height: "40px",
            background: "rgba(245,240,232,0.25)",
            margin: "28px auto 0",
          }} />
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "32px", left: 0, right: 0,
          display: "flex", justifyContent: "center",
          opacity: loaded ? 1 : 0, transition: "opacity 1.4s ease 0.6s",
        }}>
          <span style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(245,240,232,0.3)",
          }}>
            Scroll
          </span>
        </div>
      </section>

      {/* ── WORK SECTIONS ── */}
      <section style={{ background: "#080808", padding: "0" }}>

        {/* Section header */}
        <div style={{
          padding: "80px 40px 40px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <h2 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(28px, 3vw, 42px)",
            fontWeight: 400, letterSpacing: "0.04em",
            color: "rgba(245,240,232,0.9)",
            margin: 0,
          }}>
            Work
          </h2>
          <span style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "8px", letterSpacing: "0.24em", textTransform: "uppercase",
            color: "rgba(245,240,232,0.25)",
          }}>
            New York — Milan — Paris
          </span>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(245,240,232,0.06)",
        }} className="work-grid">
          {SECTIONS.map(({ label, sub, href, src }) => (
            <WorkCard key={label} label={label} sub={sub} href={href} src={src} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: "60px 40px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(245,240,232,0.06)",
        }} className="footer-row">
          <span style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "11px", letterSpacing: "0.18em",
            color: "rgba(245,240,232,0.25)", textTransform: "uppercase",
          }}>
            Estelle Sweeney
          </span>
          <div style={{ display: "flex", gap: "32px" }}>
            {[["Instagram", "https://instagram.com/estellesweeney_"], ["Email", "/about"]].map(([lbl, href]) => (
              <a key={lbl} href={href} target={href.startsWith("http") ? "_blank" : undefined} style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(245,240,232,0.25)", textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.25)")}
              >
                {lbl}
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .work-grid {
            grid-template-columns: 1fr !important;
          }
          nav {
            padding: 20px 20px !important;
          }
          nav div {
            gap: 20px !important;
          }
          .footer-row {
            flex-direction: column !important;
            gap: 20px !important;
            padding: 40px 20px !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}

function WorkCard({ label, sub, href, src }: { label: string; sub: string; href: string; src: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", position: "relative",
        aspectRatio: "3/4", overflow: "hidden",
        background: "#111", textDecoration: "none",
      }}
    >
      <img
        src={src}
        alt={label}
        loading="lazy"
        draggable={false}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 15%",
          filter: hovered
            ? "grayscale(0%) brightness(0.75)"
            : "grayscale(30%) brightness(0.55)",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transition: "filter 0.6s ease, transform 0.8s ease",
        }}
      />

      {/* Bottom overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "60px 24px 28px",
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <div>
            <p style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(245,240,232,0.4)", margin: "0 0 6px",
            }}>
              {sub}
            </p>
            <h3 style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "clamp(18px, 2vw, 26px)",
              fontWeight: 400, letterSpacing: "0.06em",
              color: "rgba(245,240,232,0.95)",
              margin: 0,
            }}>
              {label}
            </h3>
          </div>
          <span style={{
            color: "rgba(245,240,232,0.4)",
            fontSize: "20px",
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.3s ease",
          }}>
            →
          </span>
        </div>
      </div>
    </a>
  );
}
