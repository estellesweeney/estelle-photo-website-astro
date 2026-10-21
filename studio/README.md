# Campaign content editor

The shared `sanity.project.json` connects the website and editor to project `ni7uagsf`, dataset `production`. These are public identifiers, not credentials. The dataset must be publicly readable for published campaign content; drafts still require an authenticated Sanity editor. Optional environment overrides are listed in `.env.example` in both directories.

## Open the editor on Vercel

The repository's Vercel configuration installs both applications. `npm run build` builds Astro, builds Sanity Studio, and copies the editor into the website output at `/studio`. Vercel rewrites support Studio's internal routes. Once the latest branch is deployed, open **your Vercel site URL + `/studio`** and sign in with the Sanity account that owns or has editor access to this project.

In https://www.sanity.io/manage → project → API → CORS origins, add the exact Vercel website origin (scheme and hostname, no `/studio` path) and enable **Allow credentials**. Add the production origin separately when publishing the site there. Do not use wildcard credential origins. A new deployment-specific preview URL needs its own origin; a stable Vercel branch alias avoids repeating this step.

Sign-in, CORS changes, and uploads require the user's Sanity account. No password, API token, or Sanity authentication is stored in this repository. If the dataset is private, change its visibility to public in Sanity settings before deploying this implementation. Only publish media intended for public viewing.

## Upload campaigns

Create a Campaign, enter its name, generate its address name, and add Photos & videos. Upload original images and enter image descriptions. Drag media items to reorder them. Originals remain in Sanity; the grid requests images up to 1,000 pixels wide, and the enlarged view up to 2,400 pixels. File size, storage and bandwidth limits still apply to your Sanity plan; full resolution does not mean unlimited uploads.

Use `bbc` as the address name to append uploads to the existing BBC gallery. Other campaigns, such as Fall Campaign, Star Trak and Reebok, appear as their own sections under Campaigns. Display order controls their order. Existing BBC images remain first.

Videos accept browser-ready MP4 or WebM files and an optional cover image. Sanity file storage does not transcode videos; encode suitably sized playback copies before uploading. Large video libraries are better served by a dedicated video host. Videos only load when a visitor starts playback.

Click Publish when ready. Because this is a static Astro site, publishing content requires a Vercel rebuild before visitors see it. Initially use Vercel → Deployments → Redeploy, with build cache disabled to fetch fresh content. For automatic updates, create a Vercel Deploy Hook for the desired branch, then add that URL as a Sanity webhook for create/update/delete events with the filter `_type == "campaign" && !(_id in path("drafts.**"))`. Treat the hook URL as a secret; never commit it. Production and preview hooks should target their respective branches. The webhook has not been configured automatically.

## Local development

Run `npm ci` at the repository root and `npm ci --prefix studio`. Start the website with `ASTRO_TELEMETRY_DISABLED=1 npm run dev` from the root. Start the editor with `npm run dev --prefix studio` and open its printed address at `/studio`. Add the editor's exact local origin to Sanity CORS with credentials allowed. Restart the website after publishing content. For the combined production output, run `npm run build`.

The website build deliberately fails if the configured Sanity API cannot be read, rather than silently publishing a gallery without uploaded campaigns. This cloud environment needs network access to `ni7uagsf.api.sanity.io`, `api.sanity.io`, and `cdn.sanity.io`; these domains have been saved in its environment configuration draft. Network settings for the cloud workspace do not change Vercel or Sanity settings.

Use the existing isolated checkout; do not create worktrees for setup unless explicitly requested.
