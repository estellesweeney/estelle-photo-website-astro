import { useState, useEffect } from "react";
import type { ReactNode } from "react";

const slides = [
  {
    image: "/slides/bbc-spring2.jpg",
    label: "Billionaire Boys Club Spring 2",
    link: "/gallery/bbc-spring-2",
  },
  {
    image: "/slides/bbc-spring2-b.jpg",
    label: "Billionaire Boys Club Spring 2",
    link: "/gallery/bbc-spring-2",
  },
  {
    image: "/slides/bbc-spring2-c.jpg",
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
    const interval = setInterval(() => {
      setShowLabel(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setShowLabel(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const go = (dir: number) => {
    setShowLabel(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + slides.length) % slides.length);
      setShowLabel(true);
    }, 300);
  };

  const currentSlide = slides[current];
  const Wrapper = ({ children }: { children: ReactNode }) =>
    currentSlide.link ? (
      <a href={currentSlide.link} className="block relative w-full overflow-hidden rounded-2xl cursor-pointer" style={{ height: "480px" }}>{children}</a>
    ) : (
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: "480px" }}>{children}</div>
    );

  return (
    <Wrapper>
      {slides.map((slide, i) => (
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.label}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Left arrow */}
      <button
        onClick={(e) => { e.preventDefault(); go(-1); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
        aria-label="Previous"
      >
        &#8592;
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => { e.preventDefault(); go(1); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
        aria-label="Next"
      >
        &#8594;
      </button>

      {/* Label */}
      <div
        className="absolute inset-x-0 bottom-0 px-6 pb-7 transition-all duration-500"
        style={{ opacity: showLabel ? 1 : 0, transform: showLabel ? "translateY(0)" : "translateY(8px)" }}
      >
        <p className="text-white text-xl font-semibold tracking-wide drop-shadow-md">
          {currentSlide.label}
        </p>
      </div>
    </Wrapper>
  );
}
