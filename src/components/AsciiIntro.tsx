import { useEffect, useRef, useState } from "react";
import { AsciiArt } from "@/components/ui/ascii-art";

interface Props {
  onDone: () => void;
}

export default function AsciiIntro({ onDone }: Props) {
  const [fading, setFading] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1000);
    const doneTimer = setTimeout(() => onDoneRef.current(), 1500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 24;
    const y = (e.clientY / window.innerHeight - 0.5) * 24;
    setMouse({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: "fixed",
        inset: 0,
        background: "black",
        zIndex: 999,
        overflow: "hidden",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        cursor: "none",
      }}
    >
      {/* Parallax layer */}
      <div
        style={{
          transform: `translate(${mouse.x}px, ${mouse.y}px) scale(1.04)`,
          transition: "transform 0.4s ease-out",
          width: "100%",
          height: "100%",
        }}
      >
        <AsciiArt
          src="/ascii-source.jpg"
          color="#ffffff"
          animationDuration={0.8}
        />
      </div>
    </div>
  );
}
