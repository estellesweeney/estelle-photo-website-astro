"use client";
import { useState } from "react";
import type { CampaignProject } from "@/data/campaigns";

// ─── Scanlines ───────────────────────────────────────────────────────────────
const Scanlines = () => (
  <div
    className="absolute inset-0 pointer-events-none z-10"
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.09) 3px, rgba(0,0,0,0.09) 4px)",
    }}
  />
);

// ─── Speaker panel ───────────────────────────────────────────────────────────
function Speaker({ side, featured }: { side: "left" | "right"; featured?: boolean }) {
  const id = `cloth-${side}-${featured ? "f" : "s"}`;
  const border =
    side === "left"
      ? { borderRight: "2px solid #2c2c2c" }
      : { borderLeft: "2px solid #2c2c2c" };

  return (
    <div
      className="hidden md:block relative bg-[#090909] overflow-hidden flex-shrink-0"
      style={{ width: 110, ...border }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 110 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0"
      >
        <defs>
          {/* Woven speaker cloth */}
          <pattern id={id} x="0" y="0" width="9" height="9" patternUnits="userSpaceOnUse">
            <rect width="9" height="9" fill="#0c0c0c" />
            <circle cx="4.5" cy="4.5" r="1.8" fill="#191919" />
          </pattern>
        </defs>

        {/* Cloth background */}
        <rect width="110" height="300" fill={`url(#${id})`} />

        {/* Outer surround */}
        <circle cx="55" cy="148" r="46" fill="none" stroke="#252525" strokeWidth="2.5" />
        {/* Suspension rings */}
        <circle cx="55" cy="148" r="38" fill="none" stroke="#1f1f1f" strokeWidth="1.5" />
        <circle cx="55" cy="148" r="29" fill="none" stroke="#1c1c1c" strokeWidth="1.5" />
        <circle cx="55" cy="148" r="20" fill="none" stroke="#1b1b1b" strokeWidth="1.5" />
        <circle cx="55" cy="148" r="12" fill="none" stroke="#1c1c1c" strokeWidth="1.5" />
        {/* Dust cap */}
        <circle cx="55" cy="148" r="6" fill="#161616" stroke="#242424" strokeWidth="1" />

        {/* Mounting screws */}
        {[[14, 14], [96, 14], [14, 286], [96, 286]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={5.5} fill="#111" stroke="#222" strokeWidth="1" />
            <line x1={x - 3.5} y1={y} x2={x + 3.5} y2={y} stroke="#2a2a2a" strokeWidth="0.9" />
            <line x1={x} y1={y - 3.5} x2={x} y2={y + 3.5} stroke="#2a2a2a" strokeWidth="0.9" />
          </g>
        ))}

        {/* Orange Dreamcast LED indicator */}
        <circle cx="55" cy="272" r="4" fill="#FF6A1A" opacity="0.7" />
        <circle cx="55" cy="272" r="6" fill="none" stroke="#FF6A1A" strokeWidth="0.8" opacity="0.25" />

        {/* Brand stamp */}
        <text x="55" y="290" textAnchor="middle" fontSize="6" fill="#1f1f1f" fontFamily="monospace" letterSpacing="3">
          ESTELLE
        </text>
      </svg>
    </div>
  );
}

// ─── Portrait tile (4:5) ─────────────────────────────────────────────────────
interface TileProps {
  project: CampaignProject;
  featured?: boolean;
  borderLeft?: boolean;
}

