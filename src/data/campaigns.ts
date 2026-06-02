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
        images: [
          "/slides/campaigns/bbc/summer-26/bbc-s26-01.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-02.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-03.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-04.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-05.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-06.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-07.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-08.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-09.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-10.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-12.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-13.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-14.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-15.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-16.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-17.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-19.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-20.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-21.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-22.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-23.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-24.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-25.jpg",
          "/slides/campaigns/bbc/summer-26/bbc-s26-26.jpg",
        ],
        year: "2026",
      },
      {
        slug: "spring",
        name: "Spring Campaign",
        cover: "/slides/campaigns/bbc/spring/bbc-spr-01.jpg",
        images: Array.from({ length: 9 }, (_, i) =>
          `/slides/campaigns/bbc/spring/bbc-spr-${String(i + 1).padStart(2, "0")}.jpg`
        ),
        year: "2025",
      },
      {
        slug: "holiday",
        name: "Holiday Campaign",
        cover: "/slides/campaigns/bbc/holiday/bbc-hol-01.jpg",
        images: Array.from({ length: 16 }, (_, i) =>
          `/slides/campaigns/bbc/holiday/bbc-hol-${String(i + 1).padStart(2, "0")}.jpg`
        ),
        year: "2024",
      },
    ],
  },
  {
    slug: "kidsuper",
    name: "KidSuper",
    short: "KidSuper",
    cover: "/slides/campaigns/covers/kidsuper.jpg",
    images: Array.from({ length: 14 }, (_, i) =>
      `/slides/campaigns/kidsuper/ks-${String(i + 1).padStart(2, "0")}.jpg`
    ),
    year: "2024",
  },
  {
    slug: "bape",
    name: "BAPE",
    short: "BAPE",
    cover: "/slides/campaigns/covers/bape.jpg",
    images: Array.from({ length: 22 }, (_, i) =>
      `/slides/campaigns/bape/bape-${String(i + 1).padStart(2, "0")}.jpg`
    ),
    year: "2023",
  },
  {
    slug: "puma",
    name: "Puma",
    short: "Puma",
    cover: "/slides/campaigns/covers/puma.jpg",
    images: Array.from({ length: 38 }, (_, i) =>
      `/slides/campaigns/puma/puma-${String(i + 1).padStart(2, "0")}.jpg`
    ),
    year: "2023",
  },
  {
    slug: "science-project",
    name: "Science Project",
    short: "Sci. Project",
    cover: "/slides/campaigns/covers/science-project.jpg",
    images: Array.from({ length: 9 }, (_, i) =>
      `/slides/campaigns/science-project/sci-${String(i + 1).padStart(2, "0")}.jpg`
    ),
    year: "2022",
  },
];
