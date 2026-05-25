import { useState, useCallback, useEffect, useRef } from "react";
import AsciiIntro from "@/components/AsciiIntro";

function HomeIconReact() {
  const [hov, setHov] = useState(false);
  return (
    <a href="/" aria-label="Home"
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ display:"inline-flex",flexDirection:"column",alignItems:"flex-start",textDecoration:"none",gap:"3px",lineHeight:1 }}
    >
      <img src="/icons/icon_16_white.png" alt="" style={{ width:"22px",height:"22px",filter:"none",opacity:hov?0.45:0.9,transition:"opacity 0.25s ease",display:"block" }} />
      <span style={{ fontFamily:"monospace",fontSize:"9px",letterSpacing:"0.12em",color:"rgba(245,240,232,0.75)",opacity:hov?1:0,transition:"opacity 0.25s ease",whiteSpace:"nowrap" }}>home</span>
    </a>
  );
}

const nav = [
  { label: "Portfolio",   href: "/runway" },
  { label: "Collections", href: "/backstage" },
  { label: "Contact",     href: "/about" },
];

const carousel = [
  { src: "/slides/home/11.jpg",         label: "Runway",        href: "/runway" },
  { src: "/slides/home/01.jpg",         label: "Backstage",     href: "/backstage" },
  { src: "/slides/home/05.jpg",         label: "Campaigns",     href: "/campaigns" },
  { src: "/art/bbc-illustrations.jpg",  label: "Graphic Design",href: "/graphic-design" },
  { src: "/slides/home/14.jpg",         label: "Play",          href: "/graphic-design" },
];

function CornerMarkers({ color = "rgba(245,240,232,0.45)", size = 14, weight = 1.5 }) {
  const s = `${size}px`;
  return (
    <>
      {[
        { top:0,left:0,    borderTop:`${weight}px solid ${color}`,borderLeft:`${weight}px solid ${color}` },
        { top:0,right:0,   borderTop:`${weight}px solid ${color}`,borderRight:`${weight}px solid ${color}` },
        { bottom:0,left:0, borderBottom:`${weight}px solid ${color}`,borderLeft:`${weight}px solid ${color}` },
        { bottom:0,right:0,borderBottom:`${weight}px solid ${color}`,borderRight:`${weight}px solid ${color}` },
      ].map((c,i) => <div key={i} style={{ position:"absolute",width:s,height:s,...c,zIndex:3 }} />)}
    </>
  );
}

function MonoLabel({ children, dim=false, color="inherit" }: { children: React.ReactNode; dim?: boolean; color?: string }) {
  return (
    <span style={{ fontFamily:"monospace",fontSize:"9px",letterSpacing:"0.08em",opacity:dim?0.35:0.7,color,lineHeight:1.6 }}>
      {children}
    </span>
  );
}

