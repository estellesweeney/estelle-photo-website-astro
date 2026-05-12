import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const featuredWork = [
  {
    title: "City Portraits",
    category: "Editorial Portrait",
  },
  {
    title: "Morning Light",
    category: "Lifestyle",
  },
  {
    title: "Coastal Story",
    category: "Travel",
  },
  {
    title: "Studio Notes",
    category: "Fashion",
  },
];

// Primary color palette – cycles across the 7 icons
const PRIMARY_COLORS = [
  '#E63946', // red
  '#F5A623', // orange-gold
  '#1D4ED8', // blue
  '#E63946',
  '#F5A623',
  '#1D4ED8',
  '#E63946',
];

const iconStrip = [
  { id: '16', label: 'icon 16' },
  { id: '31', label: 'icon 31' },
  { id: '17', label: 'icon 17' },
  { id: '22', label: 'icon 22' },
  { id: '08', label: 'icon 08' },
  { id: '06', label: 'icon 06' },
  { id: '12', label: 'icon 12' },
];

const services = [
  {
    title: "Portrait Sessions",
    description: "Modern, personality-driven portrait sessions for creatives and founders.",
  },
  {
    title: "Brand Storytelling",
    description: "Visual campaigns and social-first content for lifestyle and personal brands.",
  },
  {
    title: "Editorial Projects",
    description: "Narrative photo stories for magazines, websites, and cultural publications.",
  },
];

export default function PortfolioHome() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-10 md:gap-20 md:py-16">
      <section className="flex flex-col items-center text-center gap-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          Estelle Sweeney Photography
        </h1>
        <div className="space-y-5 max-w-2xl">
          <p className="text-base text-muted-foreground sm:text-lg">
            Capturing natural light, real emotion, and timeless stories.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button>View Portfolio</Button>
            <Button variant="outline">Book a Session</Button>
          </div>
        </div>
        {/* Icon strip */}
        <div className="w-full" aria-label="Icon navigation">
          <div className="flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto pb-1">
            {iconStrip.map(({ id, label }, i) => (
              <a
                key={id}
                href="#"
                aria-label={label}
                className="flex-1 min-w-[60px] aspect-square rounded-2xl flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
                style={{ backgroundColor: PRIMARY_COLORS[i] }}
              >
                <img
                  src={`/icons/icon_${id}.svg`}
                  alt={label}
                  className="w-full h-full rounded-2xl"
                  style={{ mixBlendMode: 'multiply' }}
                  draggable={false}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Slideshow / photo area */}
        <div className="w-full overflow-hidden rounded-2xl border border-border bg-muted flex items-center justify-center" style={{ height: '480px' }}>
          <span className="text-muted-foreground text-sm tracking-wide uppercase">Slideshow coming soon</span>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold sm:text-3xl">Featured Work</h2>
          <Badge variant="outline">2026 Collection</Badge>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {featuredWork.map((project) => (
            <Card key={project.title} className="p-0">
              <div className="h-64 w-full bg-muted flex items-center justify-center rounded-t-xl">
                <span className="text-muted-foreground text-sm tracking-wide uppercase">Photo coming soon</span>
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.category}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold sm:text-3xl">Services</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card px-6 py-8 text-center">
        <h2 className="text-2xl font-semibold">Let&apos;s create something memorable.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Available for portrait sessions, campaigns, and editorial work.
          Reach out to discuss your creative direction and timeline.
        </p>
        <div className="mt-6">
          <Button>Contact: hello@estellesweeney.com</Button>
        </div>
      </section>
    </main>
  );
}
