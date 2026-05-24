import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

// Map each photo to its show slug — update slugs once Estelle confirms which photo is from which show
// Existing show pages: /runway/walter-van-bierendonck | /runway/kidsuper-aw2627 | /runway/kidsuper-aw25
const photos = [
  { src: "/slides/runway/01.jpg", slug: "__shows__" },
  { src: "/slides/runway/02.jpg", slug: "" },
  { src: "/slides/runway/03.jpg", slug: "" },
  { src: "/slides/runway/04.jpg", slug: "" },
  { src: "/slides/runway/05.jpg", slug: "" },
  { src: "/slides/runway/06.jpg", slug: "" },
  { src: "/slides/runway/07.jpg", slug: "" },
  { src: "/slides/runway/08.jpg", slug: "" },
  { src: "/slides/runway/09.jpg", slug: "" },
  { src: "/slides/runway/10.jpg", slug: "" },
  { src: "/slides/runway/11.jpg", slug: "" },
  { src: "/slides/runway/12.jpg", slug: "" },
  { src: "/slides/runway/13.jpg", slug: "" },
  { src: "/slides/runway/14.jpg", slug: "" },
  { src: "/slides/runway/15.jpg", slug: "" },
  { src: "/slides/runway/16.jpg", slug: "" },
  { src: "/slides/runway/17.jpg", slug: "" },
];

function Slide({ src, slug }: { src: string; slug: string }) {
  const [hovered, setHovered] = useState(false);
  const href = "/runway/shows";

  return (
    <a
      href={href}
      style={{
        flex: "0 0 auto",
        minWidth: 0,
        display: "block",
        width: "clamp(160px, 28vw, 300px)",
        aspectRatio: "4 / 5",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt="Runway"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          pointerEvents: "none",
          transition: "transform 0.4s ease",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
        loading="lazy"
        draggable={false}
      />
      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <span
          style={{
            color: "rgba(245,240,232,0.9)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "serif",
          }}
        >
          View Gallery →
        </span>
      </div>
    </a>
  );
}

export default function RunwayPhotoCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      dragFree: true,
      loop: true,
      containScroll: false,
    },
    [WheelGesturesPlugin()]
  );

  return (
    <div
      ref={emblaRef}
      style={{ overflow: "hidden", width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          gap: "6px",
          backfaceVisibility: "hidden",
          touchAction: "pan-y pinch-zoom",
          userSelect: "none",
        }}
      >
        {photos.map((photo, i) => (
          <Slide key={i} src={photo.src} slug={photo.slug} />
        ))}
      </div>
    </div>
  );
}
