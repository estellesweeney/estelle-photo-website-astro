import { useEffect, useRef, useState } from "react";
import { AsciiArt } from "@/components/ui/ascii-art";

interface Props {
  onDone: () => void;
}

export default function AsciiIntro({ onDone }: Props) {
  const [phase, setPhase] = useState<"binary" | "spinning" | "estelle" | "out">("binary");
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("spinning"), 900);
    const t2 = setTimeout(() => setPhase("estelle"), 1900);
    const t3 = setTimeout(() => exit(), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const exit = () => {
    setPhase("out");
    setTimeout(() => onDoneRef.current(), 700);
  };

  return (
    <>
      <style>{`
        @keyframes spin-once {
          0%   { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
          50%  { transform: translate(-50%, -50%) rotate(180deg) scale(1.15); }
          100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
        }
        @keyframes icon-idle {
          0%   { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes estelle-in {
          0%   { opacity: 0; letter-spacing: 0.55em; }
          100% { opacity: 1; letter-spacing: 0.35em; }
        }
      `}</style>

      <div
        onClick={exit}
        style={{
          position: "fixed",
          inset: 0,
          background: "black",
          zIndex: 999,
          overflow: "hidden",
          cursor: "pointer",
          opacity: phase === "out" ? 0 : 1,
          transition: "opacity 0.7s ease",
        }}
      >
        {/* Binary ASCII layer */}
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: phase === "spinning" || phase === "estelle" || phase === "out" ? 0 : 1,
          transition: "opacity 1s ease",
        }}>
          <AsciiArt src="/ascii-source.jpg" color="#ffffff" animationDuration={0.8} />
        </div>

        {/* Spinning icon */}
        <img
          src="/icons/icon_16.svg"
          alt=""
          style={{
            position: "absolute",
            top: phase === "estelle" || phase === "out" ? "38%" : "50%",
            left: "50%",
            width: "clamp(80px, 12vw, 140px)",
            height: "clamp(80px, 12vw, 140px)",
            filter: "invert(1)",
            transformOrigin: "center center",
            animation: phase === "spinning"
              ? "spin-once 1s cubic-bezier(0.4,0,0.2,1) forwards"
              : "icon-idle 0s forwards",
            opacity: phase === "binary" ? 0 : phase === "out" ? 0 : 1,
            transition: "opacity 0.4s ease, top 0.6s ease",
          }}
        />

        {/* ESTELLE */}
        <div style={{
          position: "absolute",
          bottom: "28%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: phase === "estelle" ? 1 : 0,
          animation: phase === "estelle" ? "estelle-in 0.8s cubic-bezier(0.2,0,0,1) forwards" : "none",
          transition: phase === "estelle" ? "none" : "opacity 0.3s ease",
          pointerEvents: "none",
        }}>
          <span style={{
            color: "rgba(245,240,232,0.92)",
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(36px, 8vw, 86px)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontWeight: 400,
          }}>
            ESTELLE
          </span>
        </div>

        {/* Click hint */}
        <div style={{
          position: "absolute",
          bottom: "14%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: phase === "estelle" ? 0.35 : 0,
          transition: "opacity 0.6s ease 0.8s",
          pointerEvents: "none",
        }}>
          <span style={{
            color: "rgba(245,240,232,0.7)",
            fontFamily: "Arial, sans-serif",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}>
            tap to enter
          </span>
        </div>
      </div>
    </>
  );
}
