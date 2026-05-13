interface Props {
  images: string[];
  alt?: string;
}

export default function VerticalGallery({ images, alt = "" }: Props) {
  return (
    <div
      className="w-full overflow-y-scroll"
      style={{
        height: "100svh",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      {images.map((src, i) => (
        <div
          key={src}
          style={{
            height: "100svh",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
          className="w-full flex items-center justify-center bg-black"
        >
          <img
            src={src}
            alt={`${alt} ${i + 1}`}
            className="w-full h-full object-contain"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>
  );
}
