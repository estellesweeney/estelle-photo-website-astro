// Backstage brand config.
// - cover: the poster image shown on the wall (add when ready)
// - images: full-gallery swipe images (add when ready)
// Drop files in /public/slides/backstage/<slug>/ and add paths here.

export interface BackstageBrand {
  slug: string;
  name: string;
  season?: string;
  cover?: string;
  images: string[];
}

export const backstageBrands: BackstageBrand[] = [
  {
    slug: "kidsuper",
    name: "KidSuper",
    season: "FW26",
    cover: "/slides/backstage/kidsuper/cover.jpg",
    images: [
      "/slides/backstage/kidsuper/bs-01.jpg",
    ],
  },
  {
    slug: "comme-des-garcons",
    name: "Comme des Garçons",
    season: "SS25",
    // cover: "/slides/backstage/comme-des-garcons/cover.jpg",
    images: [],
  },
  {
    slug: "bape",
    name: "BAPE",
    season: "SS25",
    cover: "/slides/backstage/bape/cover.jpg",
    images: [],
  },
  {
    slug: "billionaire-boys-club",
    name: "Billionaire Boys Club",
    season: "Holiday",
    // cover: "/slides/backstage/billionaire-boys-club/cover.jpg",
    images: [],
  },
  {
    slug: "puma",
    name: "Puma",
    season: "SS25",
    cover: "/slides/backstage/puma/cover.jpg",
    images: [],
  },
  {
    slug: "walter-van-bierendonck",
    name: "Walter Van Bierendonck",
    season: "FW25",
    cover: "/slides/backstage/walter-van-bierendonck/cover.jpg",
    images: [],
  },
];
