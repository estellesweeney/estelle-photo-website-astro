import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const firstMove = useRef(true);
  const raf = useRef<number>();
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (firstMove.current) {
        smoothPos.current = { x: e.clientX, y: e.clientY };
        firstMove.current = false;
      }
      if (!visible) setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    const onEnterLink = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role=button]")) setHovering(true);
    };
    const onLeaveLink = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("a, button, [role=button]")) setHovering(false);
    };

    const onLeaveWindow = () => setVisible(false);
    const onEnterWindow = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnterLink);
    document.addEventListener("mouseout", onLeaveLink);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    const loop = () => {
      const ease = 0.28;
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * ease;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px)`;
      }

      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnterLink);
      document.removeEventListener("mouseout", onLeaveLink);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const size = hovering ? 34 : clicking ? 20 : 26;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: `-${size / 2}px`,
        marginTop: `-${size / 2}px`,
        pointerEvents: "none",
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease, opacity 0.3s ease",
        mixBlendMode: "difference",
      }}
    >
      <img
        src="/icons/icon_16.svg"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          filter: "invert(1)",
          transform: clicking ? "rotate(30deg) scale(0.85)" : "rotate(0deg) scale(1)",
          transition: "transform 0.15s ease",
          display: "block",
        }}
      />
    </div>
  );
}
