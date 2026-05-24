import { useState } from "react";
import HeroSlideshow from "@/components/HeroSlideshow";
import AsciiIntro from "@/components/AsciiIntro";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

const nav = [
  { label: "Runway",         link: "/runway",         tip: "35mm runway photography" },
  { label: "Campaigns",      link: "/campaigns",      tip: "Campaign & editorial work" },
  { label: "Backstage",      link: "/backstage",      tip: "Behind the scenes" },
  { label: "Graphic Design", link: "/graphic-design", tip: "Art direction & design" },
  { label: "About",          link: "/about",          tip: "Estelle Sweeney" },
];

export default function PortfolioHome() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <TooltipProvider>
      {showIntro && <AsciiIntro onDone={() => setShowIntro(false)} />}

      <div className="min-h-screen bg-black text-cream font-sans">

        {/* Nav */}
        <nav className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase font-display">Estelle Sweeney</span>
        </nav>

        <main className="flex flex-col gap-0">

          {/* Outline button navigation with tooltips */}
          <section className="flex flex-wrap gap-2 px-6 pt-8 pb-6 border-b border-white/10">
            {nav.map(({ label, link, tip }) => (
              <Tooltip key={label}>
                <TooltipTrigger>
                  <a href={link}>
                    <Button variant="outline">{label}</Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent><p>{tip}</p></TooltipContent>
              </Tooltip>
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
                    src="/slides/wvb/01.jpg"
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
    </TooltipProvider>
  );
}
