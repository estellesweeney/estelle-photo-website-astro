import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const photos = [
  { src: "/slides/wvb-g-01.jpg",           brand: "Walter Van Bierendonck", season: "PFW 2026" },
  { src: "/slides/kidsuper/otb-01.jpg",     brand: "KidSuper AW26/27",       season: "PFW 2026" },
  { src: "/slides/wvb-g-03.jpg",           brand: "Walter Van Bierendonck", season: "PFW 2026" },
  { src: "/slides/kidsuper/otb-04.jpg",     brand: "KidSuper AW26/27",       season: "PFW 2026" },
  { src: "/slides/wvb-g-05.jpg",           brand: "Walter Van Bierendonck", season: "PFW 2026" },
  { src: "/slides/kidsuper/moon-06.jpg",    brand: "KidSuper AW25",          season: "PFW 2025" },
  { src: "/slides/wvb-g-07.jpg",           brand: "Walter Van Bierendonck", season: "PFW 2026" },
  { src: "/slides/kidsuper/otb-08.jpg",     brand: "KidSuper AW26/27",       season: "PFW 2026" },
  { src: "/slides/wvb-g-09.jpg",           brand: "Walter Van Bierendonck", season: "PFW 2026" },
  { src: "/slides/kidsuper/moon-09.jpg",    brand: "KidSuper AW25",          season: "PFW 2025" },
];

export default function RunwayCarousel() {
  return (
    <Carousel
      opts={{ align: "start" }}
      orientation="vertical"
      className="w-full"
    >
      <CarouselContent className="-mt-1 h-[500px]">
        {photos.map((photo, index) => (
          <CarouselItem key={index} className="basis-1/2 pt-1">
            <div className="relative w-full h-full overflow-hidden group">
              <img
                src={photo.src}
                alt={photo.brand}
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-80"
                loading="lazy"
                draggable={false}
              />
              {/* Hover label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white font-display font-semibold">
                  {photo.brand}
                </p>
                <p className="text-[10px] tracking-wider text-white/55 mt-0.5">
                  {photo.season}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
