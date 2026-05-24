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
      style={{
        overflow: "hidden",
        width: "100%",
      }}
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
        {photos.map((src, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 auto",
              minWidth: 0,
              height: "clamp(220px, 45vw, 480px)",
            }}
          >
            <img
              src={src}
              alt={`Runway ${i + 1}`}
              style={{
                height: "100%",
                width: "auto",
                display: "block",
                objectFit: "cover",
                pointerEvents: "none",
              }}
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
