import HeroSlideshow from "@/components/HeroSlideshow";

const iconNav = [
  { id: "16", label: "BILLIONAIRE\nBOYS CLUB",   link: "/gallery/bbc-spring-2" },
  { id: "31", label: "WALTER VAN\nBIERENDONCK",  link: "/gallery/walter-van-bierendonck" },
  { id: "17", label: "EDITORIAL",                link: "#" },
  { id: "22", label: "RUNWAY",                   link: "#" },
  { id: "08", label: "BACKSTAGE",                link: "#" },
  { id: "06", label: "CAMPAIGN",                 link: "#" },
  { id: "12", label: "ARCHIVE",                  link: "#" },
];

const COLORS = [
  "#E63946",
  "#F5A623",
  "#1D4ED8",
  "#E63946",
  "#F5A623",
  "#1D4ED8",
  "#E63946",
];

export default function PortfolioHome() {
  return (
    <div className="min-h-screen bg-black text-cream font-sans">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase">Estelle Sweeney</span>
        <div className="flex gap-8">
          <a href="#work" className="text-xs tracking-[0.15em] uppercase hover:opacity-50 transition-opacity">Work</a>
          <a href="mailto:estellescreative@gmail.com" className="text-xs tracking-[0.15em] uppercase hover:opacity-50 transition-opacity">Contact</a>
        </div>
      </nav>

      <main className="px-6 py-10 max-w-6xl mx-auto flex flex-col gap-12">

        {/* Icon navigation */}
        <section className="grid grid-cols-7 gap-3">
          {iconNav.map(({ id, label, link }, i) => (
            <a
              key={id}
              href={link}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-full aspect-square rounded-xl overflow-hidden transition-opacity group-hover:opacity-80"
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

            </a>
          ))}
        </section>

        {/* Slideshow */}
        <section>
          <HeroSlideshow />
        </section>

        {/* Featured galleries */}
        <section id="work" className="flex flex-col gap-6">
          <h2 className="text-xs tracking-[0.25em] uppercase border-b border-white/10 pb-3">Recent Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <a href="/gallery/bbc-spring-2" className="group flex flex-col gap-2">
              <div className="overflow-hidden aspect-[4/3] bg-white/5">
                <img
                  src="/slides/bbc-01.jpg"
                  alt="Billionaire Boys Club Spring 2"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs tracking-[0.15em] uppercase font-semibold">Billionaire Boys Club</span>
                <span className="text-xs tracking-wider text-white/40 uppercase">Spring 2</span>
              </div>
            </a>

            <a href="/gallery/walter-van-bierendonck" className="group flex flex-col gap-2">
              <div className="overflow-hidden aspect-[4/3] bg-white/5">
                <img
                  src="/slides/wvb-1.jpg"
                  alt="Walter Van Bierendonck"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs tracking-[0.15em] uppercase font-semibold">Walter Van Bierendonck</span>
                <span className="text-xs tracking-wider text-white/40 uppercase">Runway</span>
              </div>
            </a>

          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-white/10 pt-10 pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs tracking-[0.25em] uppercase text-white/40">Available for</span>
            <span className="text-sm tracking-wider uppercase">Runway · Backstage · Editorial · Campaign</span>
          </div>
          <a
            href="mailto:estellescreative@gmail.com"
            className="text-xs tracking-[0.2em] uppercase underline underline-offset-4 hover:opacity-50 transition-opacity"
          >
            estellescreative@gmail.com
          </a>
        </section>

      </main>
    </div>
  );
}
