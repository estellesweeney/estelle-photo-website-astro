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
    image:
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Morning Light",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Coastal Story",
    category: "Travel",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Studio Notes",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b1fb?auto=format&fit=crop&w=1200&q=80",
  },
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
        <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
          <img
            src="/hero.jpg"
            alt="Billionaire Boys Club"
            className="w-full object-contain"
            loading="lazy"
          />
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
              <img
                src={project.image}
                alt={project.title}
                className="h-64 w-full object-cover"
                loading="lazy"
              />
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
