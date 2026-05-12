import { useState, useEffect } from "react";
import type { ReactNode } from "react";

const BBC = "/gallery/bbc-spring-2";
const WVB = "/gallery/walter-van-bierendonck";

const slides = [
  // Billionaire Boys Club
  { image: "/slides/bbc-01.jpg",    label: "Billionaire Boys Club Spring 2", link: BBC },
  { image: "/slides/bbc-02.jpg",    label: "", link: BBC },
  { image: "/slides/bbc-03.jpg",    label: "", link: BBC },
  { image: "/slides/bbc-04.jpg",    label: "", link: BBC },
  { image: "/slides/bbc-05.jpg",    label: "", link: BBC },
  { image: "/slides/bbc-06.jpg",    label: "", link: BBC },
  { image: "/slides/bbc-07.jpg",    label: "", link: BBC },
  { image: "/slides/bbc-08.jpg",    label: "", link: BBC },
  { image: "/slides/bbc-09.jpg",    label: "", link: BBC },
  { image: "/slides/bbc-10.jpg",    label: "", link: BBC },
  { image: "/slides/bbc-11.jpg",    label: "", link: BBC },
  { image: "/slides/wvb-g-01.jpg",  label: "", link: BBC },
  { image: "/slides/wvb-g-02.jpg",  label: "", link: BBC },
  { image: "/slides/wvb-g-03.jpg",  label: "", link: BBC },
  { image: "/slides/wvb-g-04.jpg",  label: "", link: BBC },
  { image: "/slides/wvb-g-05.jpg",  label: "", link: BBC },
  { image: "/slides/wvb-g-06.jpg",  label: "", link: BBC },
  { image: "/slides/wvb-g-07.jpg",  label: "", link: BBC },
  { image: "/slides/wvb-g-08.jpg",  label: "", link: BBC },
  { image: "/slides/wvb-g-09.jpg",  label: "", link: BBC },
  // Walter Van Bierendonck
  { image: "/slides/walter-van-beirendonck.jpg", label: "Walter Van Bierendonck", link: WVB },
  { image: "/slides/wvb-1.jpg",     label: "", link: WVB },
  { image: "/slides/wvb-3.jpg",     label: "", link: WVB },
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

  const currentSlide = slides[current];
  const Wrapper = currentSlide.link
    ? ({ children }: { children: ReactNode }) => (
        <a href={currentSlide.link} className="block relative w-full overflow-hidden rounded-2xl cursor-pointer" style={{ height: "480px" }}>{children}</a>
      )
    : ({ children }: { children: ReactNode }) => (
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

      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Left arrow */}
      <button
        onClick={(e) => { e.preventDefault(); setShowLabel(false); setTimeout(() => { setCurrent((prev) => (prev - 1 + slides.length) % slides.length); setShowLabel(true); }, 300); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
        aria-label="Previous"
      >
        &#8592;
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => { e.preventDefault(); setShowLabel(false); setTimeout(() => { setCurrent((prev) => (prev + 1) % slides.length); setShowLabel(true); }, 300); }}
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
          {slides[current].label}
        </p>
      </div>
    </Wrapper>
  );
}
