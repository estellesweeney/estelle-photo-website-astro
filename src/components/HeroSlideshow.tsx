import { useState, useCallback } from "react";

const slides = [
  {
    image: "/slides/bbc-spring2.jpg",
    label: "Billionaire Boys Club",
    link: "/gallery/billionaire-boys-club",
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

  return (
    <div className="relative w-full overflow-hidden rounded-2xl select-none" style={{ height: "480px" }}>

      {/* Images */}
      {slides.map((s, i) => (
        <img
          key={s.image}
          src={s.image}
          alt={s.label}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        />
      ))}

      {/* Center click zone — navigates to gallery */}
      <div
        className="absolute top-0 h-full cursor-pointer"
        style={{ left: "25%", width: "50%", zIndex: 2 }}
        onClick={() => { window.location.href = slides[current].link; }}
      />

      {/* Label — centered middle */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500"
        style={{ zIndex: 3, opacity: showLabel ? 1 : 0 }}
      >
        <p className="text-white text-[10px] tracking-[0.25em] uppercase font-display font-medium px-3 py-1.5 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
          {slides[current].label}
        </p>
      </div>

      {/* Left arrow — full height tap zone */}
      <button
        onClick={() => go(-1)}
        className="absolute left-0 top-0 h-full w-1/4 flex items-center justify-start pl-4 text-white/60 hover:text-white transition-colors text-sm"
        style={{ zIndex: 4 }}
        aria-label="Previous"
      >
        &#8592;
      </button>

      {/* Right arrow — full height tap zone */}
      <button
        onClick={() => go(1)}
        className="absolute right-0 top-0 h-full w-1/4 flex items-center justify-end pr-4 text-white/60 hover:text-white transition-colors text-sm"
        style={{ zIndex: 4 }}
        aria-label="Next"
      >
        &#8594;
      </button>

    </div>
  );
}
