import { useEffect, useRef, useState } from "react";

interface Props {
  onDone: () => void;
}

// ─── Pixel font (7 rows × 5 cols) ────────────────────────────────────────────
const GLYPH: Record<string, number[][]> = {
  E: [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  S: [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],
  T: [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  L: [[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
};

const WORD      = "ESTELLE";
const GLYPH_ROWS = 7;
const GLYPH_COLS = 5;

export default function AsciiIntro({ onDone }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const phaseRef   = useRef<"vortex" | "spelling" | "out">("vortex");
  const mouseRef   = useRef({ x: -999, y: -999 });
  const histRef    = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const showClick  = useRef(false);
  const clickAlpha = useRef(0);
  const [uiPhase, setUiPhase] = useState<"vortex" | "spelling" | "out">("vortex");
  const onDoneRef  = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // ── Grid sizing ──────────────────────────────────────────────────────────
    const FS   = Math.max(9, Math.min(13, W / 90));
    const CW   = FS * 0.62;
    const CH   = FS * 1.35;
    const COLS = Math.ceil(W / CW) + 2;
    const ROWS = Math.ceil(H / CH) + 2;

    // ── Per-cell chars ───────────────────────────────────────────────────────
    const chars   = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => (Math.random() < 0.5 ? "0" : "1"))
    );
    const litCell = Array.from({ length: ROWS }, () => new Uint8Array(COLS));

    // ── ESTELLE positions ─────────────────────────────────────────────────────
    const scale   = Math.max(1, Math.floor((ROWS * 0.55) / GLYPH_ROWS));
    const LW      = GLYPH_COLS * scale;
    const GAP     = Math.max(1, Math.floor(scale * 0.7));
    const totalW  = WORD.length * LW + (WORD.length - 1) * GAP;
    const originC = Math.floor((COLS - totalW) / 2);
    const originR = Math.floor((ROWS - GLYPH_ROWS * scale) / 2);

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

    // ── Mouse tracking ───────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const now = Date.now();
      histRef.current.push({ x: e.clientX, y: e.clientY, t: now });
      // Keep last 700ms
      const cutoff = now - 700;
      let i = 0;
      while (i < histRef.current.length && histRef.current[i].t < cutoff) i++;
      if (i > 0) histRef.current.splice(0, i);
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Row-scroll offsets ───────────────────────────────────────────────────
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

      // ── Show "click" as soon as mouse moves ──────────────────────────────
      const hist = histRef.current;
      const now = Date.now();
      showClick.current = phase === "vortex" && hist.length > 0 && (now - hist[hist.length - 1].t) < 200;

      // Fade click label alpha
      const targetAlpha = showClick.current ? 1 : 0;
      clickAlpha.current += (targetAlpha - clickAlpha.current) * 0.22;

      // ── Vortex scroll ─────────────────────────────────────────────────────
      for (let r = 0; r < ROWS; r++) {
        const dy  = (r - cr) / cr;
        const spd = 0.18 * (1 - Math.abs(dy) * 0.4);
        scrollOffsets[r] += spd * (dy < 0 ? 1 : -1);
      }

      // ── Draw grid ─────────────────────────────────────────────────────────
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
              if (Math.random() < 0.06) chars[r][c] = ch === "0" ? "1" : "0";
              alpha = 0.72 + Math.sin(tick * 0.09 + c * 0.3) * 0.18;
            } else {
              if (Math.random() < 0.012) chars[r][c] = ch === "0" ? "1" : "0";
              alpha = 0.028 + Math.random() * 0.012;
            }
          }

          ctx.fillStyle = `rgba(245,240,232,${alpha.toFixed(3)})`;
          ctx.fillText(ch, c * CW, r * CH);
        }
      }

      // ── Draw "click" above cursor ─────────────────────────────────────────
      if (clickAlpha.current > 0.01 && mouseRef.current.x > 0) {
        const a = clickAlpha.current.toFixed(3);
        ctx.font = `${FS}px monospace`;
        ctx.fillStyle = `rgba(245,240,232,${a})`;
        ctx.textBaseline = "bottom";
        ctx.fillText("click", mouseRef.current.x - FS * 1.5, mouseRef.current.y - 18);
        ctx.textBaseline = "top";
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleClick = () => {
    if (phaseRef.current === "vortex") {
      phaseRef.current = "spelling";
      setUiPhase("spelling");
      setTimeout(() => exit(), 2400);
    } else if (phaseRef.current === "spelling") {
      exit();
    }
  };

  const exit = () => {
    if (phaseRef.current === "out") return;
    phaseRef.current = "out";
    setUiPhase("out");
    setTimeout(() => onDoneRef.current(), 700);
  };

  return (
    <div
      onClick={handleClick}
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
  );
}
