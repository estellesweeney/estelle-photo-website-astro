import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { campaign } from './schemaTypes/campaign';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
if (!projectId) throw new Error('Set SANITY_STUDIO_PROJECT_ID in studio/.env.local to your Sanity Project ID.');

export default defineConfig({
  name: 'estelle-photography',
  title: 'Estelle Sweeney — Campaigns',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: [campaign] },
});
