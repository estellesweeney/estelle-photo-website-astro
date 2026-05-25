import { useState, useCallback, useEffect, useRef } from "react";
import AsciiIntro from "@/components/AsciiIntro";

// ─── Nav data ─────────────────────────────────────────────────────────────────

const nav = [
  { label: "Home",        href: "/" },
  { label: "Portfolio",   href: "/runway" },
  { label: "Collections", href: "/backstage" },
  { label: "Contact",     href: "/about" },
];

const carousel = [
  { src: "/slides/home/01.jpg",         label: "Runway",        href: "/runway" },
  { src: "/slides/home/11.jpg",         label: "Backstage",     href: "/backstage" },
  { src: "/slides/home/05.jpg",         label: "Campaigns",     href: "/campaigns" },
  { src: "/art/bbc-illustrations.jpg",  label: "Graphic Design",href: "/graphic-design" },
  { src: "/slides/home/14.jpg",         label: "Archive",       href: "/runway" },
];

// ─── Animated frame corner markers ───────────────────────────────────────────

function CornerMarkers({ color = "rgba(245,240,232,0.5)", size = 14, weight = 1.5 }) {
  const s = `${size}px`;
  const corners = [
    { top: 0, left: 0, borderTop: `${weight}px solid ${color}`, borderLeft: `${weight}px solid ${color}` },
    { top: 0, right: 0, borderTop: `${weight}px solid ${color}`, borderRight: `${weight}px solid ${color}` },
    { bottom: 0, left: 0, borderBottom: `${weight}px solid ${color}`, borderLeft: `${weight}px solid ${color}` },
    { bottom: 0, right: 0, borderBottom: `${weight}px solid ${color}`, borderRight: `${weight}px solid ${color}` },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <div key={i} style={{ position: "absolute", width: s, height: s, ...c, zIndex: 3 }} />
      ))}
    </>
  );
}

// ─── Mono label ───────────────────────────────────────────────────────────────

