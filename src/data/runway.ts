export interface RunwayShow {
  slug: string;
  brand: string;
  season: string;
  cover: string;
  images: string[];
}

export const runwayShows: RunwayShow[] = [
  {
    slug: "walter-van-bierendonck",
    brand: "Walter Van Bierendonck",
    season: "PFW 2026",
    cover: "/slides/wvb-1.jpg",
    images: [
      "/slides/wvb-g-01.jpg",
      "/slides/wvb-g-02.jpg",
      "/slides/wvb-g-03.jpg",
      "/slides/wvb-g-04.jpg",
      "/slides/wvb-g-05.jpg",
      "/slides/wvb-g-06.jpg",
      "/slides/wvb-g-07.jpg",
      "/slides/wvb-g-08.jpg",
      "/slides/wvb-g-09.jpg",
      "/slides/wvb-1.jpg",
      "/slides/wvb-2.jpg",
      "/slides/wvb-3.jpg",
    ],
  },
  {
    slug: "kidsuper-aw2627",
    brand: "KidSuper AW26/27",
    season: "PFW 2026",
    cover: "/slides/kidsuper/otb-cover.jpg",
    images: [
      "/slides/kidsuper/otb-01.jpg",
      "/slides/kidsuper/otb-02.jpg",
      "/slides/kidsuper/otb-03.jpg",
      "/slides/kidsuper/otb-04.jpg",
      "/slides/kidsuper/otb-05.jpg",
      "/slides/kidsuper/otb-06.jpg",
      "/slides/kidsuper/otb-07.jpg",
      "/slides/kidsuper/otb-08.jpg",
      "/slides/kidsuper/otb-09.jpg",
      "/slides/kidsuper/otb-10.jpg",
    ],
  },
  {
    slug: "kidsuper-aw25",
    brand: "KidSuper AW25",
    season: "PFW 2025",
    cover: "/slides/kidsuper/moon-cover.jpg",
    images: [
      "/slides/kidsuper/moon-05.jpg",
      "/slides/kidsuper/moon-06.jpg",
      "/slides/kidsuper/moon-07.jpg",
      "/slides/kidsuper/moon-08.jpg",
      "/slides/kidsuper/moon-09.jpg",
      "/slides/kidsuper/moon-10.jpg",
    ],
  },
  // ── Add more shows below as you upload photos ──────────────────
  // {
  //   slug: "mugler-aw25",
  //   brand: "Mugler AW25",
  //   season: "PFW 2025",
  //   cover: "/slides/mugler/cover.jpg",
  //   images: ["/slides/mugler/01.jpg", "/slides/mugler/02.jpg"],
  // },
];

// Flat list for the editorial grid
export const runwayGridImages = runwayShows.flatMap((show) =>
  show.images.map((src) => ({
    src,
    brand: show.brand,
    season: show.season,
    slug: show.slug,
  }))
);
