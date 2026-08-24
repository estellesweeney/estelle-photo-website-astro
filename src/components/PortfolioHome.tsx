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
  { label: "Runway",  href: "/runway" },
  { label: "About", href: "/about" },
];

const RUNWAY_SLIDES = Array.from({ length: 11 }, (_, i) => `/slides/home/runway/r-${String(i + 1).padStart(2, "0")}.jpg`);

const CARDS = [
  { num: "02", label: "Editorial & Shows",     title: "Campaigns",      href: "/campaigns",      src: "/slides/home/campaigns-cover.jpg" },

  { num: "04", label: "Art Direction",         title: "Graphic Design", href: "/graphic-design", src: "/art/graphic-design-cover2.jpg" },
];

const RUNWAY_CARD = { num: "01", label: "Runway Shows", title: "Runway", href: "/runway", src: "/slides/home/runway/r-01.jpg" }; // mobile cover

// ── Desktop Runway Hero — split layout ────────────────────────────────────────
function RunwayHero() {
  const n = RUNWAY_SLIDES.length;
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [hovLeft, setHovLeft] = useState(false);
  const [hovRight, setHovRight] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadingRef = useRef(false); // use ref to avoid stale closure

  const prevIdx = (cur - 1 + n) % n;
  const nextIdx = (cur + 1) % n;

  const goTo = (idx: number) => {
    if (fadingRef.current) return;
    fadingRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setPrev(cur);
    setCur(idx);
    setTimeout(() => { setPrev(null); fadingRef.current = false; }, 750);
  };

  const goPrev = (e: React.MouseEvent) => { e.preventDefault(); goTo(prevIdx); };
  const goNext = (e: React.MouseEvent) => { e.preventDefault(); goTo(nextIdx); };

  useEffect(() => {
    // Auto-advance on mobile only
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (!isMobile) return;
    timerRef.current = setTimeout(() => goTo(nextIdx), 4500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [cur]);

  return (
    <div style={{
      display: "flex",
      alignItems: "stretch",
      overflow: "hidden",
      background: "#080808",
    }}>

      {/* ── Left peek ── */}
      <div
        onClick={goPrev}
        onMouseEnter={() => setHovLeft(true)}
        onMouseLeave={() => setHovLeft(false)}
        style={{ width: "7%", flexShrink: 0, position: "relative", overflow: "hidden", cursor: "pointer", alignSelf: "stretch" }}
      >
        <img src={RUNWAY_SLIDES[prevIdx]} alt="" draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
            filter: `brightness(${hovLeft ? 0.35 : 0.2})`, transition: "filter 0.3s ease" }} />
        {/* gradient edge blend */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 0%, rgba(8,8,8,0.4) 100%)", pointerEvents: "none" }} />
      </div>

      {/* ── Main image — 4:5 container, height drives layout ── */}
      <div
        style={{
          flexShrink: 0,
          height: "clamp(480px, 82vh, 880px)",
          aspectRatio: "4/5",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={() => { setHovLeft(true); setHovRight(true); }}
        onMouseLeave={() => { setHovLeft(false); setHovRight(false); }}
      >
        {/* prev — stays fully visible underneath while new one fades in */}
        {prev !== null && (
          <img src={RUNWAY_SLIDES[prev]} alt="" draggable={false}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 1 }} />
        )}
        {/* current — fades in on top via CSS animation; key forces remount on each change */}
        <img key={cur} src={RUNWAY_SLIDES[cur]} alt="Runway" draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", animation: "heroFadeIn 0.75s ease forwards" }} />
        {/* subtle right-side gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 70%, rgba(8,8,8,0.4) 100%)", pointerEvents: "none" }} />
        {/* clickable link overlay (center) */}
        <a href="/runway" style={{ position: "absolute", inset: 0, zIndex: 2, display: "block" }} aria-label="View Runway collection" />
        {/* Left arrow — overlaid on left edge of image */}
        <div onClick={e => { e.preventDefault(); goPrev(e); }}
          style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", zIndex: 10,
            opacity: hovLeft ? 1 : 0, transition: "opacity 0.25s", cursor: "pointer" }}>
          <div style={{ width: "36px", height: "36px", border: "1px solid rgba(245,240,232,0.45)", borderRadius: "50%",
            background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "rgba(245,240,232,0.9)", fontSize: "13px", lineHeight: 1 }}>←</span>
          </div>
        </div>
        {/* Right arrow — overlaid on right edge of image */}
        <div onClick={e => { e.preventDefault(); goNext(e); }}
          style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", zIndex: 10,
            opacity: hovRight ? 1 : 0, transition: "opacity 0.25s", cursor: "pointer" }}>
          <div style={{ width: "36px", height: "36px", border: "1px solid rgba(245,240,232,0.45)", borderRadius: "50%",
            background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "rgba(245,240,232,0.9)", fontSize: "13px", lineHeight: 1 }}>→</span>
          </div>
        </div>
      </div>

      {/* ── Text panel ── */}
      <div style={{
        width: "36%",
        flexShrink: 0,
        background: "#080808",
        padding: "clamp(32px, 4vw, 64px) clamp(28px, 3vw, 52px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}>

        {/* Number */}
        <p style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(245,240,232,0.22)", margin: "0 0 14px" }}>
          01
        </p>

        {/* Title */}
        <h2 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(42px, 4.4vw, 66px)", fontWeight: 400, letterSpacing: "0.04em", color: "rgba(245,240,232,0.95)", margin: "0 0 20px", lineHeight: 1 }}>
          Runway
        </h2>

        {/* Divider */}
        <div style={{ width: "36px", height: "1px", background: "rgba(245,240,232,0.18)", margin: "0 0 22px" }} />

        {/* Description */}
        <p style={{ fontFamily: "Arial, sans-serif", fontSize: "9.6px", lineHeight: 1.75, letterSpacing: "0.03em", color: "rgba(245,240,232,0.42)", margin: "0 0 30px", maxWidth: "240px" }}>
          Fashion in motion. Captured in real time. A study of form, texture, and presence on the runway.
        </p>

        {/* CTA */}
        <a href="/runway"
          style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "Arial, sans-serif", fontSize: "7.2px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.65)", textDecoration: "none", marginBottom: "42px", transition: "color 0.2s, gap 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "rgba(245,240,232,0.95)"; e.currentTarget.style.gap = "16px"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(245,240,232,0.65)"; e.currentTarget.style.gap = "10px"; }}
        >
          View Collection <span style={{ fontSize: "9px" }}>→</span>
        </a>

        {/* Metadata */}
        <div style={{ display: "flex", gap: "32px", borderTop: "1px solid rgba(245,240,232,0.07)", paddingTop: "20px", marginBottom: "28px", justifyContent: "center" }}>
          <div>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "6.4px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.18)", margin: "0 0 5px" }}>Images</p>
            <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "17.6px", fontWeight: 400, color: "rgba(245,240,232,0.55)", margin: 0, lineHeight: 1 }}>184</p>
          </div>
          <div>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "6.4px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.18)", margin: "0 0 5px" }}>Locations</p>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "7.2px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.45)", margin: 0, lineHeight: 1.4 }}>
              Paris / Milan<br />New York
            </p>
          </div>
        </div>

        {/* Slide indicators */}
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "center", maxWidth: "200px" }}>
          {RUNWAY_SLIDES.map((_, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{ width: i === cur ? "18px" : "4px", height: "2px", background: i === cur ? "rgba(245,240,232,0.7)" : "rgba(245,240,232,0.15)", borderRadius: "2px", transition: "all 0.4s ease", cursor: "pointer" }}
            />
          ))}
        </div>
      </div>

      {/* ── Right peek ── */}
      <div
        onClick={goNext}
        onMouseEnter={() => setHovRight(true)}
        onMouseLeave={() => setHovRight(false)}
        style={{ width: "7%", flexShrink: 0, position: "relative", overflow: "hidden", cursor: "pointer", alignSelf: "stretch" }}
      >
        <img src={RUNWAY_SLIDES[nextIdx]} alt="" draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
            filter: `brightness(${hovRight ? 0.35 : 0.2})`, transition: "filter 0.3s ease" }} />
        {/* gradient edge blend */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, transparent 0%, rgba(8,8,8,0.4) 100%)", pointerEvents: "none" }} />
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
    img.onerror = () => setLoaded(true); // don't block on 404
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

          {/* ── DESKTOP HERO — full-width split layout ── */}
          <div className="runway-hero-wrap">
            <RunwayHero />
          </div>

          {/* ── MOBILE RUNWAY CARD ── */}
          <div className="runway-mobile-card" style={{ padding: "0 8px 8px" }}>
            <WorkCard {...RUNWAY_CARD} />
          </div>

          {/* ── 3-COL GRID ── */}
          <div className="home-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            padding: "8px",
          }}>
            {CARDS.map(c => <WorkCard key={c.title} {...c} />)}
          </div>

          {/* Footer */}
          <div style={{
            maxWidth: "1100px", margin: "0 auto",
            padding: "48px clamp(20px, 4vw, 60px)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderTop: "1px solid rgba(245,240,232,0.06)", marginTop: "8px",
          }}>
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
        @keyframes heroFadeIn { from { opacity: 0; } to { opacity: 1; } }
        /* Desktop: show split hero, hide mobile card */
        .runway-hero-wrap { display: block; }
        .runway-mobile-card { display: none; }

        /* Mobile: hide split hero, show single runway card, single-col grid */
        @media (max-width: 768px) {
          .runway-hero-wrap { display: none !important; }
          .runway-mobile-card { display: block !important; }
          .home-grid { grid-template-columns: 1fr !important; }
          nav { padding: 18px 20px !important; grid-template-columns: auto 1fr !important; }
          nav span { display: none !important; }
          nav > div:last-child { gap: 18px !important; }
        }
      `}</style>
    </>
  );
}
