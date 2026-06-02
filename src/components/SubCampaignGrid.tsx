"use client";
import { useState } from "react";
import type { SubCampaign } from "@/data/campaigns";

// ─── Scanlines ────────────────────────────────────────────────────────────────
const Scanlines = () => (
  <div
    className="absolute inset-0 pointer-events-none z-10"
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.09) 3px, rgba(0,0,0,0.09) 4px)",
    }}
  />
);

// ─── Single tile ──────────────────────────────────────────────────────────────
function SubTile({
  sub,
  parentSlug,
  featured = false,
  borderLeft = false,
  borderTop = false,
}: {
  sub: SubCampaign;
  parentSlug: string;
  featured?: boolean;
  borderLeft?: boolean;
  borderTop?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const href = `/campaigns/${parentSlug}/${sub.slug}`;

  return (
    <a
      href={href}
      className="relative block group overflow-hidden flex-1"
      style={{
        aspectRatio: "4 / 5",
        minWidth: 0,
        borderLeft: borderLeft ? "1px solid #2c2c2c" : undefined,
        borderTop: borderTop ? "1px solid #2c2c2c" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Placeholder */}
      <div className="absolute inset-0 bg-[#0e0e0e] flex items-center justify-center z-0">
        <span
          className="font-display uppercase tracking-[0.3em] text-white/8"
          style={{ fontSize: 10 }}
        >
          {sub.name}
        </span>
      </div>

      {/* Cover */}
      <img
        src={sub.cover}
        alt={sub.name}
        className="absolute inset-0 w-full h-full object-cover z-[5] transition-transform duration-700 group-hover:scale-[1.05]"
        style={{ display: "block" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />

      <Scanlines />

      {/* Dim */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-400"
        style={{ background: "rgba(0,0,0,0.26)", opacity: hovered ? 0 : 1 }}
      />

      {/* Centered arrow */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <div
          className="rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            width: featured ? 50 : 40,
            height: featured ? 50 : 40,
            borderColor: hovered ? "#fff" : "rgba(255,255,255,0.4)",
            background: hovered ? "#fff" : "rgba(0,0,0,0.3)",
            color: hovered ? "#000" : "#fff",
            transform: hovered ? "scale(1.12)" : "scale(1)",
            fontSize: featured ? 17 : 13,
          }}
        >
          &rarr;
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/85 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 z-30">
        <span
          className="font-display uppercase tracking-[0.2em] block transition-opacity duration-300"
          style={{
            fontSize: 9,
            color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
          }}
        >
          {sub.name}
        </span>
        {sub.year && (
          <span
            className="font-display uppercase tracking-[0.18em] block mt-0.5"
            style={{ fontSize: 7, color: "rgba(255,106,26,0.55)" }}
          >
            {sub.year}
          </span>
        )}
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-30 transition-opacity duration-300"
        style={{ background: "#FF6A1A", opacity: hovered ? 1 : 0 }}
      />
    </a>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────
interface Props {
  parentSlug: string;
  subcampaigns: SubCampaign[];
}

const B  = "2px solid #2c2c2c";
const B1 = "1px solid #2c2c2c";

export default function SubCampaignGrid({ parentSlug, subcampaigns }: Props) {
  // Always: first sub is featured (most recent), rest fill below
  const [featured, ...rest] = subcampaigns;

  return (
    <div className="w-full max-w-[860px] mx-auto" style={{ border: B, background: "#080808" }}>

      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: B1, background: "#060606" }}
      >
        <span className="font-display uppercase tracking-[0.28em] text-white/30" style={{ fontSize: 8 }}>
          Billionaire Boys Club
        </span>
        <span className="font-display uppercase tracking-[0.22em] text-white/15" style={{ fontSize: 8 }}>
          Select a campaign
        </span>
      </div>

      {/* Featured tile — most recent, full width */}
      <div>
        <SubTile sub={featured} parentSlug={parentSlug} featured />
      </div>

      {/* Remaining tiles — side by side */}
      {rest.length > 0 && (
        <div className="flex" style={{ borderTop: B1 }}>
          {rest.map((sub, i) => (
            <SubTile
              key={sub.slug}
              sub={sub}
              parentSlug={parentSlug}
              borderLeft={i > 0}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        className="flex items-center justify-between px-5 py-2.5"
        style={{ borderTop: B1, background: "#050505" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A1A]" style={{ boxShadow: "0 0 5px #FF6A1A" }} />
          <span className="font-display uppercase tracking-[0.28em] text-white/18" style={{ fontSize: 7 }}>
            Campaign Archive
          </span>
        </div>
        <span className="font-display uppercase tracking-[0.2em] text-[#FF6A1A]/35" style={{ fontSize: 7 }}>
          Replay
        </span>
      </div>

    </div>
  );
}
