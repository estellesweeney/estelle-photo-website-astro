import { useEffect, useState } from "react";
import { AsciiArt } from "@/components/ui/ascii-art";

interface Props {
  onDone: () => void;
}

export default function AsciiIntro({ onDone }: Props) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 4200);
    const doneTimer = setTimeout(onDone, 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "black",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.8s ease",
      }}
    >
      <AsciiArt
        src="/ascii-source.jpg"
        resolution={120}
        color="#ffffff"
        animationStyle="fade"
        animationDuration={1.5}
        className="w-full h-full"
      />
    </div>
  );
}
