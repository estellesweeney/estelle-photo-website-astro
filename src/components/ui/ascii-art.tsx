import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  color?: string;
  animationDuration?: number;
  className?: string;
}

const CHARS = " .,:;+=xX$&#@";

export function AsciiArt({ src, color = "#fff", animationDuration = 0.8, className = "" }: Props) {
  const ref = useRef<HTMLPreElement>(null);
  const [ascii, setAscii] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Pick font size so art fills the screen
    const fontSize = Math.max(5, Math.min(10, W / 160));
    const charW = fontSize * 0.601;
    const charH = fontSize * 1.2;
    const cols = Math.floor(W / charW);
    const rows = Math.floor(H / charH);

    if (ref.current) {
      ref.current.style.fontSize = `${fontSize}px`;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, cols, rows);
      const data = ctx.getImageData(0, 0, cols, rows).data;

      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const b = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
          out += CHARS[Math.floor(b * (CHARS.length - 1))];
        }
        out += "\n";
      }
      setAscii(out);
      setTimeout(() => setVisible(true), 30);
    };
    img.src = src;
  }, [src]);

  return (
    <pre
      ref={ref}
      className={className}
      style={{
        color,
        opacity: visible ? 1 : 0,
        transition: `opacity ${animationDuration}s ease`,
        fontFamily: "monospace",
        lineHeight: 1.2,
        whiteSpace: "pre",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        userSelect: "none",
      }}
    >
      {ascii}
    </pre>
  );
}