function ProjectTile({ project, featured = false, borderLeft = false }: TileProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/campaigns/${project.slug}`}
      className="relative block group flex-1 overflow-hidden"
      style={{
        aspectRatio: "4 / 5",
        borderLeft: borderLeft ? "1px solid #2c2c2c" : undefined,
        minWidth: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Placeholder bg */}
      <div className="absolute inset-0 bg-[#0e0e0e] flex items-center justify-center z-0">
        <span
          className="font-display uppercase tracking-[0.35em] text-white/8"
          style={{ fontSize: featured ? 14 : 11, writingMode: "vertical-lr", letterSpacing: "0.3em" }}
        >
          {project.short}
        </span>
      </div>

      {/* Cover photo */}
      <img
        src={project.cover}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover z-[5] transition-transform duration-700 group-hover:scale-[1.06]"
        style={{ display: "block" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />

      <Scanlines />

      {/* Dim overlay — lifts on hover */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-400"
        style={{ background: "rgba(0,0,0,0.25)", opacity: hovered ? 0 : 1 }}
      />

      {/* Centered ↗ button */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <div
          className="rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            width: 40,
            height: 40,
            borderColor: hovered ? "#fff" : "rgba(255,255,255,0.4)",
            background: hovered ? "rgba(255,255,255,1)" : "rgba(0,0,0,0.35)",
            color: hovered ? "#000" : "#fff",
            transform: hovered ? "scale(1.15)" : "scale(1)",
            fontSize: 13,
          }}
        >
          ↗
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-2.5 pb-2">
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        <span
          className="relative font-display uppercase tracking-[0.18em] transition-opacity duration-300 block"
          style={{ fontSize: 8, color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.38)" }}
        >
          {project.short}
        </span>
        {featured && (
          <span
            className="relative font-display uppercase tracking-[0.1em] block"
            style={{ fontSize: 7, color: "rgba(255,106,26,0.6)", marginTop: 1 }}
          >
            Main Window
          </span>
        )}
      </div>

      {/* Bottom accent on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-30 transition-opacity duration-300"
        style={{ background: "#FF6A1A", opacity: hovered ? 1 : 0 }}
      />

      {/* Featured: top accent bar */}
      {featured && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-30 transition-opacity duration-300"
          style={{ background: "#FF6A1A", opacity: hovered ? 1 : 0.4 }}
        />
      )}
    </a>
  );
}

// ─── House ───────────────────────────────────────────────────────────────────
interface Props {
  projects: CampaignProject[];
}

const B  = "2px solid #2c2c2c";
const B1 = "1px solid #2c2c2c";

export default function CampaignHouse({ projects }: Props) {
  const bbc  = projects.find((p) => p.slug === "bbc")!;
  const ks   = projects.find((p) => p.slug === "kidsuper")!;
  const bape = projects.find((p) => p.slug === "bape")!;
  const puma = projects.find((p) => p.slug === "puma")!;
  const sci  = projects.find((p) => p.slug === "science-project")!;

  return (
    <div className="w-full max-w-[1040px] mx-auto">

      {/* ─── ROOF ────────────────────────────────────────────────────── */}
      <div style={{ paddingTop: 20 }}>
        <svg
          viewBox="0 0 1040 115"
          className="w-full block"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ overflow: "visible" }}
        >
          <polygon points="2,113 520,4 1038,113" fill="#0d0d0d" />
          <polyline points="2,113 520,4 1038,113" fill="none" stroke="#2c2c2c" strokeWidth="2" />

          {/* Rafter lines */}
          {[28, 56, 82, 106].map((y) => {
            const xL = (y / 113) * 518 + 2;
            const xR = 1038 - ((y / 113) * 518);
            return <line key={y} x1={xL} y1={y} x2={xR} y2={y} stroke="#191919" strokeWidth="1" />;
          })}

          {/* Ridge cap */}
          <rect x={492} y={2} width={56} height={15} rx={1.5} fill="#0a0a0a" stroke="#2c2c2c" strokeWidth="1.5" />

          {/* Antenna */}
          <line x1="520" y1="2" x2="520" y2="-20" stroke="#2c2c2c" strokeWidth="1.5" />
          <line x1="503" y1="-17" x2="537" y2="-17" stroke="#2c2c2c" strokeWidth="1.5" />
          <line x1="509" y1="-10" x2="531" y2="-10" stroke="#2c2c2c" strokeWidth="1" />
          <circle cx="520" cy="-20" r="2.5" fill="#2c2c2c" />
        </svg>
      </div>

      {/* ─── BODY ────────────────────────────────────────────────────── */}
      <div
        style={{
          borderLeft: B,
          borderRight: B,
          borderBottom: B,
          background: "#080808",
        }}
      >

        {/* ── Top label bar ── */}
        <div
          className="flex items-center justify-between px-5 py-2"
          style={{ borderBottom: B1, background: "#060606" }}
        >
          <span className="font-display uppercase tracking-[0.3em] text-white/25" style={{ fontSize: 8 }}>
            Select a project to replay
          </span>
          <span className="font-display uppercase tracking-[0.25em] text-[#FF6A1A]/50" style={{ fontSize: 8 }}>
            ◉ LIVE
          </span>
        </div>

        {/* ── Tile strip with speakers ── */}
        <div
          className="flex items-stretch"
          style={{ padding: "28px 0" }}
        >
          {/* Left speaker */}
          <Speaker side="left" />

          {/* 5 portrait tiles */}
          <div className="flex flex-1 min-w-0">
            <ProjectTile project={bbc}  featured />
            <ProjectTile project={ks}   borderLeft />
            <ProjectTile project={bape} borderLeft />
            <ProjectTile project={puma} borderLeft />
            <ProjectTile project={sci}  borderLeft />
          </div>

          {/* Right speaker */}
          <Speaker side="right" />
        </div>

        {/* ── Bottom speaker strip (second pair, smaller) ── */}
        <div
          className="hidden md:flex items-stretch"
          style={{ borderTop: B1, height: 64 }}
        >
          {/* Small left sub-speaker */}
          <div className="flex-1 relative bg-[#070707] overflow-hidden" style={{ borderRight: B1 }}>
            <svg width="100%" height="100%" viewBox="0 0 400 64" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
              <defs>
                <pattern id="cloth-sub-l" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#0b0b0b" />
                  <circle cx="4" cy="4" r="1.5" fill="#171717" />
                </pattern>
              </defs>
              <rect width="400" height="64" fill="url(#cloth-sub-l)" />
              {/* Horizontal row of mini speaker cones */}
              {[50, 150, 250, 350].map((cx, i) => (
                <g key={i}>
                  <circle cx={cx} cy={32} r={22} fill="none" stroke="#1f1f1f" strokeWidth="1.5" />
                  <circle cx={cx} cy={32} r={15} fill="none" stroke="#1b1b1b" strokeWidth="1.2" />
                  <circle cx={cx} cy={32} r={8}  fill="none" stroke="#1a1a1a" strokeWidth="1.2" />
                  <circle cx={cx} cy={32} r={3}  fill="#161616" />
                </g>
              ))}
              {/* Orange accent LEDs */}
              {[28, 128, 228, 328].map((x, i) => (
                <circle key={i} cx={x} cy={56} r={2.5} fill="#FF6A1A" opacity="0.5" />
              ))}
            </svg>
          </div>
          {/* Center label */}
          <div
            className="flex-shrink-0 flex items-center justify-center bg-[#060606]"
            style={{ width: 200, borderLeft: B1, borderRight: B1 }}
          >
            <span className="font-display uppercase tracking-[0.3em] text-white/15" style={{ fontSize: 7 }}>
              Campaign Archive
            </span>
          </div>
          {/* Small right sub-speaker */}
          <div className="flex-1 relative bg-[#070707] overflow-hidden" style={{ borderLeft: B1 }}>
            <svg width="100%" height="100%" viewBox="0 0 400 64" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
              <defs>
                <pattern id="cloth-sub-r" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#0b0b0b" />
                  <circle cx="4" cy="4" r="1.5" fill="#171717" />
                </pattern>
              </defs>
              <rect width="400" height="64" fill="url(#cloth-sub-r)" />
              {[50, 150, 250, 350].map((cx, i) => (
                <g key={i}>
                  <circle cx={cx} cy={32} r={22} fill="none" stroke="#1f1f1f" strokeWidth="1.5" />
                  <circle cx={cx} cy={32} r={15} fill="none" stroke="#1b1b1b" strokeWidth="1.2" />
                  <circle cx={cx} cy={32} r={8}  fill="none" stroke="#1a1a1a" strokeWidth="1.2" />
                  <circle cx={cx} cy={32} r={3}  fill="#161616" />
                </g>
              ))}
              {[72, 172, 272, 372].map((x, i) => (
                <circle key={i} cx={x} cy={56} r={2.5} fill="#FF6A1A" opacity="0.5" />
              ))}
            </svg>
          </div>
        </div>

      </div>

      {/* ─── Footer ──────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderLeft: B, borderRight: B, borderBottom: B, borderTop: B, background: "#050505" }}
      >
        <div className="flex items-center gap-2.5">
          {/* Power LED */}
          <div className="w-2 h-2 rounded-full bg-[#FF6A1A]" style={{ boxShadow: "0 0 6px #FF6A1A" }} />
          <span className="font-display uppercase tracking-[0.28em] text-white/20" style={{ fontSize: 8 }}>
            Campaign Archive
          </span>
        </div>
        <span className="font-display uppercase tracking-[0.22em] text-[#FF6A1A]/40" style={{ fontSize: 8 }}>
          REPLAY ◉
        </span>
      </div>

    </div>
  );
}
