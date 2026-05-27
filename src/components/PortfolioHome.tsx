import { useState, useEffect, useRef } from "react";
import AsciiIntro from "@/components/AsciiIntro";

// ── Home icon (the tap-in creature) ───────────────────────────────────────────
function HomeIconReact() {
  const [hov, setHov] = useState(false);
  return (
    <a href="/" aria-label="Home"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", textDecoration: "none", gap: "3px", lineHeight: 1 }}
    >
      <img src="/icons/icon_16_white.png" alt=""
        style={{ height: "22px", width: "auto", opacity: hov ? 0.45 : 0.9, transition: "opacity 0.25s ease", display: "block" }} />
      <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.12em", color: "rgba(245,240,232,0.75)", opacity: hov ? 1 : 0, transition: "opacity 0.25s ease", whiteSpace: "nowrap" }}>
        home
      </span>
    </a>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV = [
  { label: "Runway",       href: "/runway" },
  { label: "Backstage",    href: "/backstage" },
  { label: "Contact",      href: "/about" },
];

const SECTIONS = [
  { label: "Runway",        sub: "Editorial & Shows",     href: "/runway",         src: "/slides/home/11.jpg" },
  { label: "Backstage",     sub: "Behind the Collection", href: "/backstage",       src: "/slides/home/01.jpg" },
  { label: "Graphic Design",sub: "Art Direction",         href: "/graphic-design",  src: "/art/bbc-illustrations.jpg" },
];

// ── Work card ─────────────────────────────────────────────────────────────────
function WorkCard({ label, sub, href, src }: { label: string; sub: string; href: string; src: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "block", position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#111", textDecoration: "none" }}
    >
      <img src={src} alt={label} loading="lazy" draggable={false}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 15%",
          filter: hovered ? "grayscale(0%) brightness(0.95)" : "grayscale(0%) brightness(0.82)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "filter 0.6s ease, transform 0.9s ease",
        }}
      />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "60px 24px 28px", background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", margin: "0 0 6px" }}>{sub}</p>
            <h3 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 400, letterSpacing: "0.06em", color: "rgba(245,240,232,0.95)", margin: 0 }}>{label}</h3>
          </div>
          <span style={{ color: "rgba(245,240,232,0.4)", fontSize: "20px", transform: hovered ? "translateX(5px)" : "translateX(0)", transition: "transform 0.3s ease" }}>→</span>
        </div>
      </div>
    </a>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("intro_seen");
  });
  const [loaded,   setLoaded]   = useState(false);
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
    <>
      {/* Binary popup intro — kept exactly as before */}
      {showIntro && (
        <AsciiIntro onDone={() => { sessionStorage.setItem("intro_seen", "1"); setShowIntro(false); }} />
      )}

      <div style={{ background: "#080808", minHeight: "100dvh", opacity: showIntro ? 0 : 1, transition: "opacity 0.6s ease" }}>

        {/* ── NAV ── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center",
          padding: "24px 40px",
          background: scrolled ? "rgba(8,8,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          transition: "background 0.4s ease",
        }}>
          {/* Left — icon */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <HomeIconReact />
          </div>
          {/* Center — name */}
          <span style={{
            fontFamily: "Arial, sans-serif", fontSize: "8px",
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(245,240,232,0.35)", whiteSpace: "nowrap",
          }}>
            Estelle Sweeney
          </span>
          {/* Right — nav links */}
          <div style={{ display: "flex", gap: "36px", justifyContent: "flex-end" }}>
            {NAV.map(({ label, href }) => (
              <a key={label} href={href} style={{
                fontFamily: "Arial, sans-serif", fontSize: "9px",
                letterSpacing: "0.24em", textTransform: "uppercase",
                color: "rgba(245,240,232,0.4)", textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.95)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.4)")}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── HERO — mobile only on desktop, hidden ── */}
        <section ref={heroRef} className="hero-section" style={{ height: "100dvh", minHeight: "-webkit-fill-available", position: "relative", overflow: "hidden" }}>

          {/* Full-bleed photo */}
          <img src="/slides/home/11.jpg" alt="" fetchPriority="high" draggable={false}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 20%",
              filter: "brightness(0.5) grayscale(20%)",
              opacity: loaded ? 1 : 0,
              transition: "opacity 1.2s ease",
            }}
          />

          {/* Bottom fade to bg */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 35%, rgba(8,8,8,0.9) 100%)", pointerEvents: "none" }} />

          {/* Name — positioned above model's head */}
          <div style={{
            position: "absolute", top: "18%", left: 0, right: 0,
            display: "flex", flexDirection: "column", alignItems: "center",
            textAlign: "center", padding: "0 24px",
            opacity: loaded ? 1 : 0, transition: "opacity 1.4s ease 0.3s",
          }}>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "clamp(7px, 0.75vw, 9px)", letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", margin: "0 0 22px" }}>
              Analog Fashion Photography
            </p>
            <h1 style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "clamp(54px, 7.5vw, 116px)",
              fontWeight: 400, letterSpacing: "0.1em",
              color: "rgba(245,240,232,0.96)",
              margin: 0, lineHeight: 1, textTransform: "uppercase",
            }}>
              Estelle
            </h1>
            {/* Thin divider line */}
            <div style={{ width: "1px", height: "44px", background: "rgba(245,240,232,0.22)", margin: "30px auto 0" }} />
          </div>

          {/* Scroll cue */}
          <div style={{
            position: "absolute", bottom: "28px", left: 0, right: 0,
            display: "flex", justifyContent: "center",
            opacity: loaded ? 1 : 0, transition: "opacity 1.4s ease 0.7s",
            pointerEvents: "none",
          }}>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.28)" }}>Scroll</span>
          </div>
        </section>

        {/* ── WORK GRID ── */}
        <section style={{ background: "#080808" }}>
          <div className="work-header" style={{ padding: "80px 40px 40px", display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,240,232,0.22)" }}>
              New York — Milan — Paris
            </span>
          </div>

          <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(245,240,232,0.05)" }}>
            {SECTIONS.map(s => <WorkCard key={s.label} {...s} />)}
          </div>

          {/* Footer */}
          <div className="site-footer" style={{ padding: "56px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
            <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "11px", letterSpacing: "0.18em", color: "rgba(245,240,232,0.22)", textTransform: "uppercase" }}>
              Estelle Sweeney
            </span>
            <div style={{ display: "flex", gap: "32px" }}>
              {[["Instagram", "https://instagram.com/estellesweeney_"], ["Email", "/about"]].map(([lbl, href]) => (
                <a key={lbl} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.22)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.22)")}
                >
                  {lbl}
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>

      <style>{`
        /* Desktop: skip hero, go straight to work grid */
        @media (min-width: 769px) {
          .hero-section { display: none !important; }
          .work-header { padding-top: 100px !important; }
        }
        /* Mobile: show hero, single-column grid */
        @media (max-width: 768px) {
          .work-grid { grid-template-columns: 1fr !important; }
          nav { padding: 18px 20px !important; grid-template-columns: auto 1fr !important; }
          nav span { display: none !important; }
          nav > div:last-child { gap: 18px !important; }
          .site-footer { flex-direction: column !important; gap: 18px !important; padding: 36px 20px !important; align-items: flex-start !important; }
        }
        @supports (-webkit-touch-callout: none) {
          .hero-section { height: 100svh !important; }
        }
      `}</style>
    </>
  );
}
