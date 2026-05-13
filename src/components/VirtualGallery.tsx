import { galleryPieces, type GalleryPiece } from "@/data/graphicDesign";

function Spotlight() {
  return (
    <div
      className="absolute top-0 left-0 right-0 pointer-events-none"
      style={{
        height: "70%",
        background:
          "radial-gradient(ellipse 55% 65% at 50% 0%, rgba(255,255,255,0.055) 0%, transparent 100%)",
      }}
    />
  );
}

function Plaque({ index, piece }: { index: number; piece: GalleryPiece }) {
  return (
    <div className="flex flex-col items-center gap-1 mt-5">
      <span
        className="text-white/25 uppercase"
        style={{ fontFamily: "Arial, sans-serif", fontSize: "9px", letterSpacing: "0.35em" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className="text-white font-display uppercase tracking-wide"
        style={{ fontSize: "clamp(11px, 1.4vw, 15px)", letterSpacing: "0.12em" }}
      >
        {piece.title}
      </span>
      {(piece.medium || piece.year) && (
        <span
          className="text-white/35 uppercase"
          style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.25em" }}
        >
          {[piece.medium, piece.year].filter(Boolean).join(" · ")}
        </span>
      )}
    </div>
  );
}

function ArtworkFrame({ piece, index }: { piece: GalleryPiece; index: number }) {
  return (
    <a
      href={`/graphic-design/${piece.slug}`}
      className="group flex flex-col items-center select-none"
      style={{ cursor: "pointer" }}
    >
      {/* Frame + mat */}
      <div
        className="relative transition-all duration-500 group-hover:scale-[1.02]"
        style={{
          padding: "16px",
          background: "#f0ebe0",
          border: "3px solid #222",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.9), 0 6px 20px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(0,0,0,0.1)",
        }}
      >
        {/* Artwork area */}
        <div
          style={{
            width: "clamp(180px, 38vw, 440px)",
            aspectRatio: "4 / 5",
            overflow: "hidden",
            background: "#111",
          }}
        >
          {piece.cover ? (
            <img
              src={piece.cover}
              alt={piece.title}
              className="w-full h-full object-contain"
              draggable={false}
            />
          ) : (
            /* Placeholder — dark field with title */
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-6">
              <div
                className="w-8 border-t border-white/10"
              />
              <span
                className="text-white/15 text-center font-display uppercase"
                style={{ fontSize: "clamp(10px, 1.5vw, 14px)", letterSpacing: "0.15em", lineHeight: 1.4 }}
              >
                {piece.title}
              </span>
              <div className="w-8 border-t border-white/10" />
            </div>
          )}
        </div>

        {/* Hover tint */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none" />
      </div>

      <Plaque index={index} piece={piece} />
    </a>
  );
}

export default function VirtualGallery() {
  return (
    <div
      className="w-full flex"
      style={{
        height: "100svh",
        overflowX: "scroll",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
        background: "#141414",
        scrollBehavior: "smooth",
      }}
    >
      {galleryPieces.map((piece, i) => (
        <div
          key={piece.slug}
          className="flex-shrink-0 w-full h-full relative flex flex-col items-center justify-center"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <Spotlight />
          <ArtworkFrame piece={piece} index={i} />

          {/* Subtle piece counter */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 tracking-widest uppercase"
            style={{ fontFamily: "Arial, sans-serif", fontSize: "9px", letterSpacing: "0.3em" }}
          >
            {i + 1} / {galleryPieces.length}
          </div>
        </div>
      ))}
    </div>
  );
}
