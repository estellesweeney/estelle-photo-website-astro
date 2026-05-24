import { useState } from "react";
import HeroSlideshow from "@/components/HeroSlideshow";
import AsciiIntro from "@/components/AsciiIntro";

const iconNav = [
  { id: "12", label: "Runway",        link: "/runway",          color: "#E63946" },
  { id: "22", label: "Campaigns",     link: "/campaigns",       color: "#F5A623" },
  { id: "17", label: "Backstage",     link: "/backstage",       color: "#1D4ED8" },
  { id: "31", label: "Graphic Design",link: "/graphic-design",  color: "#10B981" },
  { id: "16", label: "About",         link: "/about",           color: "#8B5CF6" },
];

export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <AsciiIntro onDone={() => setShowIntro(false)} />}
    <div style={{ background: "white", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

      {/* Nav */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 32px",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}>
        <span style={{
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "var(--font-display, serif)",
          color: "black",
        }}>
          Estelle Sweeney
        </span>
        <a
          href="mailto:estellescreative@gmail.com"
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "var(--font-display, serif)",
            color: "rgba(0,0,0,0.4)",
            textDecoration: "none",
          }}
        >
          Contact
        </a>
      </nav>

      {/* Floating icons */}
      <section style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: "clamp(24px, 5vw, 60px)",
        padding: "clamp(48px, 8vw, 100px) clamp(24px, 5vw, 60px) clamp(48px, 8vw, 80px)",
      }}>
        {iconNav.map(({ id, label, link, color }) => (
          <a
            key={id}
            href={link}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            {/* Icon — CSS mask for colorized silhouette, no box */}
            <div
              style={{
                width: "clamp(70px, 12vw, 140px)",
                height: "clamp(70px, 12vw, 140px)",
                backgroundColor: color,
                WebkitMaskImage: `url(/icons/icon_${id}.svg)`,
                maskImage: `url(/icons/icon_${id}.svg)`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
            {/* Label */}
            <span style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.5)",
              fontFamily: "Arial, sans-serif",
            }}>
              {label}
            </span>
          </a>
        ))}
      </section>

      {/* Slideshow — full bleed dark section below */}
      <section style={{ background: "black" }}>
        <HeroSlideshow />
      </section>

      {/* Recent Work */}
      <section style={{ background: "black" }} id="work">
        <h2 style={{
          fontSize: "11px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontFamily: "var(--font-display, serif)",
          color: "rgba(245,240,232,0.6)",
          padding: "32px 24px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          margin: 0,
        }}>
          Recent Work
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <a href="/gallery/billionaire-boys-club" style={{ display: "flex", flexDirection: "column", textDecoration: "none" }} className="group">
            <div style={{ overflow: "hidden", width: "100%" }}>
              <img
                src="/slides/bbc-hero.jpg"
                alt="Billionaire Boys Club"
                style={{ width: "100%", display: "block", objectFit: "cover", transition: "opacity 0.7s" }}
                className="group-hover:opacity-80"
              />
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-display, serif)", color: "rgba(245,240,232,0.9)", fontWeight: 600 }}>Billionaire Boys Club</span>
              <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Spring 2</span>
            </div>
          </a>

          <a href="/gallery/walter-van-bierendonck" style={{ display: "flex", flexDirection: "column", textDecoration: "none" }} className="group">
            <div style={{ overflow: "hidden", width: "100%" }}>
              <img
                src="/slides/wvb/01.jpg"
                alt="Walter Van Bierendonck"
                style={{ width: "100%", display: "block", objectFit: "cover", transition: "opacity 0.7s" }}
                className="group-hover:opacity-80"
              />
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-display, serif)", color: "rgba(245,240,232,0.9)", fontWeight: 600 }}>Walter Van Bierendonck</span>
              <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Runway</span>
            </div>
          </a>
        </div>
      </section>

      {/* Contact */}
      <section style={{
        background: "black",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "var(--font-display, serif)", color: "rgba(255,255,255,0.3)" }}>Available for</span>
          <span style={{ fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.8)" }}>Runway · Backstage · Editorial · Campaign</span>
        </div>
        <a
          href="mailto:estellescreative@gmail.com"
          style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-display, serif)", color: "rgba(245,240,232,0.7)", textDecoration: "underline", textUnderlineOffset: "4px" }}
        >
          estellescreative@gmail.com
        </a>
      </section>

    </div>
    </>
  );
}
