import { useEffect, useRef, useState } from "react";

interface Props {
  onDone: () => void;
}

showClick.current = phase === "vortex";

      // Fade click label alpha
      const targetAlpha = showClick.current ? 1 : 0;
      const fadeSpeed = targetAlpha > clickAlpha.current ? 0.25 : 0.12;
      clickAlpha.current += (targetAlpha - clickAlpha.current) * fadeSpeed;

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
