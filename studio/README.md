# Campaign content editor

The website stays on Vercel. This separate Sanity Studio provides an authenticated editor for campaign uploads. Existing BBC photos remain in place when Sanity is not configured.

## Connect your project

1. Create a Sanity project at https://www.sanity.io/manage with a **public** dataset named `production`. Published content is publicly readable; do not publish confidential material. Drafts remain accessible only to authenticated editors.
2. In this directory, copy `.env.example` to `.env.local`. Set `SANITY_STUDIO_PROJECT_ID` to your real Project ID. Project IDs and dataset names are not secrets. No read or write token belongs in frontend code.
3. Run `npm ci` in this directory, then `npm run dev`. Sign in to Sanity when prompted. Allow the Studio origin in your project's API/CORS settings if requested. Use exact origins rather than wildcards.
4. Run `npm run build` to check the editor, then `npm run deploy` and choose an available Studio hostname. This requires your Sanity login and deploys the editor to Sanity's hosting. Save that editor URL for future uploads. No Studio hostname has been selected or deployed by this repository.
5. In Vercel → project → Settings → Environment Variables, add `SANITY_PROJECT_ID` and `SANITY_DATASET=production` for Preview and Production as needed. Redeploy the website. No token is needed for the public published dataset. The build fails clearly if a configured dataset cannot be read.

## Upload campaigns

Create a Campaign, enter its name, generate its address name, and add Photos & videos. Upload original images and enter image descriptions. Drag media items to reorder them. Originals remain in Sanity; the grid requests images up to 1,000 pixels wide, and the enlarged view up to 2,400 pixels. File size, storage and bandwidth limits still apply to your Sanity plan; full resolution does not mean unlimited uploads.

Use `bbc` as the address name to append uploads to the existing BBC gallery. Other campaigns, such as Fall Campaign, Star Trak and Reebok, appear as their own sections under Campaigns. Display order controls their order. Existing BBC images remain first.

Videos accept browser-ready MP4 or WebM files and an optional cover image. Sanity file storage does not transcode videos; encode suitably sized playback copies before uploading. Large video libraries are better served by a dedicated video host. Videos only load when a visitor starts playback.

Click Publish when ready. Because this is a static Astro site, publishing content requires a Vercel rebuild before visitors see it. Initially use Vercel → Deployments → Redeploy. For automatic updates, create a Vercel Deploy Hook for the desired branch, then add that URL as a Sanity webhook for create/update/delete events with the filter `_type == "campaign" && !(_id in path("drafts.**"))`. Treat the hook URL as a secret; never commit it. Production and preview hooks should target their respective branches.

## Local website

In the repository root, copy `.env.example` to `.env` and set the same project/dataset. Run `ASTRO_TELEMETRY_DISABLED=1 npm run dev`, then open Campaigns. Restart or rebuild after publishing new content. Without a Project ID, the website uses the existing BBC photos.

Use the existing isolated checkout; do not create worktrees for setup unless explicitly requested.
