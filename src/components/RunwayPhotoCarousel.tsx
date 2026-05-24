import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

const photos = [
  "/slides/runway/01.jpg",
  "/slides/runway/02.jpg",
  "/slides/runway/03.jpg",
  "/slides/runway/04.jpg",
  "/slides/runway/05.jpg",
  "/slides/runway/06.jpg",
  "/slides/runway/07.jpg",
  "/slides/runway/08.jpg",
  "/slides/runway/09.jpg",
  "/slides/runway/10.jpg",
  "/slides/runway/11.jpg",
  "/slides/runway/12.jpg",
  "/slides/runway/13.jpg",
  "/slides/runway/14.jpg",
  "/slides/runway/15.jpg",
  "/slides/runway/16.jpg",
  "/slides/runway/17.jpg",
];

function Slide({ src }: { src: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/runway/shows"
      style={{
        flex: "0 0 auto",
        minWidth: 0,
        display: "block",
        height: "100%",
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
          height: "100%",
          width: "auto",
          objectFit: "cover",
          display: "block",
          pointerEvents: "none",
          transition: "transform 0.4s ease",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
        loading="lazy"
        draggable={false}
      />
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
        <span style={{
          color: "rgba(245,240,232,0.9)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "serif",
        }}>
          View Gallery →
        </span>
      </div>
    </a>
  );
}

export default function RunwayPhotoCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { align: "start", dragFree: true, loop: true, containScroll: false },
    [WheelGesturesPlugin()]
  );

  return (
    <div ref={emblaRef} style={{ overflow: "hidden", width: "100%", height: "100%" }}>
      <div style={{
        display: "flex",
        gap: "4px",
        height: "100%",
        backfaceVisibility: "hidden",
        touchAction: "pan-y pinch-zoom",
        userSelect: "none",
      }}>
        {photos.map((src, i) => (
          <Slide key={i} src={src} />
        ))}
      </div>
    </div>
  );
}
