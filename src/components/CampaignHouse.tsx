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

// ─── Speaker column ───────────────────────────────────────────────────────────
function Speaker({ side }: { side: "left" | "right" }) {
  const id = `sp-${side}`;
  const bdr = side === "left" ? { borderRight: "2px solid #2c2c2c" } : { borderLeft: "2px solid #2c2c2c" };
  return (
    <div className="relative bg-[#090909] overflow-hidden flex-shrink-0" style={{ width: 110, ...bdr }}>
      <svg width="100%" height="100%" viewBox="0 0 110 440" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
        <defs>
          <pattern id={id} x="0" y="0" width="9" height="9" patternUnits="userSpaceOnUse">
            <rect width="9" height="9" fill="#0c0c0c" />
            <circle cx="4.5" cy="4.5" r="1.8" fill="#191919" />
          </pattern>
        </defs>
        <rect width="110" height="440" fill={`url(#${id})`} />
        {/* Large speaker cone centred in full height */}
        <circle cx="55" cy="220" r="48" fill="none" stroke="#252525" strokeWidth="2.5" />
        <circle cx="55" cy="220" r="39" fill="none" stroke="#1f1f1f" strokeWidth="1.5" />
        <circle cx="55" cy="220" r="30" fill="none" stroke="#1c1c1c" strokeWidth="1.5" />
        <circle cx="55" cy="220" r="21" fill="none" stroke="#1b1b1b" strokeWidth="1.5" />
        <circle cx="55" cy="220" r="13" fill="none" stroke="#1c1c1c" strokeWidth="1.5" />
        <circle cx="55" cy="220" r="6"  fill="#161616" stroke="#242424" strokeWidth="1" />
        {/* Screws */}
        {[[14,14],[96,14],[14,426],[96,426]].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r={5.5} fill="#111" stroke="#222" strokeWidth="1"/>
            <line x1={x-3.5} y1={y} x2={x+3.5} y2={y} stroke="#2a2a2a" strokeWidth="0.9"/>
            <line x1={x} y1={y-3.5} x2={x} y2={y+3.5} stroke="#2a2a2a" strokeWidth="0.9"/>
          </g>
        ))}
        {/* LED */}
        <circle cx="55" cy="410" r="4" fill="#FF6A1A" opacity="0.7"/>
        <circle cx="55" cy="410" r="6.5" fill="none" stroke="#FF6A1A" strokeWidth="0.8" opacity="0.2"/>
        <text x="55" y="430" textAnchor="middle" fontSize="6" fill="#1e1e1e" fontFamily="monospace" letterSpacing="3">ESTELLE</text>
      </svg>
    </div>
  );
}

