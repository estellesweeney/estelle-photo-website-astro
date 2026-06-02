// Campaign project config.
// - cover: shown on the house tile. Upload to /public/slides/campaigns/covers/<slug>.jpg
// - images: gallery images for the per-project page. Add when ready.
// BBC is the "main window" (hero tile, displayed at the top of the house).

export interface CampaignProject {
  slug: string;
  name: string;
  short: string;
  cover: string;
  images: string[];
  year?: string;
}

export const CAMPAIGN_PROJECTS: CampaignProject[] = [
  {
    slug: "bbc",
    name: "Billionaire Boys Club",
    short: "BBC",
    cover: "/slides/campaigns/covers/bbc.jpg",
    images: [],
    year: "2024",
  },
  {
    slug: "kidsuper",
    name: "KidSuper",
    short: "KidSuper",
    cover: "/slides/campaigns/covers/kidsuper.jpg",
    images: [],
    year: "2024",
  },
  {
    slug: "bape",
    name: "BAPE",
    short: "BAPE",
    cover: "/slides/campaigns/covers/bape.jpg",
    images: [],
    year: "2023",
  },
  {
    slug: "puma",
    name: "Puma",
    short: "Puma",
    cover: "/slides/campaigns/covers/puma.jpg",
    images: [],
    year: "2023",
  },
  {
    slug: "science-project",
    name: "Science Project",
    short: "Sci. Project",
    cover: "/slides/campaigns/covers/science-project.jpg",
    images: [],
    year: "2022",
  },
];
