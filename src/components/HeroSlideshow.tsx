import { useState, useEffect } from "react";

const slides = [
  {
    image: "/slides/bbc-spring2.jpg",
    label: "Billionaire Boys Club Spring 2",
  },
  {
    image: "/slides/bbc-spring2-b.jpg",
    label: "Billionaire Boys Club Spring 2",
  },
  {
    image: "/slides/bbc-spring2-c.jpg",
    label: "Billionaire Boys Club Spring 2",
  },
  {
    image: "/slides/walter-van-beirendonck.jpg",
    label: "Walter Van Beirendonck",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLabel(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setShowLabel(true);
      }, 600); // fade out, then switch
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: "480px" }}>
      {slides.map((slide, i) => (
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.label}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Label */}
      <div
        className="absolute inset-x-0 bottom-0 px-6 pb-7 transition-all duration-500"
        style={{ opacity: showLabel ? 1 : 0, transform: showLabel ? "translateY(0)" : "translateY(8px)" }}
      >
        <p className="text-white text-xl font-semibold tracking-wide drop-shadow-md">
          {slides[current].label}
        </p>
      </div>
    </div>
  );
}
