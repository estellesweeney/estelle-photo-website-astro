import { useState } from "react";
import AsciiIntro from "@/components/AsciiIntro";

// ─── Data ─────────────────────────────────────────────────────────────────────

const menuLinks = [
  { label: "Work",     link: "/runway" },
  { label: "Services", link: "/campaigns" },
  { label: "About",    link: "/about" },
  { label: "Contact",  link: "/about" },
];

const services = [
  { label: "Runway / Shows",  color: "#E8251A" },
  { label: "Backstage",       color: "#F5C800" },
  { label: "Campaigns",       color: "#6BB8E8" },
  { label: "Editorial",       color: "#8EE000" },
  { label: "Graphic Design",  color: "#F5B8C4" },
];

const footerNav = [
  { icon: "◈", top: "Collections", bot: "Archive",       link: "/runway" },
  { icon: "◻", top: "Backstage",   bot: "Access",        link: "/backstage" },
  { icon: "✦", top: "Editorial",   bot: "Press",         link: "/campaigns" },
  { icon: "◉", top: "Graphic",     bot: "Design",        link: "/graphic-design" },
  { icon: "◌", top: "About",       bot: "Contact",       link: "/about" },
];

// ─── Star icon (CSS mask — inherits any color) ────────────────────────────────

interface StarProps {
  color: string;
  size?: number;
  rotate?: number;
  float?: boolean;
}

function Star({ color, size = 16, rotate = 0, float = false }: StarProps) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: size,
        height: size,
        minWidth: size,
        backgroundColor: color,
        WebkitMaskImage: "url(/icons/icon_16.svg)",
        maskImage: "url(/icons/icon_16.svg)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        transform: `rotate(${hov && float ? rotate + 18 : rotate}deg) translateY(${hov && float ? -4 : 0}px)`,
        transition: "transform 0.35s ease",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

// ─── Image with B&W → color hover + grain ────────────────────────────────────

interface ImgProps {
  src: string;
  alt?: string;
  height: string;
  objectPosition?: string;
  link?: string;
}

