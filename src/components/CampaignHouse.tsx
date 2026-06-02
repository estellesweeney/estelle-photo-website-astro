"use client";
import { useState } from "react";
import type { CampaignProject } from "@/data/campaigns";

// ─── Scanline CRT overlay ────────────────────────────────────────────────────
const Scanlines = () => (
  <div
    className="absolute inset-0 pointer-events-none z-10"
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
    }}
  />
);

// ─── Speaker panel ───────────────────────────────────────────────────────────
// Flexible height — fills whatever row height it's placed in.
function Speaker({ side }: { side: "left" | "right" }) {
  const border = side === "left"
    ? { borderRight: "2px solid #2c2c2c" }
    : { borderLeft: "2px solid #2c2c2c" };

  return (
    <div
      className="hidden md:flex w-[100px] flex-shrink-0 relative bg-[#0a0a0a] overflow-hidden"
      style={border}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 320"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0"
      >
        <defs>
          {/* Woven speaker-cloth pattern */}
          <pattern id={`cloth-${side}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#0c0c0c" />
            <circle cx="4" cy="4" r="1.6" fill="#181818" />
          </pattern>
        </defs>

        {/* Cloth fill */}
        <rect width="100" height="320" fill={`url(#cloth-${side})`} />

        {/* Speaker cone — outer surround ring */}
        <circle cx="50" cy="160" r="42" fill="none" stroke="#232323" strokeWidth="2.5" />
        {/* Spider / suspension rings */}
        <circle cx="50" cy="160" r="34" fill="none" stroke="#1f1f1f" strokeWidth="1.5" />
        <circle cx="50" cy="160" r="25" fill="none" stroke="#1e1e1e" strokeWidth="1.5" />
        <circle cx="50" cy="160" r="17" fill="none" stroke="#1d1d1d" strokeWidth="1.5" />
        <circle cx="50" cy="160" r="10" fill="none" stroke="#1e1e1e" strokeWidth="1.5" />
        {/* Dust cap */}
        <circle cx="50" cy="160" r="5" fill="#171717" stroke="#252525" strokeWidth="1" />

        {/* Corner mounting screws */}
        {[[12, 14], [88, 14], [12, 306], [88, 306]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={5} fill="#111" stroke="#222" strokeWidth="1" />
            <line x1={x - 3.2} y1={y} x2={x + 3.2} y2={y} stroke="#2a2a2a" strokeWidth="0.9" />
            <line x1={x} y1={y - 3.2} x2={x} y2={y + 3.2} stroke="#2a2a2a" strokeWidth="0.9" />
          </g>
        ))}

        {/* Vertical brand stamp */}
        <text
          x="50"
          y="295"
          textAnchor="middle"
          fontSize="6"
          fill="#202020"
          fontFamily="monospace"
          letterSpacing="3"
        >
          ESTELLE
        </text>
      </svg>
    </div>
  );
}

// ─── Project tile ────────────────────────────────────────────────────────────
interface TileProps {
  project: CampaignProject;
  featured?: boolean;
  style?: React.CSSProperties;
}

function ProjectTile({ project, featured = false, style }: TileProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/campaigns/${project.slug}`}
      className="relative overflow-hidden block group flex-1"
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Placeholder bg shown when no cover */}
      <div className="absolute inset-0 bg-[#0f0f0f] flex items-center justify-center z-0">
        <span
          className="font-display uppercase tracking-[0.35em] text-white/8"
          style={{ fontSize: featured ? 18 : 11 }}
        >
          {project.short}
        </span>
      </div>

      {/* Cover photo */}
      <img
        src={project.cover}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover z-[5] transition-transform duration-700 group-hover:scale-[1.05]"
        style={{ display: "block" }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      <Scanlines />

      {/* Dark overlay — lifts slightly on hover */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-400"
        style={{ background: "rgba(0,0,0,0.22)", opacity: hovered ? 0 : 1 }}
      />

      {/* Centered ↗ circle — always visible */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <div
          className="rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            width: featured ? 56 : 44,
            height: featured ? 56 : 44,
            borderColor: hovered ? "#fff" : "rgba(255,255,255,0.45)",
            background: hovered ? "#fff" : "rgba(0,0,0,0.35)",
            transform: hovered ? "scale(1.12)" : "scale(1)",
            color: hovered ? "#000" : "#fff",
            fontSize: featured ? 18 : 14,
          }}
        >
          ↗
        </div>
      </div>

      {/* Bottom fade + label */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 z-30">
        <span
          className="font-display uppercase tracking-[0.22em] transition-opacity duration-300"
          style={{
            fontSize: 9,
            color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
          }}
        >
          {project.name}
        </span>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-30 transition-opacity duration-300"
        style={{ background: "#FF6A1A", opacity: hovered ? 1 : 0 }}
      />
    </a>
  );
}

// ─── Main house ──────────────────────────────────────────────────────────────
interface Props {
  projects: CampaignProject[];
}

const B = "2px solid #2c2c2c";

export default function CampaignHouse({ projects }: Props) {
  const bbc     = projects.find((p) => p.slug === "bbc")!;
  const ks      = projects.find((p) => p.slug === "kidsuper")!;
  const bape    = projects.find((p) => p.slug === "bape")!;
  const puma    = projects.find((p) => p.slug === "puma")!;
  const sci     = projects.find((p) => p.slug === "science-project")!;

  return (
    <div className="w-full max-w-[920px] mx-auto">

      {/* ─── ROOF ──────────────────────────────────────────────────────── */}
      <div className="relative" style={{ paddingTop: 24 }}>
        <svg
          viewBox="0 0 920 138"
          className="w-full block"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ overflow: "visible" }}
        >
          {/* Roof fill */}
          <polygon points="2,136 460,4 918,136" fill="#0d0d0d" />
          {/* Roof edges */}
          <polyline points="2,136 460,4 918,136" fill="none" stroke="#2c2c2c" strokeWidth="2" />
          {/* Horizontal rafter lines */}
          {[30, 60, 90, 116].map((y) => {
            const xL = (y / 136) * 458 + 2;
            const xR = 918 - ((y / 136) * 458);
            return (
              <line key={y} x1={xL} y1={y} x2={xR} y2={y} stroke="#191919" strokeWidth="1" />
            );
          })}
          {/* Ridge cap */}
          <rect x={432} y={2} width={56} height={16} rx={1.5} fill="#0a0a0a" stroke="#2c2c2c" strokeWidth="1.5" />
          {/* Antenna */}
          <line x1="460" y1="2" x2="460" y2="-20" stroke="#2c2c2c" strokeWidth="1.5" />
          <line x1="443" y1="-16" x2="477" y2="-16" stroke="#2c2c2c" strokeWidth="1.5" />
          <line x1="449" y1="-10" x2="471" y2="-10" stroke="#2c2c2c" strokeWidth="1" />
          <circle cx="460" cy="-20" r="2.5" fill="#2c2c2c" />
        </svg>
      </div>

      {/* ─── HOUSE BODY ────────────────────────────────────────────────── */}
      <div style={{ borderLeft: B, borderRight: B, borderBottom: B, background: "#080808" }}>

        {/* ROW 1 — BBC (main window) + speakers */}
        <div className="flex" style={{ height: 310, borderBottom: B }}>
          <Speaker side="left" />
          <ProjectTile project={bbc} featured style={{ height: 310 }} />
          <Speaker side="right" />
        </div>

        {/* ROW 2 — KidSuper · BAPE · Puma (full width, no speakers) */}
        <div className="flex" style={{ height: 210, borderBottom: B }}>
          <ProjectTile project={ks}   style={{ height: 210, borderRight: B }} />
          <ProjectTile project={bape} style={{ height: 210, borderRight: B }} />
          <ProjectTile project={puma} style={{ height: 210 }} />
        </div>

        {/* ROW 3 — Science Project + speakers */}
        <div className="flex" style={{ height: 210 }}>
          <Speaker side="left" />
          <ProjectTile project={sci} style={{ height: 210 }} />
          <Speaker side="right" />
        </div>

      </div>

      {/* ─── Footer strip ──────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderLeft: B, borderRight: B, borderBottom: B, borderTop: B, background: "#050505" }}
      >
        <span className="font-display uppercase tracking-[0.3em] text-white/18" style={{ fontSize: 8 }}>
          Campaign Archive
        </span>
        <span className="font-display uppercase tracking-[0.25em] text-[#FF6A1A]/40" style={{ fontSize: 8 }}>
          REPLAY ◉
        </span>
      </div>

    </div>
  );
}
