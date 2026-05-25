import { useState } from "react";
import AsciiIntro from "@/components/AsciiIntro";

const menuLinks = [
  { label: "Work",           link: "/runway" },
  { label: "Services",       link: "/campaigns" },
  { label: "About",          link: "/about" },
  { label: "Contact",        link: "/about" },
];

const services = [
  "RUNWAY / SHOWS",
  "BACKSTAGE",
  "CAMPAIGNS",
  "EDITORIAL",
  "GRAPHIC DESIGN",
];

const footerNav = [
  { icon: "◈", top: "COLLECTIONS", bot: "ARCHIVE",      link: "/runway" },
  { icon: "◻", top: "BACKSTAGE",   bot: "ACCESS",        link: "/backstage" },
  { icon: "✦", top: "EDITORIAL",   bot: "PRESS",         link: "/campaigns" },
  { icon: "◉", top: "GRAPHIC",     bot: "DESIGN",        link: "/graphic-design" },
  { icon: "◌", top: "ABOUT",       bot: "CONTACT",       link: "/about" },
];

export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const cream = "#EDEAE2";
  const ink   = "#0d0d0d";
  const muted = "rgba(13,13,13,0.38)";

  return (
    <>
      {showIntro && <AsciiIntro onDone={() => setShowIntro(false)} />}

      <div style={{ background: cream, color: ink, minHeight: "100dvh", fontFamily: "Arial, sans-serif" }}>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 28px",
          height: "48px",
          borderBottom: `1px solid rgba(13,13,13,0.12)`,
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: cream,
        }}>
          <a href="/" style={{ color: ink, textDecoration: "none", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Bodoni Moda', serif", fontWeight: 600 }}>
            Estelle Sweeney
          </a>
          <nav style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {menuLinks.map(({ label, link }, i) => (
              <a key={label} href={link} style={{
                color: i === 0 ? ink : muted,
                textDecoration: "none",
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "4px 10px",
                border: i === 0 ? `1px solid ${ink}` : "1px solid transparent",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = ink; e.currentTarget.style.borderColor = ink; }}
                onMouseLeave={e => { e.currentTarget.style.color = i === 0 ? ink : muted; e.currentTarget.style.borderColor = i === 0 ? ink : "transparent"; }}
              >
                {label}
              </a>
            ))}
            <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", color: muted, fontSize: "18px", cursor: "pointer", padding: "4px 6px", lineHeight: 1 }}
              onMouseEnter={e => (e.currentTarget.style.color = ink)}
              onMouseLeave={e => (e.currentTarget.style.color = muted)}
            >+</button>
          </nav>
        </header>

        {/* ── MENU OVERLAY ─────────────────────────────────────────────────── */}
        {menuOpen && (
          <div style={{ position: "fixed", inset: 0, background: cream, zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "clamp(12px,2.2vh,24px)" }}>
            <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "16px", right: "28px", background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: muted }}>×</button>
            {menuLinks.map(({ label, link }) => (
              <a key={label} href={link} style={{ color: ink, textDecoration: "none", fontSize: "clamp(28px,5vw,56px)", fontFamily: "'Bodoni Moda', serif", letterSpacing: "0.04em", transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.25")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >{label}</a>
            ))}
          </div>
        )}

        {/* ── MAIN 3-COLUMN GRID ───────────────────────────────────────────── */}
        <main style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 0.85fr", borderBottom: `1px solid rgba(13,13,13,0.1)` }} className="home-grid">

          {/* ── LEFT COL ── */}
          <div style={{ borderRight: `1px solid rgba(13,13,13,0.1)`, display: "flex", flexDirection: "column" }}>

            {/* Top label */}
            <div style={{ padding: "14px 20px 12px", borderBottom: `1px solid rgba(13,13,13,0.1)` }}>
              <span style={{ fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: muted }}>Projects</span>
            </div>

            {/* Big name */}
            <div style={{ padding: "16px 20px 0", flex: 1 }}>
              <div style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: "clamp(52px, 7.5vw, 110px)",
                lineHeight: 0.92,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: ink,
              }}>
                ESTELLE<br />SWEENEY
              </div>

              <div style={{ marginTop: "20px", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: muted, lineHeight: 1.8 }}>
                <span style={{ color: "#c0392b" }}>Analog Works</span> + <span style={{ color: "#2980b9" }}>Runway</span><br />
                Since 2019
              </div>

              <a href="/runway" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                marginTop: "20px",
                color: ink, textDecoration: "underline",
                fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.45")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                View Projects →
              </a>
            </div>

            {/* Bottom: two small photos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1px solid rgba(13,13,13,0.1)`, marginTop: "24px" }}>
              {["/slides/home/03.jpg", "/slides/home/07.jpg"].map((src, i) => (
                <a key={i} href="/runway" style={{ display: "block", borderRight: i === 0 ? `1px solid rgba(13,13,13,0.1)` : "none" }}>
                  <img src={src} alt="" draggable={false} style={{ width: "100%", height: "clamp(120px,16vw,220px)", objectFit: "cover", display: "block", filter: "grayscale(20%)" }} />
                </a>
              ))}
            </div>

            {/* Speech bubble */}
            <div style={{
              margin: "16px 20px",
              background: "#c0392b",
              color: "#fff",
              padding: "8px 14px",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              lineHeight: 1.6,
              display: "inline-block",
              alignSelf: "flex-start",
            }}>
              WVB · KIDSUPER · BBC<br />NYC + PARIS 2025–26
            </div>
          </div>

          {/* ── CENTER COL ── */}
          <div style={{ borderRight: `1px solid rgba(13,13,13,0.1)`, display: "flex", flexDirection: "column" }}>

            {/* Top label row */}
            <div style={{ padding: "14px 20px 12px", borderBottom: `1px solid rgba(13,13,13,0.1)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: muted }}>Featured</span>
              <span style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: muted }}>2025–26</span>
            </div>

            {/* Two large photos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              <a href="/runway" style={{ display: "block", borderRight: `1px solid rgba(13,13,13,0.1)` }}>
                <img src="/slides/home/01.jpg" alt="Runway" draggable={false}
                  style={{ width: "100%", height: "clamp(260px,36vw,480px)", objectFit: "cover", display: "block", filter: "grayscale(15%)", transition: "filter 0.4s" }}
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.filter = "grayscale(0%)")}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.filter = "grayscale(15%)")}
                />
              </a>
              <a href="/backstage" style={{ display: "block" }}>
                <img src="/slides/home/11.jpg" alt="Backstage" draggable={false}
                  style={{ width: "100%", height: "clamp(260px,36vw,480px)", objectFit: "cover", display: "block", marginTop: "clamp(30px,5vw,60px)", filter: "grayscale(15%)", transition: "filter 0.4s" }}
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.filter = "grayscale(0%)")}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.filter = "grayscale(15%)")}
                />
              </a>
            </div>

            {/* Caption */}
            <div style={{ padding: "12px 20px", borderTop: `1px solid rgba(13,13,13,0.1)`, marginTop: "auto" }}>
              <span style={{ fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase", color: muted }}>
                Runway · Backstage · Editorial
              </span>
            </div>

            {/* Lower photos: 3 in a row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid rgba(13,13,13,0.1)` }}>
              {["/slides/home/04.jpg", "/slides/home/13.jpg", "/slides/home/16.jpg"].map((src, i) => (
                <a key={i} href="/runway" style={{ display: "block", borderRight: i < 2 ? `1px solid rgba(13,13,13,0.1)` : "none" }}>
                  <img src={src} alt="" draggable={false}
                    style={{ width: "100%", height: "clamp(90px,12vw,160px)", objectFit: "cover", display: "block", filter: "grayscale(20%)", transition: "filter 0.4s" }}
                    onMouseEnter={e => ((e.target as HTMLImageElement).style.filter = "grayscale(0%)")}
                    onMouseLeave={e => ((e.target as HTMLImageElement).style.filter = "grayscale(20%)")}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT COL ── */}
          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* Top label */}
            <div style={{ padding: "14px 20px 12px", borderBottom: `1px solid rgba(13,13,13,0.1)`, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: muted }}>Gallery</span>
              <div style={{ display: "flex", gap: "6px" }}>
                {["Grid", "List"].map((t, i) => (
                  <span key={t} style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: i === 0 ? ink : muted, cursor: "pointer" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* 2×2 image grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {["/slides/home/02.jpg", "/art/bbc-illustrations.jpg", "/slides/home/05.jpg", "/art/kidsuper/cover.jpg"].map((src, i) => (
                <a key={i} href={i % 2 === 1 ? "/graphic-design" : "/runway"} style={{ display: "block", borderRight: i % 2 === 0 ? `1px solid rgba(13,13,13,0.1)` : "none", borderBottom: i < 2 ? `1px solid rgba(13,13,13,0.1)` : "none" }}>
                  <img src={src} alt="" draggable={false}
                    style={{ width: "100%", height: "clamp(110px,14vw,180px)", objectFit: "cover", display: "block", filter: "grayscale(20%)", transition: "filter 0.4s" }}
                    onMouseEnter={e => ((e.target as HTMLImageElement).style.filter = "grayscale(0%)")}
                    onMouseLeave={e => ((e.target as HTMLImageElement).style.filter = "grayscale(20%)")}
                  />
                </a>
              ))}
            </div>

            {/* Speech bubble */}
            <div style={{
              margin: "14px 20px 0",
              background: "#2980b9",
              color: "#fff",
              padding: "8px 14px",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              lineHeight: 1.6,
              alignSelf: "flex-start",
            }}>
              Analog · Film · Archive
            </div>

            {/* Services list */}
            <div style={{ padding: "16px 20px", borderTop: `1px solid rgba(13,13,13,0.1)`, marginTop: "16px" }}>
              <div style={{ fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: muted, marginBottom: "10px" }}>Services</div>
              {services.map(s => (
                <div key={s} style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: ink, padding: "5px 0", borderBottom: `1px solid rgba(13,13,13,0.07)`, lineHeight: 1 }}>
                  {s}
                </div>
              ))}
            </div>

            {/* Contact + big photo */}
            <div style={{ marginTop: "auto" }}>
              <a href="/runway" style={{ display: "block", borderTop: `1px solid rgba(13,13,13,0.1)` }}>
                <img src="/slides/home/14.jpg" alt="" draggable={false}
                  style={{ width: "100%", height: "clamp(140px,18vw,240px)", objectFit: "cover", display: "block", filter: "grayscale(15%)", transition: "filter 0.4s" }}
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.filter = "grayscale(0%)")}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.filter = "grayscale(15%)")}
                />
              </a>
              <div style={{ padding: "14px 20px", borderTop: `1px solid rgba(13,13,13,0.1)` }}>
                <div style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: muted, marginBottom: "6px" }}>Project inquiries</div>
                <a href="mailto:info@estellesweeney.com" style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: ink, textDecoration: "underline" }}>
                  Let's Create Together →
                </a>
              </div>
            </div>

          </div>
        </main>

        {/* ── FOOTER ICON NAV ──────────────────────────────────────────────── */}
        <footer style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          borderTop: `1px solid rgba(13,13,13,0.1)`,
        }}>
          {footerNav.map(({ icon, top, bot, link }, i) => (
            <a key={i} href={link} style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 20px",
              borderRight: i < 4 ? `1px solid rgba(13,13,13,0.1)` : "none",
              textDecoration: "none",
              color: ink,
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(13,13,13,0.04)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: "18px", opacity: 0.5, flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1.5 }}>{top}</div>
                <div style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: muted, lineHeight: 1.5 }}>{bot}</div>
              </div>
            </a>
          ))}
        </footer>

      </div>
    </>
  );
}