function GrainImg({ src, alt = "", height, objectPosition = "center 15%", link }: ImgProps) {
  const [hov, setHov] = useState(false);
  const inner = (
    <div
      style={{ position: "relative", overflow: "hidden", display: "block", lineHeight: 0 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="lazy"
        style={{
          width: "100%",
          height,
          objectFit: "cover",
          objectPosition,
          display: "block",
          filter: hov
            ? "grayscale(0%) contrast(1.02) brightness(1.0)"
            : "grayscale(100%) contrast(1.08) brightness(0.88)",
          transition: "filter 0.9s cubic-bezier(0.25,0.1,0.25,1)",
        }}
      />
      {/* film grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          opacity: 0.45,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
    </div>
  );
  if (link) return <a href={link} style={{ display: "block", textDecoration: "none" }}>{inner}</a>;
  return inner;
}

// ─── Speech bubble ────────────────────────────────────────────────────────────

function Bubble({ text, bg, rotate = 0 }: { text: string; bg: string; rotate?: number }) {
  return (
    <div style={{
      background: bg,
      color: "#fff",
      padding: "9px 14px",
      fontSize: "8px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      lineHeight: 1.7,
      display: "inline-block",
      transform: `rotate(${rotate}deg)`,
      fontFamily: "Arial, sans-serif",
    }}>
      {text.split("/").map((line, i) => (
        <span key={i} style={{ display: "block" }}>{line.trim()}</span>
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const cream = "#EDEAE2";
  const ink   = "#0d0d0d";
  const muted = "rgba(13,13,13,0.35)";
  const border = "1px solid rgba(13,13,13,0.07)";

  return (
    <>
      {showIntro && <AsciiIntro onDone={() => setShowIntro(false)} />}

      <div style={{
        background: cream,
        color: ink,
        minHeight: "100dvh",
        fontFamily: "Arial, sans-serif",
        opacity: showIntro ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 36px",
          height: "52px",
          borderBottom: border,
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: cream,
        }}>
          <a href="/" style={{
            color: ink,
            textDecoration: "none",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'Bodoni Moda', serif",
            fontWeight: 600,
          }}>
            Estelle Sweeney
          </a>
          <nav style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {menuLinks.map(({ label, link }, i) => (
              <a key={label} href={link} style={{
                color: i === 0 ? ink : muted,
                textDecoration: "none",
                fontSize: "8px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "4px 11px",
                border: i === 0 ? `1px solid ${ink}` : "1px solid transparent",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = ink; e.currentTarget.style.borderColor = ink; }}
                onMouseLeave={e => { e.currentTarget.style.color = i === 0 ? ink : muted; e.currentTarget.style.borderColor = i === 0 ? ink : "transparent"; }}
              >{label}</a>
            ))}
            <button
              onClick={() => setMenuOpen(true)}
              style={{ background: "none", border: "none", color: muted, fontSize: "20px", cursor: "pointer", padding: "4px 8px", lineHeight: 1, marginLeft: "4px" }}
              onMouseEnter={e => (e.currentTarget.style.color = ink)}
              onMouseLeave={e => (e.currentTarget.style.color = muted)}
            >+</button>
          </nav>
        </header>

        {/* ── MENU OVERLAY ────────────────────────────────────────────────── */}
        {menuOpen && (
          <div style={{ position: "fixed", inset: 0, background: cream, zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "clamp(12px,2.2vh,24px)" }}>
            <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "18px", right: "36px", background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: muted }}>×</button>
            {menuLinks.map(({ label, link }) => (
              <a key={label} href={link} style={{ color: ink, textDecoration: "none", fontSize: "clamp(28px,5vw,58px)", fontFamily: "'Bodoni Moda', serif", letterSpacing: "0.04em", transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.2")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >{label}</a>
            ))}
          </div>
        )}

        {/* ── 3-COLUMN GRID ───────────────────────────────────────────────── */}
        <main style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 0.85fr", borderBottom: border }} className="home-grid">

          {/* ════ LEFT COL ════ */}
          <div style={{ borderRight: border, display: "flex", flexDirection: "column" }}>

            {/* Label row */}
            <div style={{ padding: "20px 28px 16px", borderBottom: border, display: "flex", alignItems: "center", gap: "10px" }}>
              <Star color="rgba(180,180,185,0.7)" size={12} rotate={-12} />
              <span style={{ fontSize: "8px", letterSpacing: "0.26em", textTransform: "uppercase", color: muted }}>Projects</span>
            </div>

            {/* Big name */}
            <div style={{ padding: "28px 28px 0", flex: 1 }}>
              <div style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: "clamp(50px, 7vw, 108px)",
                lineHeight: 0.88,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: ink,
                marginBottom: "28px",
              }}>
                ESTELLE<br />SWEENEY
              </div>

              <div style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: muted, lineHeight: 2, marginBottom: "20px" }}>
                <span style={{ color: "#E8251A" }}>Analog Works</span>
                {" + "}
                <span style={{ color: "#1A3FCC" }}>Runway</span>
                <br />Since 2019
              </div>

              {/* Icon row separator */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "20px" }}>
                <Star color="#E8251A"  size={12} rotate={0}   float />
                <Star color="#F5C800"  size={12} rotate={20}  float />
                <Star color="#6BB8E8"  size={12} rotate={-10} float />
              </div>

              <a href="/runway" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                color: ink, textDecoration: "underline",
                fontSize: "8px", letterSpacing: "0.24em", textTransform: "uppercase",
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.4")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >View Projects →</a>
            </div>

            {/* Spacer + speech bubble */}
            <div style={{ padding: "28px 28px 20px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <Star color="#E8251A" size={14} rotate={8} float />
              <Bubble text="WVB · KIDSUPER · BBC / NYC + PARIS 2025–26" bg="#E8251A" rotate={-1} />
            </div>

            {/* Bottom: two photos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: border }}>
              <div style={{ borderRight: border }}>
                <GrainImg src="/slides/home/03.jpg" height="clamp(130px,16vw,220px)" objectPosition="center 10%" link="/runway" />
              </div>
              <div>
                <GrainImg src="/slides/home/07.jpg" height="clamp(130px,16vw,220px)" objectPosition="center 10%" link="/backstage" />
              </div>
            </div>
          </div>

          {/* ════ CENTER COL ════ */}
          <div style={{ borderRight: border, display: "flex", flexDirection: "column" }}>

            {/* Label row */}
            <div style={{ padding: "20px 28px 16px", borderBottom: border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Star color="#F5B8C4" size={10} rotate={5} />
                <Star color="#8EE000" size={10} rotate={-8} />
                <span style={{ fontSize: "8px", letterSpacing: "0.26em", textTransform: "uppercase", color: muted }}>Featured</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Star color="#1A3FCC" size={9} rotate={15} />
                <span style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: muted }}>2025–26</span>
              </div>
            </div>

            {/* Two large staggered photos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              <div style={{ borderRight: border }}>
                <GrainImg src="/slides/home/01.jpg" height="clamp(280px,38vw,520px)" objectPosition="center 10%" link="/runway" />
              </div>
              <div style={{ paddingTop: "clamp(40px,10%,80px)" }}>
                <GrainImg src="/slides/home/11.jpg" height="clamp(280px,38vw,520px)" objectPosition="center 10%" link="/runway" />
              </div>
            </div>

            {/* Caption */}
            <div style={{ padding: "14px 28px", borderTop: border, borderBottom: border }}>
              <span style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: muted }}>
                Runway · Backstage · Editorial
              </span>
            </div>

            {/* Bottom 3 photos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: "auto" }}>
              {[
                { src: "/slides/home/04.jpg", link: "/runway" },
                { src: "/slides/home/13.jpg", link: "/graphic-design" },
                { src: "/slides/home/16.jpg", link: "/backstage" },
              ].map((item, i) => (
                <div key={i} style={{ borderRight: i < 2 ? border : "none", borderTop: border }}>
                  <GrainImg src={item.src} height="clamp(100px,13vw,175px)" objectPosition="center 10%" link={item.link} />
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT COL ════ */}
          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* Label row */}
            <div style={{ padding: "20px 28px 16px", borderBottom: border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "8px", letterSpacing: "0.26em", textTransform: "uppercase", color: muted }}>Gallery</span>
              <div style={{ display: "flex", gap: "8px" }}>
                {["Grid", "List"].map((t, i) => (
                  <span key={t} style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: i === 0 ? ink : muted, cursor: "pointer" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* 2×2 grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {[
                { src: "/slides/home/02.jpg",        link: "/runway" },
                { src: "/art/bbc-illustrations.jpg", link: "/graphic-design" },
                { src: "/slides/home/05.jpg",        link: "/campaigns" },
                { src: "/art/kidsuper/cover.jpg",    link: "/graphic-design" },
              ].map((item, i) => (
                <div key={i} style={{
                  borderRight: i % 2 === 0 ? border : "none",
                  borderBottom: i < 2 ? border : "none",
                }}>
                  <GrainImg src={item.src} height="clamp(110px,14vw,185px)" objectPosition="center 10%" link={item.link} />
                </div>
              ))}
            </div>

            {/* Speech bubble + star */}
            <div style={{ padding: "18px 28px 0", display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <Star color="#6BB8E8" size={13} rotate={-15} float />
              <Bubble text="Analog · Film / Archive" bg="#1A3FCC" rotate={1.5} />
            </div>

            {/* Services */}
            <div style={{ padding: "20px 28px 0", borderTop: border, marginTop: "20px" }}>
              <div style={{ fontSize: "8px", letterSpacing: "0.26em", textTransform: "uppercase", color: muted, marginBottom: "12px" }}>Services</div>
              {services.map(({ label, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 0", borderBottom: border }}>
                  <Star color={color} size={8} rotate={Math.random() * 30 - 15} />
                  <span style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: ink, lineHeight: 1 }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Bottom photo + contact */}
            <div style={{ marginTop: "auto" }}>
              <div style={{ borderTop: border, marginTop: "20px" }}>
                <GrainImg src="/slides/home/14.jpg" height="clamp(140px,18vw,240px)" objectPosition="center 10%" link="/runway" />
              </div>
              <div style={{ padding: "16px 28px", borderTop: border }}>
                <div style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: muted, marginBottom: "6px" }}>Project inquiries</div>
                <a href="mailto:info@estellesweeney.com" style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: ink, textDecoration: "underline" }}>
                  Let's Create Together →
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", borderTop: border }}>
          {footerNav.map(({ icon, top, bot, link }, i) => (
            <>
              <a key={i} href={link} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "18px 20px",
                borderRight: i < 4 ? border : "none",
                textDecoration: "none", color: ink,
                transition: "background 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(13,13,13,0.04)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontSize: "16px", opacity: 0.4, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.5 }}>{top}</div>
                  <div style={{ fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase", color: muted, lineHeight: 1.5 }}>{bot}</div>
                </div>
              </a>
              {i < 4 && (
                <div key={`sep-${i}`} style={{ display: "none" }} />
              )}
            </>
          ))}
        </footer>

        {/* © */}
        <div style={{ padding: "12px 36px", borderTop: border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: muted }}>
            Estelle Sweeney © 2025 All Rights Reserved
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Star color="rgba(13,13,13,0.3)" size={10} rotate={0} float />
            <a href="https://www.instagram.com/estellesweeney_" target="_blank" rel="noopener noreferrer"
              style={{ color: muted, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.35")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
