import { runwayGridImages } from "@/data/runway";

export default function RunwayGrid() {
  return (
    <div
      style={{
        columnCount: 2,
        columnGap: "2px",
      }}
      className="md:[column-count:3]"
    >
      {runwayGridImages.map((img, i) => (
        <a
          key={i}
          href={`/runway/${img.slug}`}
          className="relative block overflow-hidden group mb-[2px] break-inside-avoid"
        >
          <img
            src={img.src}
            alt={img.brand}
            className="w-full block"
            loading="lazy"
            draggable={false}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex items-end p-4">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0 transition-transform">
              <div
                className="text-[10px] tracking-[0.25em] uppercase text-white font-semibold"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                {img.brand}
              </div>
              <div className="text-[10px] tracking-wider text-white/55 mt-0.5">
                {img.season}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
