import { useState, useEffect, useRef } from "react";
import AsciiIntro from "@/components/AsciiIntro";

// ── Home icon ─────────────────────────────────────────────────────────────────
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
  { label: "Runway",        href: "/runway" },
  { label: "Backstage",     href: "/backstage" },
  { label: "Contact",       href: "/about" },
];

const RUNWAY_SLIDES = Array.from({ length: 26 }, (_, i) => `/slides/home/runway/r-${String(i + 1).padStart(2, "0")}.jpg`);

const CARDS = [
  { num: "02", label: "Editorial & Shows",     title: "Campaigns",      href: "/campaigns",      src: "/slides/home/campaigns-cover.jpg" },
  { num: "03", label: "Behind the Collection", title: "Backstage",      href: "/backstage",      src: "/slides/home/01.jpg" },
  { num: "04", label: "Art Direction",         title: "Graphic Design", href: "/graphic-design", src: "/art/graphic-design-cover.jpg" },
];

// ── Runway hero slideshow ─────────────────────────────────────────────────────
function RunwayHero() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const [hovSide, setHovSide] = useState<"left" | "right" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    if (fading) return;
    if (timer.current) clearTimeout(timer.current);
    setPrev(cur);
    setCur(idx);
    setFading(true);
    setTimeout(() => { setPrev(null); setFading(false); }, 700);
  };

  const goPrev = (e: React.MouseEvent) => { e.preventDefault(); goTo((cur - 1 + RUNWAY_SLIDES.length) % RUNWAY_SLIDES.length); };
  const goNext = (e: React.MouseEvent) => { e.preventDefault(); goTo((cur + 1) % RUNWAY_SLIDES.length); };

  useEffect(() => {
    timer.current = setTimeout(() => goTo((cur + 1) % RUNWAY_SLIDES.length), 3500);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [cur]);

  return (
    <div style={{ display: "block", position: "relative", width: "100%", aspectRatio: "16/7", overflow: "hidden", background: "#111", flexShrink: 0 }}>
      {/* prev image (fading out) */}
      {prev !== null && (
        <img src={RUNWAY_SLIDES[prev]} alt="" draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", opacity: fading ? 0 : 1, transition: "opacity 0.7s ease" }} />
      )}
      {/* current image */}
      <img src={RUNWAY_SLIDES[cur]} alt="Runway" draggable={false}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", opacity: 1, filter: "brightness(0.62)" }} />

      {/* bottom gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 55%)", pointerEvents: "none" }} />

      {/* left click zone */}
      <div onClick={goPrev}
        onMouseEnter={() => setHovSide("left")} onMouseLeave={() => setHovSide(null)}
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "25%", zIndex: 10, cursor: cur > 0 ? "w-resize" : "default",
          background: hovSide === "left" ? "linear-gradient(to right, rgba(0,0,0,0.18), transparent)" : "transparent",
          display: "flex", alignItems: "center", paddingLeft: "20px", transition: "background 0.2s" }}>
        {hovSide === "left" && cur > 0 && (
          <span style={{ color: "rgba(245,240,232,0.6)", fontSize: "20px", fontFamily: "Arial, sans-serif" }}>←</span>
        )}
      </div>

      {/* right click zone */}
      <div onClick={goNext}
        onMouseEnter={() => setHovSide("right")} onMouseLeave={() => setHovSide(null)}
        style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "25%", zIndex: 10, cursor: "e-resize",
          background: hovSide === "right" ? "linear-gradient(to left, rgba(0,0,0,0.18), transparent)" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "20px", transition: "background 0.2s" }}>
        {hovSide === "right" && (
          <span style={{ color: "rgba(245,240,232,0.6)", fontSize: "20px", fontFamily: "Arial, sans-serif" }}>→</span>
        )}
      </div>

      {/* center — links to /runway */}
      <a href="/runway" style={{ position: "absolute", left: "25%", right: "25%", top: 0, bottom: "60px", zIndex: 9, display: "block" }} />

      {/* text overlay */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(20px,4vw,48px)", zIndex: 11, pointerEvents: "none" }}>
        <p style={{ fontFamily: "Arial, sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", margin: "0 0 10px" }}>01</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <h2 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(28px, 4vw, 58px)", fontWeight: 400, letterSpacing: "0.06em", color: "rgba(245,240,232,0.95)", margin: 0, lineHeight: 1 }}>
            Runway
          </h2>
          <a href="/runway" style={{ fontFamily: "Arial, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)", textDecoration: "none", pointerEvents: "all" }}>
            View Collection &rarr;
          </a>
        </div>
      </div>

      {/* dot indicators */}
      <div style={{ position: "absolute", bottom: "clamp(20px,4vw,48px)", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 11, pointerEvents: "none" }}>
        {RUNWAY_SLIDES.map((_, i) => (
          <div key={i} style={{ width: i === cur ? "16px" : "4px", height: "2px", background: i === cur ? "rgba(245,240,232,0.8)" : "rgba(245,240,232,0.25)", borderRadius: "2px", transition: "all 0.4s ease" }} />
        ))}
      </div>
    </div>
  );
}

