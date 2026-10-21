import { useState } from "react";
import "./PortfolioHome.css";

const projects = [
  { title: "Runway", category: "Fashion photography", href: "/runway", image: "/slides/home/runway/r-01.jpg" },
  { title: "Campaigns", category: "Editorial & campaigns", href: "/campaigns", image: "/slides/home/campaigns-cover.jpg" },
  { title: "Exclusives Reebok", category: "Direction & graphics", href: "/campaigns/exclusives-reebok", image: "/slides/campaigns/exclusives-reebok/reebok-01.webp" },
  { title: "KidSuper", category: "Fashion photography", href: "/gallery/kidsuper", image: "/art/kidsuper/cover.jpg" },
  { title: "Walter Van Beirendonck", category: "Runway photography", href: "/gallery/walter-van-bierendonck", image: "/slides/home/runway/r-02.jpg" },
  { title: "Graphic Design", category: "Art direction & design", href: "/graphic-design", image: "/art/graphic-design-cover2.jpg" },
];

export default function PortfolioHome() {
  const [view, setView] = useState<"text" | "images">("text");

  return (
    <main className="editorial-home">
      <section className="editorial-hero" aria-label="Estelle Sweeney photography">
        <img className="editorial-hero-image" src="/slides/home/hero.jpg" alt="Selected fashion photograph by Estelle Sweeney" fetchPriority="high" />
        <header className="editorial-header">
          <h1><a href="/">Estelle Sweeney</a></h1>
          <p>Photographer & art director<br />New York City · Paris</p>
          <div><a href="mailto:estellescreative@gmail.com">estellescreative@gmail.com</a><br /><a href="/about">About & contact</a></div>
          <p className="editorial-feature"><em>Selected work:</em> <a href="/runway">Runway</a>, <a href="/campaigns">Campaigns</a> & <a href="/graphic-design">Graphic Design</a></p>
        </header>
        <a className="editorial-scroll" href="#selected-work">Explore selected work <span aria-hidden="true">↓</span></a>
      </section>

      <section id="selected-work" className="editorial-work" aria-labelledby="work-heading">
        <div className="editorial-toolbar">
          <h2 id="work-heading">Selected work</h2>
          <div className="editorial-view" role="group" aria-label="Project display">
            <button type="button" aria-pressed={view === "text"} onClick={() => setView("text")}><span aria-hidden="true" />Text</button>
            <button type="button" aria-pressed={view === "images"} onClick={() => setView("images")}><span aria-hidden="true" />Images</button>
          </div>
        </div>
        <div className={`editorial-projects editorial-projects--${view}`}>
          {projects.map((project, index) => (
            <a className="editorial-project" key={project.title} href={project.href}>
              <div className="editorial-project-image"><img src={project.image} alt={project.title} loading="lazy" /></div>
              <div className="editorial-project-copy"><span>{String(index + 1).padStart(2, "0")}</span><h3>{project.title}</h3><p>{project.category}</p><span className="editorial-project-open">View project ↗</span></div>
            </a>
          ))}
        </div>
        <footer className="editorial-footer"><a href="/about">About & contact ↗</a><a href="https://instagram.com/estellesweeney_" target="_blank" rel="noreferrer">Instagram ↗</a><span>Estelle Sweeney</span></footer>
      </section>
    </main>
  );
}
