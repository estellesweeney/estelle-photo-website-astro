import useEmblaCarousel from "embla-carousel-react";

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
];

export default function RunwayPhotoCarousel() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    loop: true,
  });

  return (
    <div className="w-full overflow-hidden" ref={emblaRef}>
      <div className="flex gap-2">
        {photos.map((src, i) => (
          <div key={i} className="flex-none h-[340px] sm:h-[420px]">
            <img
              src={src}
              alt={`Runway ${i + 1}`}
              className="h-full w-auto object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