function MonoLabel({ children, dim = false, color = "inherit" }: { children: React.ReactNode; dim?: boolean; color?: string }) {
  return (
    <span style={{
      fontFamily: "monospace",
      fontSize: "9px",
      letterSpacing: "0.08em",
      opacity: dim ? 0.35 : 0.7,
      color,
      lineHeight: 1.6,
    }}>
      {children}
    </span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(true);
  const [hovered,   setHovered]   = useState(false);
  const [active,    setActive]    = useState(0);
  const [scanPos,   setScanPos]   = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const prev = useCallback(() => setActive(i => (i - 1 + carousel.length) % carousel.length), []);
  const next = useCallback(() => setActive(i => (i + 1) % carousel.length), []);

  // Scan line animation for video frame
  useEffect(() => {
    const id = setInterval(() => setScanPos(p => (p + 0.4) % 100), 16);
    return () => clearInterval(id);
  }, []);

  // Ensure video plays
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const cream = "#f0ede6";
  const ink   = "#0d0d0d";

  return (
    <>
      {showIntro && <AsciiIntro onDone={() => setShowIntro(false)} />}

      <div style={{ opacity: showIntro ? 0 : 1, transition: "opacity 0.6s ease" }}>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* HERO SECTION                                                       */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section
          style={{ height: "100dvh", position: "relative", overflow: "hidden", background: "#080808" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Hero image */}
          <img src="/slides/home/hero.jpg" alt="" draggable={false} style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 15%",
            filter: hovered
              ? "grayscale(0%) brightness(0.72) sepia(22%) saturate(1.3) contrast(1.08)"
              : "grayscale(100%) brightness(0.6) contrast(1.18)",
            transition: "filter 1.2s cubic-bezier(0.25,0.1,0.25,1)",
          }} />

          {/* Gradient */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: hovered
              ? "linear-gradient(105deg, rgba(120,35,10,0.5) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.7) 100%)"
              : "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 100%)",
            transition: "background 1.2s ease",
          }} />

          {/* Film grain */}
          <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",zIndex:2,pointerEvents:"none",opacity:0.28 }} xmlns="http://www.w3.org/2000/svg">
            <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#grain)" opacity="0.18"/>
          </svg>

          {/* Nav */}
          <nav style={{ position:"absolute",top:0,left:0,right:0,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"24px 40px",zIndex:10 }}>
            <a href="/" style={{ color:"rgba(245,240,232,0.88)",textDecoration:"none",fontFamily:"'Bodoni Moda', serif",fontSize:"13px",letterSpacing:"0.2em",textTransform:"uppercase" }}>Estelle Sweeney</a>
            <div style={{ display:"flex",gap:"28px" }}>
              {nav.map(({ label, href }) => (
                <a key={label} href={href} style={{ color:"rgba(245,240,232,0.42)",textDecoration:"none",fontFamily:"Arial, sans-serif",fontSize:"8px",letterSpacing:"0.22em",textTransform:"uppercase",transition:"color 0.25s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="rgba(245,240,232,0.95)")}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(245,240,232,0.42)")}
                >{label}</a>
              ))}
            </div>
          </nav>

          {/* Subtitle */}
          <div style={{ position:"absolute",top:"72px",left:0,right:0,display:"flex",justifyContent:"center",zIndex:10,pointerEvents:"none" }}>
            <span style={{ fontFamily:"Arial, sans-serif",fontSize:"7px",letterSpacing:"0.3em",textTransform:"uppercase",color:"rgba(245,240,232,0.28)" }}>
              Analog Fashion Photography &nbsp;/&nbsp; Runway &nbsp;/&nbsp; Backstage
            </span>
          </div>

          {/* Carousel — full width centered */}
          <div style={{ position:"absolute",top:"50%",left:0,right:0,transform:"translateY(-50%)",zIndex:10 }}>
            <div style={{ display:"flex",width:"100%",gap:"3px" }}>
              {carousel.map((item, i) => {
                const isActive = i === active;
                return (
                  <a key={i} href={item.href} onMouseEnter={()=>setActive(i)} style={{
                    display:"block", flex: isActive ? "3 0 0" : "1 0 0", minWidth:0,
                    position:"relative", overflow:"hidden", aspectRatio:"1/1",
                    transition:"flex 0.55s cubic-bezier(0.4,0,0.2,1)", textDecoration:"none",
                  }}>
                    <img src={item.src} alt={item.label} draggable={false} loading="lazy" style={{
                      position:"absolute",inset:0,width:"100%",height:"100%",
                      objectFit:"cover",objectPosition:"center 18%",
                      filter: isActive ? "grayscale(0%) brightness(0.88)" : "grayscale(100%) brightness(0.38)",
                      transition:"filter 0.65s ease",
                    }}/>
                    <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"20px 14px 12px",background:"linear-gradient(to top,rgba(0,0,0,0.82) 0%,transparent 100%)",opacity:isActive?1:0,transition:"opacity 0.4s ease" }}>
                      <span style={{ color:"rgba(245,240,232,0.92)",fontFamily:"Arial, sans-serif",fontSize:"8px",letterSpacing:"0.24em",textTransform:"uppercase" }}>{item.label}</span>
                    </div>
                  </a>
                );
              })}
            </div>
            <div style={{ display:"flex",justifyContent:"center",gap:"6px",marginTop:"14px" }}>
              {carousel.map((_,i)=>(
                <button key={i} onClick={()=>setActive(i)} style={{ width:i===active?"18px":"4px",height:"4px",borderRadius:"2px",background:i===active?"rgba(245,240,232,0.65)":"rgba(245,240,232,0.2)",border:"none",padding:0,cursor:"pointer",transition:"all 0.3s ease" }}/>
              ))}
            </div>
          </div>

          {/* Prev/Next */}
          {([["‹","left",prev],["›","right",next]] as const).map(([lbl,side,fn])=>(
            <button key={side} onClick={fn} style={{ position:"absolute",top:"50%",[side]:"12px",transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(245,240,232,0.3)",fontSize:"22px",cursor:"pointer",zIndex:11,lineHeight:1,padding:"8px",transition:"color 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.color="rgba(245,240,232,0.9)")}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(245,240,232,0.3)")}
            >{lbl}</button>
          ))}

          {/* Scroll indicator */}
          <div style={{ position:"absolute",bottom:"28px",left:"50%",transform:"translateX(-50%)",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",gap:"7px",opacity:0.28,pointerEvents:"none" }}>
            <span style={{ fontFamily:"Arial, sans-serif",fontSize:"7px",letterSpacing:"0.3em",textTransform:"uppercase",color:"rgba(245,240,232,1)" }}>Scroll</span>
            <div style={{ width:"1px",height:"28px",background:"linear-gradient(to bottom,rgba(245,240,232,0.6),transparent)" }}/>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SCROLL SECTION — split screen                                      */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section style={{ display:"flex", background: ink, minHeight:"100vh" }} className="scroll-section">

          {/* ── LEFT: sticky image ─────────────────────────────────────────── */}
          <div style={{
            width: "42%",
            position: "sticky",
            top: 0,
            height: "100vh",
            alignSelf: "flex-start",
            flexShrink: 0,
            padding: "40px 0 40px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "16px",
          }} className="scroll-left">
            {/* Top annotation */}
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingRight:"32px" }}>
              <MonoLabel color={cream}>ES_ARCHIVE / 001</MonoLabel>
              <MonoLabel dim color={cream}>BBC · SS25</MonoLabel>
            </div>

            {/* Image with corner markers */}
            <div style={{ position:"relative", flex:1, overflow:"hidden", maxHeight:"calc(100vh - 140px)" }}>
              <CornerMarkers color="rgba(245,240,232,0.4)" size={16} />
              <img
                src="/slides/home/scroll-left.jpg"
                alt="Estelle Sweeney — Campaign"
                draggable={false}
                style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 10%",display:"block",filter:"brightness(0.92)" }}
              />
              {/* Side rule */}
              <div style={{ position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%) rotate(180deg)",writingMode:"vertical-rl",color:"rgba(245,240,232,0.18)",fontFamily:"monospace",fontSize:"7px",letterSpacing:"0.18em" }}>
                ESTELLE SWEENEY — FASHION PHOTOGRAPHY — NYC
              </div>
            </div>

            {/* Bottom annotation */}
            <div style={{ display:"flex",justifyContent:"space-between",paddingRight:"32px" }}>
              <MonoLabel dim color={cream}>40.7128°N 74.0060°W</MonoLabel>
              <MonoLabel dim color={cream}>35mm / PORTRA 400</MonoLabel>
            </div>
          </div>

          {/* ── RIGHT: scrolling modules ────────────────────────────────────── */}
          <div style={{ flex:1, display:"flex", flexDirection:"column" }}>

            {/* Module 1 — VIDEO (dark) */}
            <div style={{ background:ink, padding:"48px 40px 48px 32px", borderLeft:`1px solid rgba(245,240,232,0.07)` }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px" }}>
                <MonoLabel color={cream}>REEL_001 / LOOP</MonoLabel>
                <div style={{ display:"flex",gap:"6px",alignItems:"center" }}>
                  <div style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#E8251A",animation:"pulse 2s ease-in-out infinite" }}/>
                  <MonoLabel dim color={cream}>LIVE</MonoLabel>
                </div>
              </div>

              {/* Animated video frame */}
              <div style={{ position:"relative", overflow:"hidden", border:`1px solid rgba(245,240,232,0.15)` }}>
                <CornerMarkers color="rgba(245,240,232,0.5)" size={18} />

                {/* Video */}
                <video
                  ref={videoRef}
                  src="/video/reel.mp4"
                  autoPlay muted loop playsInline
                  style={{ width:"100%",display:"block",objectFit:"cover",aspectRatio:"16/9" }}
                />

                {/* Scan line */}
                <div style={{
                  position:"absolute", left:0, right:0, height:"1px",
                  top:`${scanPos}%`,
                  background:"linear-gradient(to right,transparent,rgba(245,240,232,0.18),transparent)",
                  pointerEvents:"none", zIndex:2,
                  transition:"top 0.016s linear",
                }}/>

                {/* Grid overlay */}
                <div style={{
                  position:"absolute",inset:0,zIndex:1,pointerEvents:"none",
                  backgroundImage:`
                    linear-gradient(rgba(245,240,232,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(245,240,232,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize:"40px 40px",
                }}/>

                {/* Corner annotations */}
                <div style={{ position:"absolute",top:"10px",left:"14px",zIndex:3 }}>
                  <MonoLabel color={cream}>REC ●</MonoLabel>
                </div>
                <div style={{ position:"absolute",bottom:"10px",right:"14px",zIndex:3 }}>
                  <MonoLabel dim color={cream}>1080p · 24fps</MonoLabel>
                </div>
              </div>

              <div style={{ display:"flex",justifyContent:"space-between",marginTop:"16px" }}>
                <MonoLabel dim color={cream}>NYC FW DOCUMENTATION</MonoLabel>
                <MonoLabel dim color={cream}>2025–26</MonoLabel>
              </div>
            </div>

            {/* Module 2 — TECHNICAL STATS (cream/light) */}
            <div style={{ background:cream, padding:"48px 40px 48px 32px", borderLeft:`1px solid rgba(13,13,13,0.1)` }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", border:`1px solid rgba(13,13,13,0.1)` }}>
                {[
                  ["FORMAT",    "35MM ANALOG FILM"],
                  ["STOCK",     "PORTRA 400 / 800"],
                  ["COVERAGE",  "RUNWAY + BACKSTAGE"],
                  ["DELIVERY",  "72H TURNAROUND"],
                  ["CLIENTS",   "KS · CDG · BBC · PUMA"],
                  ["SEASON",    "SS / AW 2025–26"],
                ].map(([k,v],i)=>(
                  <div key={i} style={{ padding:"20px 16px", borderRight: i%2===0 ? `1px solid rgba(13,13,13,0.08)` : "none", borderBottom: i<4 ? `1px solid rgba(13,13,13,0.08)` : "none" }}>
                    <div style={{ fontFamily:"monospace",fontSize:"7px",letterSpacing:"0.18em",color:"rgba(13,13,13,0.35)",marginBottom:"6px" }}>{k}</div>
                    <div style={{ fontFamily:"monospace",fontSize:"10px",letterSpacing:"0.08em",color:ink,fontWeight:600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Module 3 — IMAGE GRID (dark) */}
            <div style={{ background:"#111", padding:"48px 40px 48px 32px", borderLeft:`1px solid rgba(245,240,232,0.07)` }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"20px" }}>
                <MonoLabel color={cream}>CONTACT SHEET / 001–004</MonoLabel>
                <MonoLabel dim color={cream}>ARCHIVE</MonoLabel>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3px" }}>
                {["/slides/home/02.jpg","/slides/home/03.jpg","/slides/home/09.jpg","/slides/home/13.jpg"].map((src,i)=>(
                  <a key={i} href="/runway" style={{ display:"block",position:"relative",overflow:"hidden",aspectRatio:"4/5",textDecoration:"none" }}>
                    <img src={src} alt="" draggable={false} loading="lazy" style={{
                      position:"absolute",inset:0,width:"100%",height:"100%",
                      objectFit:"cover",objectPosition:"center 15%",
                      filter:"grayscale(100%) brightness(0.75)",
                      transition:"filter 0.6s ease",
                    }}
                      onMouseEnter={e=>(e.currentTarget.style.filter="grayscale(0%) brightness(0.88)")}
                      onMouseLeave={e=>(e.currentTarget.style.filter="grayscale(100%) brightness(0.75)")}
                    />
                    <div style={{ position:"absolute",top:"8px",left:"8px" }}>
                      <MonoLabel color={cream}>0{i+1}</MonoLabel>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Module 4 — CTA (cream) */}
            <div style={{ background:cream, padding:"64px 40px 64px 32px", borderLeft:`1px solid rgba(13,13,13,0.1)` }}>
              <div style={{ display:"flex",flexDirection:"column",gap:"24px" }}>
                <div>
                  <div style={{ fontFamily:"monospace",fontSize:"7px",letterSpacing:"0.22em",color:"rgba(13,13,13,0.35)",marginBottom:"12px" }}>PROJECT INQUIRIES</div>
                  <h2 style={{ fontFamily:"'Bodoni Moda', serif",fontSize:"clamp(28px,3.5vw,48px)",fontWeight:400,letterSpacing:"0.02em",color:ink,margin:0,lineHeight:1.1 }}>
                    Let's document<br/>your collection.
                  </h2>
                </div>
                <div style={{ display:"flex",gap:"16px",flexWrap:"wrap" }}>
                  {[["View Portfolio","/runway"],["Get in Touch","/about"]].map(([lbl,href])=>(
                    <a key={lbl} href={href} style={{ fontFamily:"Arial, sans-serif",fontSize:"8px",letterSpacing:"0.22em",textTransform:"uppercase",color:ink,textDecoration:"none",padding:"11px 22px",border:`1px solid rgba(13,13,13,0.25)`,transition:"all 0.25s" }}
                      onMouseEnter={e=>{e.currentTarget.style.background=ink;e.currentTarget.style.color=cream;}}
                      onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=ink;}}
                    >{lbl}</a>
                  ))}
                </div>
                <div style={{ paddingTop:"24px",borderTop:`1px solid rgba(13,13,13,0.1)`,display:"flex",justifyContent:"space-between" }}>
                  <MonoLabel dim>INFO@ESTELLESWEENEY.COM</MonoLabel>
                  <MonoLabel dim>IG @ESTELLESWEENEY_</MonoLabel>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 768px) {
          .scroll-section { flex-direction: column !important; }
          .scroll-left { width: 100% !important; position: relative !important; height: 60vw !important; padding: 20px !important; }
        }
      `}</style>
    </>
  );
}
