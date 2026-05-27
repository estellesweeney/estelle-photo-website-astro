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
  return (
    <div
      style={{
        flex: "0 0 auto",
        minWidth: 0,
        display: "block",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
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
        }}
        loading="lazy"
        draggable={false}
      />
    </div>
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
