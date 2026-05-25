import { useEffect, useRef, useState } from "react";

interface Props {
  onDone: () => void;
}

const GLYPH: Record<string, number[][]> = {
  E: [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  S: [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],
  T: [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  L: [[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
};

const WORD = "ESTELLE";
const GLYPH_ROWS = 7;
const GLYPH_COLS = 5;

export default function AsciiIntro({ onDone }: Props) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const phaseRef     = useRef<"vortex" | "spelling" | "out">("vortex");
  const mouseRef     = useRef({ x: -999, y: -999 });
  const histRef      = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const clickAlpha   = useRef(0);
  const spellStartMs = useRef(0);
  const [uiPhase, setUiPhase] = useState<"vortex" | "spelling" | "out">("vortex");
  const onDoneRef    = useRef(onDone);
  const isTouch      = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // On mobile: font size must be small enough that ESTELLE (7 letters × 5 cols + gaps)
    // fits within COLS at scale=1. We need COLS ≥ 41, so CW ≤ W/41, so FS ≤ W/(41×0.62)
    const isMobile = W < 768;
    const maxFSForFit = W / (41 * 0.62); // guarantees ESTELLE fits at scale=1
    const FS = isMobile
      ? Math.min(maxFSForFit, Math.max(10, W / 28))   // readable but guaranteed to fit
      : Math.max(9, Math.min(13, W / 90));
    const CW   = FS * 0.62;
    const CH   = FS * 1.35;
    const COLS = Math.ceil(W / CW) + 2;
    const ROWS = Math.ceil(H / CH) + 2;

    const chars     = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => (Math.random() < 0.5 ? "0" : "1"))
    );
    const litCell   = Array.from({ length: ROWS }, () => new Uint8Array(COLS));
    // lockDelay[r][c] = ms after spellStart when this cell locks in (0–2800ms, left-to-right stagger)
    const lockDelay = Array.from({ length: ROWS }, () => new Float32Array(COLS).fill(9999));

    // Scale must fit both height AND width
    let scale = Math.max(1, Math.floor((ROWS * 0.55) / GLYPH_ROWS));
    // Shrink scale until ESTELLE fits horizontally
    while (scale > 1) {
      const testGAP = Math.max(1, Math.floor(scale * 0.7));
      const testW   = WORD.length * GLYPH_COLS * scale + (WORD.length - 1) * testGAP;
      if (testW <= COLS * 0.94) break;
      scale--;
    }
    const LW      = GLYPH_COLS * scale;
    // Safety net: if even scale=1 is too wide, reduce gap to 0
    let GAP       = Math.max(1, Math.floor(scale * 0.7));
    if (WORD.length * LW + (WORD.length - 1) * GAP > COLS * 0.96) GAP = 0;
    const totalW  = WORD.length * LW + (WORD.length - 1) * GAP;
    // Center using actual canvas pixel dimensions, not padded grid
    const originC = Math.round((W / CW - totalW) / 2);
    const originR = Math.round((H / CH - GLYPH_ROWS * scale) / 2);

    for (let li = 0; li < WORD.length; li++) {
      const glyph = GLYPH[WORD[li]];
      const lc0   = originC + li * (LW + GAP);
      for (let gr = 0; gr < GLYPH_ROWS; gr++)
        for (let gc = 0; gc < GLYPH_COLS; gc++) {
          const lit = glyph[gr][gc] === 1;
          for (let sr = 0; sr < scale; sr++)
            for (let sc = 0; sc < scale; sc++) {
              const r = originR + gr * scale + sr;
              const c = lc0 + gc * scale + sc;
              if (r >= 0 && r < ROWS && c >= 0 && c < COLS)
                litCell[r][c] = lit ? 1 : 0;
            }
        }
    }

    // Assign lock delays: stagger left-to-right across letters (0–2800ms) + small jitter
    if (isTouch) {
      for (let li = 0; li < WORD.length; li++) {
        const lc0 = originC + li * (LW + GAP);
        const baseDelay = (li / (WORD.length - 1)) * 4200; // 0 to 4200ms (5s total)
        for (let r = 0; r < ROWS; r++) {
          for (let c = lc0; c < lc0 + LW; c++) {
            if (c >= 0 && c < COLS && litCell[r][c] === 1) {
              lockDelay[r][c] = baseDelay + Math.random() * 600;
            }
          }
        }
      }
    }

    // Preload icon for canvas rendering
    const iconImg = new Image();
    iconImg.src = "/icons/icon_16_white.png";

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      mouseRef.current = { x: e.clientX, y: e.clientY };
      histRef.current.push({ x: e.clientX, y: e.clientY, t: now });
      const cutoff = now - 300;
      let i = 0;
      while (i < histRef.current.length && histRef.current[i].t < cutoff) i++;
      if (i > 0) histRef.current.splice(0, i);
    };
    window.addEventListener("mousemove", onMouseMove);

    const scrollOffsets = new Float32Array(ROWS);
    let tick  = 0;
    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FS}px monospace`;
      ctx.textBaseline = "top";

      tick++;
      const phase = phaseRef.current;
      const cx = COLS / 2;
      const cr = ROWS / 2;

      // show "click" the whole time during vortex
      const showClick = phase === "vortex";
      const targetAlpha = showClick ? 1 : 0;
      const fadeSpeed = targetAlpha > clickAlpha.current ? 0.25 : 0.12;
      clickAlpha.current += (targetAlpha - clickAlpha.current) * fadeSpeed;

      for (let r = 0; r < ROWS; r++) {
        const dy  = (r - cr) / cr;
        const spd = 0.18 * (1 - Math.abs(dy) * 0.4);
        scrollOffsets[r] += spd * (dy < 0 ? 1 : -1);
      }

      for (let r = 0; r < ROWS; r++) {
        const dy        = (r - cr) / cr;
        const rawOffset = scrollOffsets[r];

        for (let c = 0; c < COLS; c++) {
          const srcC = ((Math.round(c + rawOffset) % COLS) + COLS) % COLS;
          let ch: string;
          let alpha: number;

          if (phase === "vortex") {
            ch = chars[r][srcC];
            if (Math.random() < 0.018) chars[r][srcC] = ch === "0" ? "1" : "0";
            const dx    = (c - cx) / cx;
            const dist  = Math.sqrt(dx * dx + dy * dy) / Math.SQRT2;
            const angle = Math.atan2(dy, dx);
            const wave  = Math.sin(angle * 4 - tick * 0.06 + dist * 10);
            alpha = Math.max(0.03, 0.04 + Math.max(0, wave) * 0.42 * (1 - dist * 0.55));
          } else {
            const isLit = litCell[r][c] === 1;
            ch = chars[r][c];
            if (isLit) {
              const elapsed = Date.now() - spellStartMs.current;
              const locked  = !isTouch || elapsed >= lockDelay[r][c];
              if (locked) {
                // Snapped in — flash bright on lock, then steady
                const justLocked = (Date.now() - spellStartMs.current) - lockDelay[r][c];
                const flashBoost = justLocked < 120 ? (1 - justLocked / 120) * 0.5 : 0;
                if (Math.random() < 0.02) chars[r][c] = ch === "0" ? "1" : "0";
                alpha = 0.75 + flashBoost + Math.sin(tick * 0.09 + c * 0.3) * 0.1;
              } else {
                // Slow deliberate scramble — clicks every ~8 frames
                if (Math.random() < 0.08) chars[r][c] = ch === "0" ? "1" : "0";
                alpha = 0.12 + Math.random() * 0.22;
              }
            } else {
              if (Math.random() < 0.012) chars[r][c] = ch === "0" ? "1" : "0";
              alpha = 0.025 + Math.random() * 0.01;
            }
          }

          ctx.fillStyle = `rgba(245,240,232,${alpha.toFixed(3)})`;
          ctx.fillText(ch, c * CW, r * CH);
        }
      }

      // ── Star icon + tap prompt at vortex center (touch devices) ──────────
      if (phase === "vortex" && isTouch && tick > 30) {
        const fadeIn  = Math.min(1, (tick - 30) / 60);
        const pulse   = 1 + Math.sin(tick * 0.07) * 0.08;
        const iconSize = Math.min(W, H) * 0.14 * pulse;
        const cx2 = W / 2, cy2 = H / 2;

        ctx.save();

        // Warm glow behind icon
        const glow = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, iconSize * 2.2);
        glow.addColorStop(0,   `rgba(180,60,10,${(0.35 * fadeIn).toFixed(2)})`);
        glow.addColorStop(0.5, `rgba(100,30,5,${(0.18 * fadeIn).toFixed(2)})`);
        glow.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);

        // Icon
        if (iconImg.complete) {
          ctx.globalAlpha = 0.88 * fadeIn;
          ctx.drawImage(iconImg, cx2 - iconSize / 2, cy2 - iconSize / 1.6, iconSize, iconSize);
          ctx.globalAlpha = 1;
        }

        // "✦ tap me! ✦" in binary-style monospace
        const textAlpha = Math.min(1, (tick - 60) / 40) * fadeIn * (0.7 + Math.sin(tick * 0.08) * 0.2);
        if (textAlpha > 0.01) {
          ctx.font = `${FS * 1.1}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = `rgba(245,240,232,${textAlpha.toFixed(3)})`;
          ctx.fillText("✦ tap me! ✦", cx2, cy2 + iconSize * 0.72);
        }

        ctx.restore();
      }

      // draw "click" above cursor (mouse devices)
      if (clickAlpha.current > 0.01 && mouseRef.current.x > 0) {
        ctx.font = `${FS}px monospace`;
        ctx.fillStyle = `rgba(245,240,232,${clickAlpha.current.toFixed(3)})`;
        ctx.textBaseline = "bottom";
        ctx.fillText("click", mouseRef.current.x - FS * 1.5, mouseRef.current.y - 18);
        ctx.textBaseline = "top";
      }

      // draw "tap to enter" at exact center of vortex (fades in after 2s)
      if (phase === "vortex" && tick > 120) {
        const fadeIn = Math.min(1, (tick - 120) / 40);
        const pulse  = 0.45 + Math.sin(tick * 0.06) * 0.2;
        const a      = (fadeIn * pulse).toFixed(3);
        ctx.save();
        ctx.font = `${FS}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(245,240,232,${a})`;
        ctx.fillText("tap to enter", W / 2, H / 2);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const exit = () => {
    if (phaseRef.current === "out") return;
    phaseRef.current = "out";
    setUiPhase("out");
    setTimeout(() => onDoneRef.current(), 700);
  };

  const handleClick = () => {
    if (phaseRef.current === "vortex") {
      phaseRef.current = "spelling";
      setUiPhase("spelling");
      spellStartMs.current = Date.now();
      // Auto-exit: 3s scramble + 1.5s to read = 4.5s, or tap to skip
      // On touch: hold ESTELLE until tapped. On desktop: auto-exit after 9s.
      if (!isTouch) setTimeout(() => exit(), 9000);
    } else if (phaseRef.current === "spelling") {
      exit();
    }
  };

  return (
    <>
      <style>{`
        @keyframes tap-pulse {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.9; transform: translateX(-50%) scale(1.06); }
        }
      `}</style>
      <div
        onClick={handleClick}
        onTouchEnd={handleClick}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          opacity: uiPhase === "out" ? 0 : 1,
          transition: "opacity 0.7s ease",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%", imageRendering: "pixelated" }}
        />



      </div>
      <style>{`
        @media (pointer: fine) { .tap-circle-wrap { display: none !important; } }
      `}</style>
    </>
  );
}
