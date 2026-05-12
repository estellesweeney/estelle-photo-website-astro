import { useState, useEffect } from "react";

const slides = [
  {
    image: "/slides/bbc-spring2.jpg",
    label: "Billionaire Boys Club Spring 2",
    link: "/gallery/bbc-spring-2",
  },
  {
    image: "/slides/walter-van-beirendonck.jpg",
    label: "Walter Van Bierendonck",
    link: "/gallery/walter-van-bierendonck",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => advance(1), 4000);
    return () => clearInterval(interval);
  }, []);

  const advance = (dir: number) => {
    setShowLabel(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + slides.length) % slides.length);
      setShowLabel(true);
    }, 400);
  };

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: "480px" }}>

      {/* Clickable image area */}
      {slides.map((s, i) => (
        <a
          key={s.image}
          href={s.link}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: i === current ? 1 : 0, transition: "opacity 0.7s", pointerEvents: i === current ? "auto" : "none" }}
          tabIndex={i === current ? 0 : -1}
          aria-label={s.label}
        >
          <img
            src={s.image}
            alt={s.label}
            className="w-full h-full object-cover"
          />
        </a>
      ))}

      {/* Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* Left arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); advance(-1); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
        aria-label="Previous"
      >
        &#8592;
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); advance(1); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
        aria-label="Next"
      >
        &#8594;
      </button>

      {/* Label */}
      <div
        className="absolute inset-x-0 bottom-0 px-6 pb-7 pointer-events-none transition-all duration-500"
        style={{ opacity: showLabel ? 1 : 0, transform: showLabel ? "translateY(0)" : "translateY(8px)" }}
      >
        <p className="text-white text-xl font-semibold tracking-wide drop-shadow-md">
          {slide.label}
        </p>
      </div>

    </div>
  );
}