export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("intro_seen");
  });
  const [active,    setActive]    = useState(0);
  const [scanPos,   setScanPos]   = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const prev = useCallback(() => { setActive(i => (i - 1 + carousel.length) % carousel.length); if (navigator.vibrate) navigator.vibrate(8); }, []);
  const next = useCallback(() => { setActive(i => (i + 1) % carousel.length); if (navigator.vibrate) navigator.vibrate(8); }, []);

  // Touch swipe for iOS carousel
  const touchStartX = useRef(0);
  const onTouchStart = useCallback((e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
  }, [next, prev]);

  useEffect(() => {
    const id = setInterval(() => setScanPos(p => (p + 0.4) % 100), 16);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const cream = "#f0ede6";
  const ink   = "#0d0d0d";

  return (
    <>
      {showIntro && <AsciiIntro onDone={() => { sessionStorage.setItem("intro_seen", "1"); setShowIntro(false); }} />}

      <div style={{ opacity: showIntro ? 0 : 1, transition: "opacity 0.6s ease" }}>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* HERO SECTION                                                       */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section style={{ height:"100dvh", position:"relative", overflow:"hidden", background:"#0a0806" }}>

          {/* ── Blurred mirror-fill layer (edges at wide viewports) ── */}
          <div style={{
            position:"absolute", inset:"-5%",
            backgroundImage:"url(/slides/home/hero.jpg)",
            backgroundSize:"cover",
            backgroundPosition:"center 12%",
            filter:"blur(28px) brightness(0.48) grayscale(30%)",
            transform:"scale(1.1)",
            transformOrigin:"center",
            zIndex:0,
          }}/>

          {/* ── Sharp main image ── */}
          <img src="/slides/home/hero.jpg" alt="" draggable={false} className="hero-img" style={{
            position:"absolute",inset:0,width:"100%",height:"100%",
            objectFit:"cover",objectPosition:"center 12%",
            filter:"grayscale(15%) brightness(0.62) contrast(1.12)",
            imageRendering:"high-quality" as any,
            zIndex:0,
          }}/>

          {/* Orange glow — left side */}
          <div style={{
            position:"absolute",inset:0,zIndex:1,
            background:"radial-gradient(ellipse 55% 70% at 0% 58%, rgba(155,45,10,0.52) 0%, transparent 65%)",
          }}/>

          {/* Dark vignette */}
          <div style={{
            position:"absolute",inset:0,zIndex:1,
            background:"linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.0) 38%, rgba(0,0,0,0.0) 55%, rgba(0,0,0,0.72) 100%)",
          }}/>

          {/* Film grain — fixed 1920×1080 tile so density never changes with viewport */}
          <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",zIndex:2,pointerEvents:"none",opacity:0.3 }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <filter id="g" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="0.0038" numOctaves="4" stitchTiles="stitch"/>
              <feColorMatrix type="saturate" values="0"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#g)" opacity="0.22"/>
          </svg>

          {/* ── Nav ── */}
          <nav className="hero-nav" style={{ position:"absolute",top:0,left:0,right:0,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"26px 40px",zIndex:10 }}>
            <HomeIconReact />
            <div style={{ display:"flex",gap:"28px" }}>
              {nav.map(({ label, href }) => (
                <a key={label} href={href} style={{ color:"rgba(245,240,232,0.42)",textDecoration:"none",fontFamily:"Arial, sans-serif",fontSize:"8px",letterSpacing:"0.22em",textTransform:"uppercase",transition:"color 0.25s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="rgba(245,240,232,0.95)")}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(245,240,232,0.42)")}
                >{label}</a>
              ))}
            </div>
          </nav>

          {/* ── Big centered "ESTELLE" ── */}
          <div className="hero-text-block" style={{
            position:"absolute",
            top:"24%",
            left:0,right:0,
            display:"flex",flexDirection:"column",alignItems:"center",
            zIndex:10,pointerEvents:"none",textAlign:"center",
            padding:"0 20px",
          }}>
            <h1 className="hero-title" style={{
              fontFamily:"'Bodoni Moda', serif",
              fontSize:"clamp(42px, 4.8vw, 72px)",
              fontWeight:400,
              letterSpacing:"0.16em",
              color:"rgba(245,240,232,0.96)",
              margin:0,lineHeight:1,
              textTransform:"uppercase",
              width:"100%",
              textAlign:"center",
            }}>
              ESTELLE
            </h1>
            <p style={{
              fontFamily:"Arial, sans-serif",
              fontSize:"clamp(7px, 0.85vw, 10px)",
              letterSpacing:"0.3em",
              textTransform:"uppercase",
              color:"rgba(245,240,232,0.35)",
              margin:"18px 0 0",lineHeight:1,
            }}>
<a href="/runway" style={{ color:"inherit",textDecoration:"none",borderBottom:"1px solid rgba(245,240,232,0.2)",paddingBottom:"1px",transition:"border-color 0.2s" }}
                onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(245,240,232,0.7)")}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(245,240,232,0.2)")}
              >Analog Fashion Photography &nbsp;/&nbsp; Runway &nbsp;/&nbsp; Backstage</a>
            </p>
          </div>

          {/* ── Carousel — bottom, centered, equal-width ── */}
          <div className="hero-carousel" style={{
            position:"absolute",
            bottom:"48px",
            left:0,
            right:0,
            padding:"0 clamp(12px, 4vw, 48px)",
            zIndex:10,
          }}>
            {/* Thumbnails row */}
            <div className="hero-carousel-track" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ display:"flex",gap:"6px",alignItems:"stretch" }}>

              {/* Prev arrow — desktop only */}
              <button onClick={prev} className="carousel-arrow" style={{ background:"none",border:"none",color:"rgba(245,240,232,0.3)",fontSize:"20px",cursor:"pointer",padding:"0 6px",lineHeight:1,flexShrink:0,alignSelf:"center",transition:"color 0.2s" }}
                onMouseEnter={e=>(e.currentTarget.style.color="rgba(245,240,232,0.9)")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(245,240,232,0.3)")}
              >‹</button>

              {/* Equal-width thumbnails */}
              {carousel.map((item,i) => {
                const isActive = i === active;
                return (
                  <a key={i} href={item.href}
                    onMouseEnter={()=>setActive(i)}
                    className={`hero-carousel-item ${isActive ? "hero-carousel-active" : "hero-carousel-inactive"}`}
                    style={{
                      flex: isActive ? "2 0 0" : "1 0 0",minWidth:0,
                      display:"block",position:"relative",overflow:"hidden",
                      aspectRatio:"4/5",
                      maxHeight:"clamp(160px, 26vh, 240px)",
                      textDecoration:"none",
                      outline: isActive ? "1px solid rgba(245,240,232,0.28)" : "1px solid transparent",
                      transition:"flex 0.55s cubic-bezier(0.4,0,0.2,1), outline 0.3s ease",
                    }}
                  >
                    <img src={item.src} alt={item.label} draggable={false} loading="lazy" style={{
                      position:"absolute",inset:0,width:"100%",height:"100%",
                      objectFit:"cover",objectPosition:"center center",
                      filter: isActive ? "grayscale(0%) brightness(0.88)" : "grayscale(100%) brightness(0.42)",
                      transition:"filter 0.6s ease",
                    }}/>
                    {/* Active label */}
                    <div style={{
                      position:"absolute",bottom:0,left:0,right:0,
                      padding:"18px 10px 10px",
                      background:"linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 100%)",
                      opacity:isActive?1:0,transition:"opacity 0.4s ease",
                    }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                        <span style={{ color:"rgba(245,240,232,0.92)",fontFamily:"Arial, sans-serif",fontSize:"7px",letterSpacing:"0.22em",textTransform:"uppercase" }}>
                          {item.label}
                        </span>
                        <span style={{ color:"rgba(245,240,232,0.55)",fontSize:"9px" }}>→</span>
                      </div>
                    </div>
                  </a>
                );
              })}

              {/* Next arrow — desktop only */}
              <button onClick={next} className="carousel-arrow" style={{ background:"none",border:"none",color:"rgba(245,240,232,0.3)",fontSize:"20px",cursor:"pointer",padding:"0 6px",lineHeight:1,flexShrink:0,alignSelf:"center",transition:"color 0.2s" }}
                onMouseEnter={e=>(e.currentTarget.style.color="rgba(245,240,232,0.9)")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(245,240,232,0.3)")}
              >›</button>

            </div>

            {/* Dots */}
            <div style={{ display:"flex",justifyContent:"center",gap:"5px",marginTop:"12px" }}>
              {carousel.map((_,i)=>(
                <button key={i} onClick={()=>setActive(i)} style={{
                  width:i===active?"18px":"4px",height:"4px",borderRadius:"2px",
                  background:i===active?"rgba(245,240,232,0.6)":"rgba(245,240,232,0.2)",
                  border:"none",padding:0,cursor:"pointer",transition:"all 0.3s ease",
                }}/>
              ))}
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SCROLL SECTION                                                     */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section style={{ display:"flex",background:ink,minHeight:"100vh" }} className="scroll-section">

          {/* ── LEFT: sticky image ── */}
          <div style={{ width:"42%",position:"sticky",top:0,height:"100vh",alignSelf:"flex-start",flexShrink:0,padding:"40px 0 40px 40px",display:"flex",flexDirection:"column",justifyContent:"center",gap:"16px" }} className="scroll-left">
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingRight:"32px" }}>
              <MonoLabel color={cream}>ES_ARCHIVE / 001</MonoLabel>
              <MonoLabel dim color={cream}>BBC · SS25</MonoLabel>
            </div>
            <div style={{ position:"relative",flex:1,overflow:"hidden",maxHeight:"calc(100vh - 140px)" }}>
              <CornerMarkers color="rgba(245,240,232,0.4)" size={16}/>
              <img src="/slides/home/scroll-left.jpg" alt="Campaign" draggable={false} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 10%",display:"block",filter:"brightness(0.92)" }}/>
              <div style={{ position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%) rotate(180deg)",writingMode:"vertical-rl",color:"rgba(245,240,232,0.18)",fontFamily:"monospace",fontSize:"7px",letterSpacing:"0.18em" }}>
                ESTELLE SWEENEY — FASHION PHOTOGRAPHY — NYC
              </div>
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",paddingRight:"32px" }}>
              <MonoLabel dim color={cream}>40.7128°N 74.0060°W</MonoLabel>
              <MonoLabel dim color={cream}>35mm / PORTRA 400</MonoLabel>
            </div>
          </div>

          {/* ── RIGHT: scrolling modules ── */}
          <div style={{ flex:1,display:"flex",flexDirection:"column" }}>

            {/* Module 1 — VIDEO */}
            <div style={{ background:ink,padding:"48px 40px 48px 32px",borderLeft:"1px solid rgba(245,240,232,0.07)" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px" }}>
                <MonoLabel color={cream}>REEL_001 / LOOP</MonoLabel>
                <div style={{ display:"flex",gap:"6px",alignItems:"center" }}>
                  <div style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#E8251A",animation:"pulse 2s ease-in-out infinite" }}/>
                  <MonoLabel dim color={cream}>LIVE</MonoLabel>
                </div>
              </div>
              <div style={{ position:"relative",overflow:"hidden",border:"1px solid rgba(245,240,232,0.15)" }}>
                <CornerMarkers color="rgba(245,240,232,0.5)" size={18}/>
                <video ref={videoRef} src="/video/reel.mp4" autoPlay muted loop playsInline style={{ width:"100%",display:"block",objectFit:"cover",aspectRatio:"4/5" }}/>
                <div style={{ position:"absolute",left:0,right:0,height:"1px",top:`${scanPos}%`,background:"linear-gradient(to right,transparent,rgba(245,240,232,0.18),transparent)",pointerEvents:"none",zIndex:2 }}/>
                <div style={{ position:"absolute",inset:0,zIndex:1,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(245,240,232,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,240,232,0.03) 1px,transparent 1px)",backgroundSize:"40px 40px" }}/>
                <div style={{ position:"absolute",top:"10px",left:"14px",zIndex:3 }}><MonoLabel color={cream}>REC ●</MonoLabel></div>
                <div style={{ position:"absolute",bottom:"10px",right:"14px",zIndex:3 }}><MonoLabel dim color={cream}>1080p · 24fps</MonoLabel></div>
              </div>
              <div style={{ display:"flex",justifyContent:"space-between",marginTop:"16px" }}>
                <MonoLabel dim color={cream}>NYC FW DOCUMENTATION</MonoLabel>
                <MonoLabel dim color={cream}>2025–26</MonoLabel>
              </div>
            </div>

            {/* Module 2 — STATS */}
            <div style={{ background:cream,padding:"48px 40px 48px 32px",borderLeft:"1px solid rgba(13,13,13,0.1)" }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1px",border:"1px solid rgba(13,13,13,0.1)" }}>
                {[["FORMAT","35MM ANALOG FILM"],["STOCK","PORTRA 400 / 800"],["COVERAGE","RUNWAY + BACKSTAGE"],["DELIVERY","72H TURNAROUND"],["CLIENTS","KS · CDG · BBC · PUMA"],["SEASON","SS / AW 2025–26"]].map(([k,v],i)=>(
                  <div key={i} style={{ padding:"20px 16px",borderRight:i%2===0?"1px solid rgba(13,13,13,0.08)":"none",borderBottom:i<4?"1px solid rgba(13,13,13,0.08)":"none" }}>
                    <div style={{ fontFamily:"monospace",fontSize:"7px",letterSpacing:"0.18em",color:"rgba(13,13,13,0.35)",marginBottom:"6px" }}>{k}</div>
                    <div style={{ fontFamily:"monospace",fontSize:"10px",letterSpacing:"0.08em",color:ink,fontWeight:600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Module 3 — CONTACT SHEET */}
            <div style={{ background:"#111",padding:"48px 40px 48px 32px",borderLeft:"1px solid rgba(245,240,232,0.07)" }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"20px" }}>
                <MonoLabel color={cream}>CONTACT SHEET / 001–004</MonoLabel>
                <MonoLabel dim color={cream}>ARCHIVE</MonoLabel>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3px" }}>
                {["/slides/home/02.jpg","/slides/home/03.jpg","/slides/home/09.jpg","/slides/home/13.jpg"].map((src,i)=>(
                  <a key={i} href="/runway" style={{ display:"block",position:"relative",overflow:"hidden",aspectRatio:"4/5",textDecoration:"none" }}>
                    <img src={src} alt="" draggable={false} loading="lazy" style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 15%",filter:"grayscale(100%) brightness(0.75)",transition:"filter 0.6s ease" }}
                      onMouseEnter={e=>(e.currentTarget.style.filter="grayscale(0%) brightness(0.88)")}
                      onMouseLeave={e=>(e.currentTarget.style.filter="grayscale(100%) brightness(0.75)")}
                    />
                    <div style={{ position:"absolute",top:"8px",left:"8px" }}><MonoLabel color={cream}>0{i+1}</MonoLabel></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Module 4 — CTA */}
            <div style={{ background:cream,padding:"64px 40px 64px 32px",borderLeft:"1px solid rgba(13,13,13,0.1)" }}>
              <div style={{ display:"flex",flexDirection:"column",gap:"24px" }}>
                <div>
                  <div style={{ fontFamily:"monospace",fontSize:"7px",letterSpacing:"0.22em",color:"rgba(13,13,13,0.35)",marginBottom:"12px" }}>PROJECT INQUIRIES</div>
                  <h2 style={{ fontFamily:"'Bodoni Moda', serif",fontSize:"clamp(28px,3.5vw,48px)",fontWeight:400,letterSpacing:"0.02em",color:ink,margin:0,lineHeight:1.1 }}>
                    Let's document<br/>your collection.
                  </h2>
                </div>
                <div style={{ display:"flex",gap:"16px",flexWrap:"wrap" }}>
                  {[["View Portfolio","/runway"],["Get in Touch","/about"]].map(([lbl,href])=>(
                    <a key={lbl} href={href} style={{ fontFamily:"Arial, sans-serif",fontSize:"8px",letterSpacing:"0.22em",textTransform:"uppercase",color:ink,textDecoration:"none",padding:"11px 22px",border:"1px solid rgba(13,13,13,0.25)",transition:"all 0.25s" }}
                      onMouseEnter={e=>{e.currentTarget.style.background=ink;e.currentTarget.style.color=cream;}}
                      onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=ink;}}
                    >{lbl}</a>
                  ))}
                </div>
                <div style={{ paddingTop:"24px",borderTop:"1px solid rgba(13,13,13,0.1)",display:"flex",justifyContent:"space-between" }}>
                  <MonoLabel dim>INFO@ESTELLESWEENEY.COM</MonoLabel>
                  <MonoLabel dim>IG @ESTELLESWEENEY_</MonoLabel>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media (max-width: 768px) {
          .scroll-section { flex-direction: column !important; }
          .scroll-left { width:100% !important; position:relative !important; height:70vw !important; padding:20px !important; }
        }
        @supports (-webkit-touch-callout: none) {
          section:first-child { height: 100svh !important; }
          .hero-img { object-fit: contain !important; object-position: center center !important; background: #080808; }
          .hero-nav { padding: 20px 18px !important; }
          .hero-carousel { bottom: 16px !important; padding: 0 !important; }
          .hero-carousel-track { gap: 2px !important; }
          .hero-carousel-item { aspect-ratio: 2/3 !important; max-height: none !important; }
          .carousel-arrow { display: none !important; }
          .hero-text-block {
            padding: 0 !important;
            width: 100vw !important;
            left: 0 !important;
            right: 0 !important;
          }
          .hero-title {
            font-size: 13vw !important;
            letter-spacing: 0.06em !important;
            width: 100vw !important;
            text-align: center !important;
          }
        }
      `}</style>
    </>
  );
}
