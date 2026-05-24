import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  resolution?: number;
  color?: string;
  animationStyle?: "fade" | "none";
  animationDuration?: number;
  animateOnView?: boolean;
  className?: string;
}

const CHARS = " .,:;+=xX$&#@";

export function AsciiArt({
  src,
  resolution = 100,
  color = "#ffffff",
  animationStyle = "fade",
  animationDuration = 1.5,
  className = "",
}: Props) {
  const [ascii, setAscii] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const cols = resolution;
      const rows = Math.floor(cols * (img.height / img.width) * 0.45);
      canvas.width = cols;
      canvas.height = rows;
      ctx.drawImage(img, 0, 0, cols, rows);
      const data = ctx.getImageData(0, 0, cols, rows).data;
      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
          out += CHARS[Math.floor(brightness * (CHARS.length - 1))];
        }
        out += "\n";
      }
      setAscii(out);
      setTimeout(() => setVisible(true), 50);
    };
    img.src = src;
  }, [src, resolution]);

  return (
    <pre
      className={className}
      style={{
        color,
        opacity: visible ? 1 : 0,
        transition: animationStyle === "fade" ? `opacity ${animationDuration}s ease` : "none",
        fontFamily: "monospace",
        fontSize: "clamp(3px, 0.8vw, 9px)",
        lineHeight: 1.15,
        whiteSpace: "pre",
        overflow: "hidden",
        margin: 0,
        userSelect: "none",
      }}
    >
      {ascii}
    </pre>
  );
}
