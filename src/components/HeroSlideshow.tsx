import { useState, useEffect, useCallback } from "react";

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
  {
    image: "/slides/kidsuper-hero.jpg",
    label: "KidSuper",
    link: "/gallery/kidsuper",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [showLabel, setShowLabel] = useState(true);

  const go = useCallback((dir: number) => {
    setShowLabel(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + slides.length) % slides.length);
      setShowLabel(true);
    }, 400);
  }, []);

  const handleImageClick = () => {
    window.location.href = slides[current].link;
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl select-none" style={{ height: "480px" }}>

      {/* Images */}
      {slides.map((s, i) => (
        <img
          key={s.image}
          src={s.image}
          alt={s.label}
          onClick={i === current ? handleImageClick : undefined}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: i === current ? 1 : 0,
            cursor: i === current ? "pointer" : "default",
            zIndex: 0,
          }}
        />
      ))}

      {/* Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" style={{ zIndex: 1 }} />

      {/* Left arrow — full height tap zone */}
      <button
        onClick={() => go(-1)}
        style={{ zIndex: 2 }}
        className="absolute left-0 top-0 h-full w-1/4 flex items-center justify-start pl-4 text-white/60 hover:text-white transition-colors text-sm"
        aria-label="Previous"
      >
        &#8592;
      </button>

      {/* Right arrow — full height tap zone */}
      <button
        onClick={() => go(1)}
        style={{ zIndex: 2 }}
        className="absolute right-0 top-0 h-full w-1/4 flex items-center justify-end pr-4 text-white/60 hover:text-white transition-colors text-sm"
        aria-label="Next"
      >
        &#8594;
      </button>

      {/* Label */}
      <div
        className="absolute inset-x-0 bottom-0 px-6 pb-7 transition-all duration-500"
        style={{ zIndex: 1, opacity: showLabel ? 1 : 0, transform: showLabel ? "translateY(0)" : "translateY(8px)" }}
      >
        <p className="text-white text-xl font-semibold tracking-wide drop-shadow-md">
          {slides[current].label}
        </p>
      </div>

    </div>
  );
}
