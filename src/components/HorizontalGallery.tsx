interface Props {
  images: string[];
  alt?: string;
}

export default function HorizontalGallery({ images, alt = "" }: Props) {
  return (
    <div
      className="w-full overflow-x-scroll flex"
      style={{
        height: "100svh",
        scrollSnapType: "x mandatory",
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className="flex-shrink-0 w-full h-full flex items-center justify-center bg-black"
          style={{
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          <img
            src={src}
            alt={`${alt} ${i + 1}`}
            className="w-full h-full object-contain"
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
