// Campaign project + sub-campaign config.
// - cover: shown on the house tile. Upload to /public/slides/campaigns/covers/<slug>.jpg
// - images: flat gallery (used when there are NO subcampaigns)
// - subcampaigns: nested seasons/drops — each has its own cover + images
// BBC is the "main window" (hero tile, displayed at the top of the house).

export interface SubCampaign {
  slug: string;
  name: string;
  cover: string;
  images: string[];
  year?: string;
}

export interface CampaignProject {
  slug: string;
  name: string;
  short: string;
  cover: string;
  images: string[];
  year?: string;
  subcampaigns?: SubCampaign[];
}

export const CAMPAIGN_PROJECTS: CampaignProject[] = [
  {
    slug: "bbc",
    name: "Billionaire Boys Club",
    short: "BBC",
    cover: "/slides/campaigns/covers/bbc.jpg",
    images: [],
    subcampaigns: [
      {
        slug: "summer-26",
        name: "Summer 26",
        cover: "/slides/campaigns/bbc/summer-26/bbc-s26-01.jpg",
        images: Array.from({ length: 10 }, (_, i) =>
          `/slides/campaigns/bbc/summer-26/bbc-s26-${String(i + 1).padStart(2, "0")}.jpg`
        ),
        year: "2026",
      },
      {
        slug: "spring",
        name: "Spring Campaign",
        cover: "/slides/campaigns/bbc/spring/cover.jpg",
        images: [],
        year: "2025",
      },
      {
        slug: "holiday",
        name: "Holiday Campaign",
        cover: "/slides/campaigns/bbc/holiday/cover.jpg",
        images: [],
        year: "2024",
      },
    ],
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
