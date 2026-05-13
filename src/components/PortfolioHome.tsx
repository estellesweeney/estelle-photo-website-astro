import HeroSlideshow from "@/components/HeroSlideshow";

const iconNav = [
  { id: "12", label: "RUNWAY",         link: "/runway" },
  { id: "22", label: "CAMPAIGNS",      link: "/campaigns" },
  { id: "17", label: "BACKSTAGE",      link: "/backstage" },
  { id: "31", label: "GRAPHIC DESIGN", link: "#" },
  { id: "16", label: "ABOUT",          link: "#" },
];

const COLORS = [
  "#E63946",
  "#F5A623",
  "#1D4ED8",
  "#F5A623",
  "#E63946",
];

export default function PortfolioHome() {
  return (
    <div className="min-h-screen bg-black text-cream font-sans">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase font-display">Estelle Sweeney</span>
      </nav>

      <main className="flex flex-col gap-0">

        {/* Icon navigation */}
        <section className="grid grid-cols-5 gap-0 pt-8 pb-4">
          {iconNav.map(({ id, label, link }, i) => (
            <a key={id} href={link} className="flex flex-col items-center group">
              <div
                className="w-full aspect-square overflow-hidden transition-opacity group-hover:opacity-80"
                style={{ backgroundColor: COLORS[i] }}
              >
                <img
                  src={`/icons/icon_${id}.svg`}
                  alt={label}
                  className="w-full h-full"
                  style={{ mixBlendMode: "multiply" }}
                  draggable={false}
                />
              </div>
              <span className="text-[9px] tracking-[0.15em] uppercase text-center pt-2 text-white/60" style={{ fontFamily: 'Arial, sans-serif' }}>{label}</span>
            </a>
          ))}
        </section>

        {/* Slideshow — full bleed */}
        <section>
          <HeroSlideshow />
        </section>

        {/* Featured galleries */}
        <section id="work" className="flex flex-col gap-0 pt-8">
          <h2 className="text-xs tracking-[0.25em] uppercase font-display border-b border-white/10 pb-3 px-6 mb-0">Recent Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2">

            <a href="/gallery/billionaire-boys-club" className="group flex flex-col">
              <div className="overflow-hidden w-full">
                <img
                  src="/slides/bbc-hero.jpg"
                  alt="Billionaire Boys Club"
                  className="w-full object-cover transition-opacity duration-700 group-hover:opacity-80"
                />
              </div>
              <div className="flex items-baseline justify-between px-6 py-3 border-b border-white/10">
                <span className="text-xs tracking-[0.15em] uppercase font-display font-semibold">Billionaire Boys Club</span>
                <span className="text-xs tracking-wider text-white/40 uppercase">Spring 2</span>
              </div>
            </a>

            <a href="/gallery/walter-van-bierendonck" className="group flex flex-col">
              <div className="overflow-hidden w-full">
                <img
                  src="/slides/wvb-1.jpg"
                  alt="Walter Van Bierendonck"
                  className="w-full object-cover transition-opacity duration-700 group-hover:opacity-80"
                />
              </div>
              <div className="flex items-baseline justify-between px-6 py-3 border-b border-white/10">
                <span className="text-xs tracking-[0.15em] uppercase font-display font-semibold">Walter Van Bierendonck</span>
                <span className="text-xs tracking-wider text-white/40 uppercase">Runway</span>
              </div>
            </a>

          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-white/10 px-6 pt-10 pb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs tracking-[0.25em] uppercase font-display text-white/40">Available for</span>
            <span className="text-sm tracking-wider uppercase">Runway · Backstage · Editorial · Campaign</span>
          </div>
          <a
            href="mailto:estellescreative@gmail.com"
            className="text-xs tracking-[0.2em] uppercase font-display underline underline-offset-4 hover:opacity-50 transition-opacity"
          >
            estellescreative@gmail.com
          </a>
        </section>

      </main>
    </div>
  );
}
