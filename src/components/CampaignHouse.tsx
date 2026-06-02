"use client";
import { useState } from "react";
import type { CampaignProject } from "@/data/campaigns";

// ─── Scanline overlay ───────────────────────────────────────────────────────
const Scanlines = () => (
  <div
    className="absolute inset-0 pointer-events-none z-10"
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)",
    }}
  />
);

// ─── Vintage speaker grill – spans full body height ─────────────────────────
function Speaker({ borderSide }: { borderSide: "left" | "right" }) {
  const style =
    borderSide === "right"
      ? { borderRight: "2px solid #2c2c2c" }
      : { borderLeft: "2px solid #2c2c2c" };

  return (
    <div
      className="hidden md:block w-24 flex-shrink-0 relative bg-[#0b0b0b] overflow-hidden"
      style={style}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 96 540"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0"
      >
        {/* Grill dot pattern */}
        {Array.from({ length: 40 }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => (
            <circle
              key={`d-${r}-${c}`}
              cx={c * 17 + 14}
              cy={r * 13 + 10}
              r={3}
              fill="#1d1d1d"
            />
          ))
        ).flat()}

        {/* Speaker cone — concentric rings */}
        {[44, 33, 22, 13, 6].map((r, i) => (
          <circle
            key={`ring-${i}`}
            cx={48}
            cy={270}
            r={r}
            fill="none"
            stroke={i === 0 ? "#2e2e2e" : "#222"}
            strokeWidth={i === 0 ? 2 : 1.5}
          />
        ))}
        {/* Center dust cap */}
        <circle cx={48} cy={270} r={6} fill="#171717" stroke="#2b2b2b" strokeWidth={1} />

        {/* Corner screws */}
        {[
          [10, 12],
          [86, 12],
          [10, 528],
          [86, 528],
        ].map(([x, y], i) => (
          <g key={`screw-${i}`}>
            <circle cx={x} cy={y} r={5} fill="#111" stroke="#242424" strokeWidth={1} />
            <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke="#2b2b2b" strokeWidth={0.8} />
            <line x1={x} y1={y - 3} x2={x} y2={y + 3} stroke="#2b2b2b" strokeWidth={0.8} />
          </g>
        ))}

        {/* Brand stamp */}
        <text
          x={48}
          y={512}
          textAnchor="middle"
          fontSize={7}
          fill="#232323"
          fontFamily="monospace"
          letterSpacing={3}
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
  className?: string;
  style?: React.CSSProperties;
}

function ProjectTile({ project, featured = false, className = "", style }: TileProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/campaigns/${project.slug}`}
      className={`relative overflow-hidden block group ${className}`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient placeholder (shows when cover not yet uploaded) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#141414] to-[#0a0a0a] flex items-center justify-center z-0">
        <span
          className="font-display uppercase tracking-[0.3em] text-white/10"
          style={{ fontSize: featured ? 22 : 13 }}
        >
          {project.short}
        </span>
      </div>

      {/* Cover image – sits above placeholder, hides it when loaded */}
      <img
        src={project.cover}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover z-[5] transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ display: "block" }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Scanlines */}
      <Scanlines />

      {/* Orange Dreamcast radial glow on hover */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,106,26,0.2) 0%, transparent 68%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent z-20 pointer-events-none" />

      {/* ↗ Arrow button */}
      <div
        className={`absolute bottom-3 left-3 z-30 w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-300 ${
          hovered
            ? "bg-[#FF6A1A] border-[#FF6A1A] text-black scale-110"
            : "bg-black/50 border-white/30 text-white"
        }`}
      >
        ↗
      </div>

      {/* Project label (fades in on hover) */}
      <span
        className={`absolute bottom-3.5 left-14 z-30 font-display uppercase tracking-[0.18em] text-white/85 transition-all duration-300 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
        }`}
        style={{ fontSize: 10 }}
      >
        {featured ? project.name : project.short}
      </span>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6A1A] z-30 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      />
    </a>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
interface Props {
  projects: CampaignProject[];
}

const BORDER = "2px solid #2c2c2c";

export default function CampaignHouse({ projects }: Props) {
  const bbc = projects.find((p) => p.slug === "bbc")!;
  const subs = projects.filter((p) => p.slug !== "bbc"); // 4 brand tiles

  return (
    <div className="w-full max-w-[900px] mx-auto">

      {/* ─── ROOF ──────────────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 900 132"
        className="w-full block"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Roof fill */}
        <polygon points="1,131 450,3 899,131" fill="#0c0c0c" />

        {/* Slanted sides (forms the top border of the house) */}
        <polyline
          points="1,131 450,3 899,131"
          fill="none"
          stroke="#2c2c2c"
          strokeWidth={2}
        />

        {/* Shingle / rafter lines */}
        {[28, 55, 82, 108].map((y) => {
          const xL = (y / 131) * 449 + 1;
          const xR = 899 - ((y / 131) * 449);
          return (
            <line
              key={y}
              x1={xL}
              y1={y}
              x2={xR}
              y2={y}
              stroke="#181818"
              strokeWidth={1}
            />
          );
        })}

        {/* Ridge cap at peak */}
        <rect x={422} y={1} width={56} height={16} rx={1} fill="#0a0a0a" stroke="#2c2c2c" strokeWidth={1.5} />

        {/* Decorative antenna / aerial */}
        <line x1={450} y1={1} x2={450} y2={-16} stroke="#2c2c2c" strokeWidth={1.5} />
        <line x1={435} y1={-12} x2={465} y2={-12} stroke="#2c2c2c" strokeWidth={1.5} />
        <line x1={440} y1={-8} x2={460} y2={-8} stroke="#2c2c2c" strokeWidth={1} />
      </svg>

      {/* ─── HOUSE BODY ────────────────────────────────────────────────── */}
      <div
        className="flex"
        style={{
          borderLeft: BORDER,
          borderRight: BORDER,
          borderBottom: BORDER,
          background: "#080808",
        }}
      >
        {/* Left speaker (hidden on mobile) */}
        <Speaker borderSide="right" />

        {/* ─── Inner content ── */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* BBC — featured main window */}
          <ProjectTile
            project={bbc}
            featured
            style={{ height: 300, borderBottom: BORDER, flexShrink: 0 }}
          />

          {/* 2 × 2 sub-brand grid */}
          <div className="grid grid-cols-2" style={{ height: 220 }}>
            {subs.map((p, i) => (
              <ProjectTile
                key={p.slug}
                project={p}
                style={{
                  borderRight: i % 2 === 0 ? BORDER : undefined,
                  borderBottom: i < 2 ? BORDER : undefined,
                }}
              />
            ))}
          </div>
        </div>

        {/* Right speaker (hidden on mobile) */}
        <Speaker borderSide="left" />
      </div>

      {/* ─── Footer label bar ──────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-2.5"
        style={{
          borderLeft: BORDER,
          borderRight: BORDER,
          borderBottom: BORDER,
          borderTop: BORDER,
          background: "#060606",
        }}
      >
        <span
          className="font-display uppercase text-white/20 tracking-[0.28em]"
          style={{ fontSize: 9 }}
        >
          Campaign Archive
        </span>
        <span
          className="font-display uppercase text-[#FF6A1A]/50 tracking-[0.22em]"
          style={{ fontSize: 9 }}
        >
          REPLAY ◉
        </span>
      </div>
    </div>
  );
}
