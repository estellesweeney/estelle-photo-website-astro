import useEmblaCarousel from "embla-carousel-react";

const photos = [
  { src: "/slides/wvb-g-01.jpg",        brand: "Walter Van Bierendonck" },
  { src: "/slides/kidsuper/otb-02.jpg",  brand: "KidSuper" },
  { src: "/slides/wvb-g-04.jpg",        brand: "Walter Van Bierendonck" },
  { src: "/slides/kidsuper/otb-05.jpg",  brand: "KidSuper" },
  { src: "/slides/wvb-g-07.jpg",        brand: "Walter Van Bierendonck" },
  { src: "/slides/kidsuper/moon-06.jpg", brand: "KidSuper" },
  { src: "/slides/wvb-g-09.jpg",        brand: "Walter Van Bierendonck" },
  { src: "/slides/kidsuper/otb-09.jpg",  brand: "KidSuper" },
  { src: "/slides/wvb-g-02.jpg",        brand: "Walter Van Bierendonck" },
  { src: "/slides/kidsuper/moon-08.jpg", brand: "KidSuper" },
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
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative flex-none h-[340px] sm:h-[420px]"
            style={{ width: "auto" }}
          >
            <img
              src={photo.src}
              alt={photo.brand}
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