// ── Work card ─────────────────────────────────────────────────────────────────
function WorkCard({ num, label, title, href, src }: typeof CARDS[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "block", position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#111", textDecoration: "none" }}
    >
      <img src={src} alt={title} loading="lazy" draggable={false}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 15%",
          filter: `brightness(${hovered ? 0.75 : 0.62})`,
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "filter 0.6s ease, transform 0.9s ease",
        }}
      />
      {/* bottom gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.88) 0%, transparent 60%)", pointerEvents: "none" }} />

      {/* text */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(16px,3vw,28px)" }}>
        <p style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", margin: "0 0 8px" }}>{num}</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <h3 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(18px, 2.2vw, 30px)", fontWeight: 400, letterSpacing: "0.06em", color: "rgba(245,240,232,0.95)", margin: 0, lineHeight: 1 }}>
            {title}
          </h3>
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.3s ease", whiteSpace: "nowrap", paddingLeft: "12px" }}>
            View &rarr;
          </span>
        </div>
        <p style={{ fontFamily: "Arial, sans-serif", fontSize: "7px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", margin: "6px 0 0" }}>{label}</p>
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
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = RUNWAY_SLIDES[0];
    img.onload = () => setLoaded(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <HomeIconReact />
          </div>
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", whiteSpace: "nowrap" }}>
            Estelle Sweeney
          </span>
          <div style={{ display: "flex", gap: "36px", justifyContent: "flex-end" }}>
            {NAV.map(({ label, href }) => (
              <a key={label} href={href} style={{ fontFamily: "Arial, sans-serif", fontSize: "9px", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.95)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.4)")}
              >{label}</a>
            ))}
          </div>
        </nav>

        {/* ── MAIN CONTENT ── */}
        <main style={{ paddingTop: "80px", opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease" }}>

          {/* Centered content wrapper */}
          <div className="home-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)" }}>

            {/* ── RUNWAY HERO BANNER ── */}
            <div style={{ marginBottom: "12px" }}>
              <RunwayHero />
            </div>

            {/* ── 3-COL GRID ── */}
            <div className="home-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {CARDS.map(c => <WorkCard key={c.title} {...c} />)}
            </div>

          </div>

          {/* Footer */}
          <div className="site-footer" style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px clamp(20px, 4vw, 60px)", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(245,240,232,0.06)", marginTop: "48px" }}>
            <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "11px", letterSpacing: "0.18em", color: "rgba(245,240,232,0.22)", textTransform: "uppercase" }}>
              Estelle Sweeney
            </span>
            <div style={{ display: "flex", gap: "32px" }}>
              {[["Instagram", "https://instagram.com/estellesweeney_"], ["Email", "/about"]].map(([lbl, href]) => (
                <a key={lbl} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.22)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.22)")}
                >{lbl}</a>
              ))}
            </div>
          </div>
        </main>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .home-grid { grid-template-columns: 1fr !important; }
          nav { padding: 18px 20px !important; grid-template-columns: auto 1fr !important; }
          nav span { display: none !important; }
          nav > div:last-child { gap: 18px !important; }
          .site-footer { flex-direction: column !important; gap: 18px !important; padding: 36px 20px !important; align-items: flex-start !important; }
        }
      `}</style>
    </>
  );
}
