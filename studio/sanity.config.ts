import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import projectConfig from '../sanity.project.json';
import { campaign } from './schemaTypes/campaign';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || projectConfig.projectId;
const dataset = process.env.SANITY_STUDIO_DATASET || projectConfig.dataset;
if (!projectId) throw new Error('Set SANITY_STUDIO_PROJECT_ID in studio/.env.local to your Sanity Project ID.');

export default defineConfig({
  name: 'estelle-photography',
  basePath: '/studio',
  title: 'Estelle Sweeney — Campaigns',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: [campaign] },
});
