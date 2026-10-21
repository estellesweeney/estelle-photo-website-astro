import { defineCliConfig } from 'sanity/cli';
import projectConfig from '../sanity.project.json';
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || projectConfig.projectId,
    dataset: process.env.SANITY_STUDIO_DATASET || projectConfig.dataset,
  },
  project: { basePath: '/studio' },
});
