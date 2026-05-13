// Graphic design / art pieces for the virtual gallery.
// - cover: the artwork image shown in the gallery frame
// - inspo: content for the inspo page (summary + sections)
// Drop artwork files in /public/art/ and fill in the inspo copy below.

export interface InspoSection {
  heading: string;
  body: string;
}

export interface GalleryPiece {
  slug: string;
  title: string;
  year?: string;
  medium?: string;    // e.g. "Digital, Mixed Media"
  cover?: string;     // artwork image path
  images?: string[];  // additional images shown on inspo page
  inspo: {
    summary: string;  // short blurb shown under the title
    sections: InspoSection[];
  };
}

export const galleryPieces: GalleryPiece[] = [
  {
    slug: "billionaire-boys-club-illustrations",
    title: "Billionaire Boys Club Illustrations",
    year: "2025",
    medium: "Illustration",
    cover: "/art/bbc-illustrations.jpg",
    images: [
      "/art/bbc/01.jpg",
      "/art/bbc/02.jpg",
      "/art/bbc/03.jpg",
      "/art/bbc/04.jpg",
      "/art/bbc/05.jpg",
      "/art/bbc/06.jpg",
    ],
    inspo: {
      summary: "",
      sections: [
        { heading: "Concept", body: "" },
        { heading: "Inspiration", body: "" },
        { heading: "Process", body: "" },
      ],
    },
  },
  {
    slug: "red-sparrow",
    title: "Red Sparrow",
    year: "2025",
    medium: "Digital",
    // cover: "/art/red-sparrow.jpg",
    inspo: {
      summary: "",
      sections: [
        { heading: "Concept", body: "" },
        { heading: "Inspiration", body: "" },
        { heading: "Process", body: "" },
      ],
    },
  },
  {
    slug: "threshold",
    title: "Threshold",
    year: "2025",
    medium: "Mixed Media",
    // cover: "/art/threshold.jpg",
    inspo: {
      summary: "",
      sections: [
        { heading: "Concept", body: "" },
        { heading: "Inspiration", body: "" },
        { heading: "Process", body: "" },
      ],
    },
  },
  {
    slug: "waveform",
    title: "Waveform",
    year: "2025",
    medium: "Digital",
    // cover: "/art/waveform.jpg",
    inspo: {
      summary: "",
      sections: [
        { heading: "Concept", body: "" },
        { heading: "Inspiration", body: "" },
        { heading: "Process", body: "" },
      ],
    },
  },
];
