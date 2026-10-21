import projectConfig from "../../sanity.project.json";

export interface CampaignMedia {
  _type: 'photograph' | 'video';
  alt?: string;
  title?: string;
  url?: string;
  poster?: string;
  width?: number;
  height?: number;
}
export interface ContentCampaign {
  title: string;
  slug: string;
  media: CampaignMedia[];
}

// Original assets remain in Sanity. Only sized, compressed images reach the page.
export function optimizedImage(url: string, width = 1000): string {
  const image = new URL(url);
  image.searchParams.set('w', String(width));
  image.searchParams.set('fit', 'max');
  image.searchParams.set('auto', 'format');
  image.searchParams.set('q', '85');
  return image.toString();
}

export async function getCampaigns(): Promise<ContentCampaign[]> {
  const project = import.meta.env.SANITY_PROJECT_ID || projectConfig.projectId;
  const dataset = import.meta.env.SANITY_DATASET || projectConfig.dataset;
  if (!project) return [];
  if (!/^[a-z0-9]+$/.test(project) || !/^[a-z0-9_-]+$/.test(dataset)) {
    throw new Error('Invalid Sanity project or dataset name. Check the environment settings.');
  }
  const query = `*[_type == "campaign" && defined(slug.current)] | order(order asc, title asc) {
    title, "slug": slug.current,
    "media": media[]{_type, alt, title,
      "url": select(_type == "photograph" => asset->url, _type == "video" => file.asset->url),
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "poster": poster.asset->url
    }
  }`;
  const url = new URL(`https://${project}.api.sanity.io/v2026-10-21/data/query/${dataset}`);
  url.searchParams.set('query', query);
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Sanity campaign fetch failed (${response.status}). Verify the public dataset and project settings.`);
  const data = await response.json();
  if (!Array.isArray(data.result)) throw new Error('Sanity returned an invalid campaign response.');
  return data.result;
}