// ─── Generic tile (rectangular) ──────────────────────────────────────────────
function Tile({
  project,
  style,
  borderLeft,
}: {
  project: CampaignProject;
  style?: React.CSSProperties;
  borderLeft?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`/campaigns/${project.slug}`}
      className="relative block flex-1 overflow-hidden group"
      style={{ borderLeft: borderLeft ? "1px solid #2c2c2c" : undefined, minWidth: 0, ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 bg-[#0e0e0e] flex items-center justify-center z-0">
        <span className="font-display uppercase tracking-[0.3em] text-white/8" style={{ fontSize: 10 }}>
          {project.short}
        </span>
      </div>
      <img
        src={project.cover}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover z-[5] transition-transform duration-700 group-hover:scale-[1.05]"
        style={{ display: "block" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <Scanlines />
      <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-400"
        style={{ background: "rgba(0,0,0,0.25)", opacity: hovered ? 0 : 1 }} />
      {/* Centered arrow */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <div className="rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            width: 40, height: 40,
            borderColor: hovered ? "#fff" : "rgba(255,255,255,0.38)",
            background: hovered ? "#fff" : "rgba(0,0,0,0.3)",
            color: hovered ? "#000" : "#fff",
            transform: hovered ? "scale(1.12)" : "scale(1)",
            fontSize: 13,
          }}>
          &rarr;
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 z-30">
        <span className="font-display uppercase tracking-[0.2em] block transition-opacity duration-300"
          style={{ fontSize: 8, color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}>
          {project.name}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30 transition-opacity duration-300"
        style={{ background: "#FF6A1A", opacity: hovered ? 1 : 0 }} />
    </a>
  );
}

// ─── Triangular BBC roof tile ─────────────────────────────────────────────────
function RoofTile({ project }: { project: CampaignProject }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`/campaigns/${project.slug}`}
      className="block relative w-full overflow-hidden"
      style={{ height: 180 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image clipped to triangle */}
      <div
        className="absolute inset-0"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
      >
        <div className="absolute inset-0 bg-[#0e0e0e]" />
        <img
          src={project.cover}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ display: "block", objectPosition: "center 30%", transform: hovered ? "scale(1.04)" : "scale(1)" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <Scanlines />
        {/* Dim */}
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.3)", opacity: hovered ? 0.1 : 0.35 }} />
        {/* Orange accent on hover */}
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "radial-gradient(ellipse at 50% 80%, rgba(255,106,26,0.18) 0%, transparent 65%)",
            opacity: hovered ? 1 : 0
          }} />
      </div>

      {/* Triangle border + shingles drawn on top */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1040 180"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Shingle lines */}
        {[45, 90, 135].map((y) => {
          const t = y / 180;
          const xL = t * 520;
          const xR = 1040 - t * 520;
          return <line key={y} x1={xL} y1={y} x2={xR} y2={y} stroke="#1a1a1a" strokeWidth="1.2" />;
        })}
        {/* Outline */}
        <polyline points="520,2 2,178 1038,178" fill="none" stroke="#2c2c2c" strokeWidth="2.5" />
        {/* Ridge cap */}
        <rect x={492} y={1} width={56} height={16} rx={1.5} fill="#0a0a0a" stroke="#2c2c2c" strokeWidth="1.5" />
        {/* Antenna */}
        <line x1="520" y1="1" x2="520" y2="-22" stroke="#2c2c2c" strokeWidth="1.5" />
        <line x1="502" y1="-18" x2="538" y2="-18" stroke="#2c2c2c" strokeWidth="1.5" />
        <line x1="509" y1="-11" x2="531" y2="-11" stroke="#2c2c2c" strokeWidth="1" />
        <circle cx="520" cy="-22" r="2.5" fill="#2c2c2c" />
        {/* Centered arrow button */}
        <circle cx="520" cy="140"
          r="20"
          fill={hovered ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.4)"}
          stroke={hovered ? "#fff" : "rgba(255,255,255,0.4)"}
          strokeWidth="1.5"
          style={{ transition: "all 0.3s" }}
        />
        <text x="520" y="146" textAnchor="middle" fontSize="14"
          fill={hovered ? "#000" : "#fff"}
          fontFamily="sans-serif"
          style={{ transition: "all 0.3s" }}
        >
          →
        </text>
        {/* BBC label near base */}
        <text x="520" y="168" textAnchor="middle" fontSize="8"
          fill={hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"}
          fontFamily="serif" letterSpacing="4"
          style={{ textTransform: "uppercase", transition: "all 0.3s" }}
        >
          BBC
        </text>
      </svg>
    </a>
  );
}

// ─── Mobile tile wrapper ──────────────────────────────────────────────────────
function MobileTile({ project, featured, borderLeft }: { project: CampaignProject; featured?: boolean; borderLeft?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`/campaigns/${project.slug}`}
      className="relative block group overflow-hidden"
      style={{ aspectRatio: "4/5", borderLeft: borderLeft ? "1px solid #2c2c2c" : undefined, flex: 1, minWidth: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 bg-[#0e0e0e]" />
      <img
        src={project.cover}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover z-[5] transition-transform duration-700 group-hover:scale-[1.05]"
        style={{ display: "block" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <Scanlines />
      <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.22)", opacity: hovered ? 0 : 1 }} />
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <div className="rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            width: featured ? 46 : 36, height: featured ? 46 : 36,
            borderColor: hovered ? "#fff" : "rgba(255,255,255,0.4)",
            background: hovered ? "#fff" : "rgba(0,0,0,0.3)",
            color: hovered ? "#000" : "#fff",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            fontSize: featured ? 16 : 12,
          }}>
          &rarr;
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2 z-30">
        <span className="font-display uppercase tracking-[0.18em] block transition-opacity duration-300"
          style={{ fontSize: 7, color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}>
          {project.name}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30 transition-opacity duration-300"
        style={{ background: "#FF6A1A", opacity: hovered ? 1 : 0 }} />
    </a>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
interface Props { projects: CampaignProject[] }
const B  = "2px solid #2c2c2c";
const B1 = "1px solid #2c2c2c";

export default function CampaignHouse({ projects }: Props) {
  const bbc  = projects.find((p) => p.slug === "bbc")!;
  const ks   = projects.find((p) => p.slug === "kidsuper")!;
  const bape = projects.find((p) => p.slug === "bape")!;
  const puma = projects.find((p) => p.slug === "puma")!;
  const sci  = projects.find((p) => p.slug === "science-project")!;

  return (
    <>
      {/* ═══ MOBILE ═══════════════════════════════════════════════════ */}
      <div className="md:hidden w-full" style={{ border: B, background: "#080808" }}>
        {/* Lintel */}
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: B1, background: "#060606" }}>
          <span className="font-display uppercase tracking-[0.28em] text-white/30" style={{ fontSize: 8 }}>Campaigns</span>
          <span className="font-display uppercase tracking-[0.2em] text-white/18" style={{ fontSize: 8 }}>Select a project</span>
        </div>
        {/* Main door — BBC */}
        <div style={{ borderBottom: B1 }}>
          <MobileTile project={bbc} featured />
        </div>
        {/* Second tier */}
        <div className="flex" style={{ borderBottom: B1 }}>
          <MobileTile project={ks} />
          <MobileTile project={bape} borderLeft />
        </div>
        {/* Base tier */}
        <div className="flex">
          <MobileTile project={puma} />
          <MobileTile project={sci} borderLeft />
        </div>
        {/* Base strip */}
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderTop: B1, background: "#050505" }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A1A]" style={{ boxShadow: "0 0 5px #FF6A1A" }} />
            <span className="font-display uppercase tracking-[0.25em] text-white/20" style={{ fontSize: 7 }}>Campaign Archive</span>
          </div>
          <span className="font-display uppercase tracking-[0.2em] text-[#FF6A1A]/35" style={{ fontSize: 7 }}>Replay</span>
        </div>
      </div>

      {/* ═══ DESKTOP ══════════════════════════════════════════════════ */}
      <div className="hidden md:block w-full max-w-[1040px] mx-auto" style={{ paddingTop: 22 }}>

        {/* BBC image inside triangular roof */}
        <RoofTile project={bbc} />

        {/* House body */}
        <div style={{ borderLeft: B, borderRight: B, borderBottom: B, background: "#080808" }}>

          {/* Row 1 — KidSuper · BAPE · Puma between speakers */}
          <div className="flex" style={{ borderBottom: B1, height: 280 }}>
            <Speaker side="left" />
            <Tile project={ks} />
            <Tile project={bape} borderLeft />
            <Tile project={puma} borderLeft />
            <Speaker side="right" />
          </div>

          {/* Row 2 — Science Project full width between speakers */}
          <div className="flex" style={{ height: 160 }}>
            <Speaker side="left" />
            <Tile project={sci} style={{ height: 160 }} />
            <Speaker side="right" />
          </div>

          {/* Sub-speaker woofer strip */}
          <div className="flex" style={{ borderTop: B1, height: 58 }}>
            {[0,1].map((side) => (
              <div key={side} className={`flex-1 relative bg-[#070707] overflow-hidden ${side === 0 ? "" : ""}`}
                style={{ borderLeft: side === 1 ? B1 : undefined }}>
                <svg width="100%" height="100%" viewBox="0 0 480 58" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
                  <defs>
                    <pattern id={`ws${side}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                      <rect width="8" height="8" fill="#0b0b0b"/>
                      <circle cx="4" cy="4" r="1.5" fill="#171717"/>
                    </pattern>
                  </defs>
                  <rect width="480" height="58" fill={`url(#ws${side})`}/>
                  {[55,145,235,325,415].map((cx, i) => (
                    <g key={i}>
                      <circle cx={cx} cy={29} r={20} fill="none" stroke="#1f1f1f" strokeWidth="1.5"/>
                      <circle cx={cx} cy={29} r={13} fill="none" stroke="#1b1b1b" strokeWidth="1.2"/>
                      <circle cx={cx} cy={29} r={7}  fill="none" stroke="#1a1a1a" strokeWidth="1.2"/>
                      <circle cx={cx} cy={29} r={3}  fill="#161616"/>
                    </g>
                  ))}
                  {[30,120,210,300,390].map((x,i) => (
                    <circle key={i} cx={x} cy={50} r={2.5} fill="#FF6A1A" opacity="0.4"/>
                  ))}
                </svg>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3"
          style={{ borderLeft: B, borderRight: B, borderBottom: B, borderTop: B, background: "#050505" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#FF6A1A]" style={{ boxShadow: "0 0 6px #FF6A1A" }} />
            <span className="font-display uppercase tracking-[0.28em] text-white/20" style={{ fontSize: 8 }}>Replay</span>
          </div>
          <span className="font-display uppercase tracking-[0.2em] text-[#FF6A1A]/35" style={{ fontSize: 8 }}>
            Dreamcast Archive
          </span>
        </div>

      </div>
    </>
  );
}
