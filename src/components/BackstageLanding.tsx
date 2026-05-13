import { backstageBrands, type BackstageBrand } from "@/data/backstage";

// Subtle pre-set rotations — alternating so it feels natural, not random
const ROTATIONS = [-2.4, 1.6, -1.0, 2.2, -1.8, 1.2];

// Clip colors — silver/gunmetal feel
const CLIP_GRADIENT = "linear-gradient(to bottom, #c0c0c0, #888)";

function Rail({ slots }: { slots: number }) {
  // Position one screw per poster column + ends
  const positions = Array.from({ length: slots }, (_, i) =>
    ((i + 0.5) / slots) * 100
  );
  return (
    <div className="relative w-full" style={{ height: "10px", marginBottom: "0" }}>
      {/* Bar */}
      <div
        className="absolute inset-y-0 my-auto w-full"
        style={{
          height: "2px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.25) 5%, rgba(255,255,255,0.25) 95%, transparent)",
        }}
      />
      {/* Screws */}
      {positions.map((pos) => (
        <div
          key={pos}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border border-white/20"
          style={{
            left: `${pos}%`,
            background: "radial-gradient(circle at 35% 35%, #ccc, #666)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        />
      ))}
    </div>
  );
}

function Clip() {
  return (
    <div className="flex flex-col items-center">
      {/* Wire down from rail */}
      <div className="w-px bg-white/20" style={{ height: "14px" }} />
      {/* Clip body */}
      <div
        className="rounded-[2px] shadow"
        style={{
          width: "18px",
          height: "11px",
          background: CLIP_GRADIENT,
          boxShadow: "0 1px 4px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
}

function PosterCard({ brand, rotation }: { brand: BackstageBrand; rotation: number }) {
  return (
    <a
      href={`/backstage/${brand.slug}`}
      className="group flex flex-col items-center select-none"
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "top center",
        transition: "transform 0.3s ease",
      }}
    >
      <Clip />

      {/* Poster frame */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          border: "5px solid #fff",
          boxShadow: "3px 6px 24px rgba(0,0,0,0.7)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Scale wrapper — avoids fighting the rotation transform */}
        <div
          className="w-full transition-transform duration-300"
          style={{ transformOrigin: "center center" }}
        >
          <div className="aspect-[3/4] relative">
            {brand.cover ? (
              <img
                src={brand.cover}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
            ) : (
              /* Placeholder typographic poster */
              <div
                className="w-full h-full flex flex-col justify-between"
                style={{ background: "#111", padding: "10px" }}
              >
                {/* Top label */}
                <span
                  className="text-white/20 uppercase"
                  style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.3em" }}
                >
                  Backstage
                </span>
                {/* Brand name — big, anchored to bottom */}
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-white font-display uppercase leading-none"
                    style={{ fontSize: "clamp(12px, 2.2vw, 20px)", letterSpacing: "-0.01em" }}
                  >
                    {brand.name}
                  </span>
                  {brand.season && (
                    <span
                      className="text-white/35 uppercase"
                      style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.25em" }}
                    >
                      {brand.season}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom strip (always visible, like a printed margin) */}
          <div
            className="px-2 py-1.5 flex items-center justify-between"
            style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span
              className="text-white/50 uppercase truncate"
              style={{ fontFamily: "Arial, sans-serif", fontSize: "7px", letterSpacing: "0.2em" }}
            >
              {brand.name}
            </span>
            <span
              className="text-white/25 uppercase flex-shrink-0 ml-2"
              style={{ fontFamily: "Arial, sans-serif", fontSize: "7px", letterSpacing: "0.15em" }}
            >
              →
            </span>
          </div>
        </div>

        {/* Hover tint */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/8 transition-colors duration-300 pointer-events-none" />
      </div>
    </a>
  );
}

export default function BackstageLanding() {
  // Split into rows of 2
  const chunkSize = 2;
  const rows: BackstageBrand[][] = [];
  for (let i = 0; i < backstageBrands.length; i += chunkSize) {
    rows.push(backstageBrands.slice(i, i + chunkSize));
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: "#0d0d0d", color: "#fff" }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
      >
        <a
          href="/"
          className="font-display uppercase hover:opacity-50 transition-opacity"
          style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.2em" }}
        >
          ← Home
        </a>
        <span
          className="font-display uppercase"
          style={{ fontSize: "11px", letterSpacing: "0.25em" }}
        >
          Backstage
        </span>
      </nav>

      {/* Wall */}
      <main className="px-8 pt-14 pb-24 flex flex-col" style={{ gap: "60px" }}>
        {rows.map((row, ri) => (
          <div key={ri}>
            <Rail slots={row.length} />
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${row.length}, 1fr)`,
                gap: "clamp(16px, 4vw, 48px)",
                paddingTop: "0",
              }}
            >
              {row.map((brand, i) => (
                <PosterCard
                  key={brand.slug}
                  brand={brand}
                  rotation={ROTATIONS[(ri * chunkSize + i) % ROTATIONS.length]}
                />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
