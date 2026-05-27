import { useState, useEffect, useCallback } from "react";
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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", dragFree: true, loop: true, containScroll: false },
    [WheelGesturesPlugin()]
  );
  const [showHint, setShowHint] = useState(true);

  // Hide swipe hint after first drag or after 3s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const hide = () => setShowHint(false);
    emblaApi.on("pointerDown", hide);
    emblaApi.on("scroll", hide);
    return () => { emblaApi.off("pointerDown", hide); emblaApi.off("scroll", hide); };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>

      {/* Carousel track */}
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

      {/* Desktop arrows */}
      <button onClick={scrollPrev} aria-label="Previous" style={{
        position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
        background: "rgba(8,8,8,0.55)", border: "1px solid rgba(245,240,232,0.2)",
        color: "rgba(245,240,232,0.8)", width: "36px", height: "36px", borderRadius: "50%",
        cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)", transition: "background 0.2s", zIndex: 10,
      }}
        className="carousel-arrow"
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(245,240,232,0.15)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(8,8,8,0.55)")}
      >‹</button>

      <button onClick={scrollNext} aria-label="Next" style={{
        position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
        background: "rgba(8,8,8,0.55)", border: "1px solid rgba(245,240,232,0.2)",
        color: "rgba(245,240,232,0.8)", width: "36px", height: "36px", borderRadius: "50%",
        cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)", transition: "background 0.2s", zIndex: 10,
      }}
        className="carousel-arrow"
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(245,240,232,0.15)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(8,8,8,0.55)")}
      >›</button>

      {/* Swipe hint — mobile, fades out after 3s */}
      <div style={{
        position: "absolute", bottom: "20px", left: 0, right: 0,
        display: "flex", justifyContent: "center", alignItems: "center", gap: "8px",
        opacity: showHint ? 1 : 0, transition: "opacity 0.6s ease",
        pointerEvents: "none", zIndex: 10,
      }}>
        <span style={{ fontSize: "14px", color: "rgba(245,240,232,0.7)" }}>←</span>
        <span style={{ fontFamily: "Arial, sans-serif", fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)" }}>Swipe</span>
        <span style={{ fontSize: "14px", color: "rgba(245,240,232,0.7)" }}>→</span>
      </div>

      {/* Right edge fade — signals more content */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "40px", height: "100%",
        background: "linear-gradient(to right, transparent, rgba(0,0,0,0.4))",
        pointerEvents: "none", zIndex: 5,
      }} />

      <style>{`
        @media (min-width: 769px) {
          .carousel-arrow { display: flex !important; }
        }
        @media (max-width: 768px) {
          .carousel-arrow { display: none !important; }
        }
      `}</style>
    </div>
  );
}
