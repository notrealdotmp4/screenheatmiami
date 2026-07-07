# Screen Heat Miami — Website

A fast, self-hosted rebuild of screenheatmiami.com, moved off Wix into your own
code. Built with [Eleventy](https://www.11ty.dev/) (a static-site generator) and
[Decap CMS](https://decapcms.org/) so a non-technical person can add and edit
podcast episodes through a simple web form — no code required.

## What's here

```
shm/
├─ src/
│  ├─ index.njk            Homepage (hero, latest, hosts, archive, sponsors)
│  ├─ episodes/*.md        One file per episode (73 seeded from the old site)
│  ├─ _data/site.json      Site-wide settings, subscribe links, hosts, sponsors
│  ├─ _includes/           Page layouts (base + episode)
│  ├─ css/ js/ images/     Styles, scripts, image uploads
│  └─ admin/               Decap CMS (the editor's control panel)
├─ .eleventy.js            Build configuration
├─ netlify.toml            Netlify build settings
└─ package.json
```

## Run it locally (optional)

```bash
cd shm
npm install
npm start        # preview at http://localhost:8080
npm run build    # outputs the finished site to _site/
```

## Deploy — full walkthrough

A complete, non-technical, step-by-step is in **DEPLOY-GUIDE.md**. The short version:

## Deploy to Netlify (one-time setup)

1. **Put the code on GitHub.** Create a new empty repo, then from the `shm`
   folder: `git init && git add . && git commit -m "initial" && git branch -M main`
   and push to your repo.
2. **Create the Netlify site.** In your Netlify account: *Add new site → Import
   from Git → pick the repo.* Netlify reads `netlify.toml` automatically
   (build command `npm run build`, publish folder `_site`). Click Deploy.
3. **Point your domain.** In *Site settings → Domain management*, add
   `screenheatmiami.com` and follow Netlify's DNS instructions.

## Turn on the editor (so others can add episodes)

Editor logins are handled by **DecapBridge** (free) instead of the now-deprecated
Netlify Identity. Full click-by-click steps are in **DEPLOY-GUIDE.md, Part 4**.
In short: create a DecapBridge account, add your GitHub repo + a fine-grained
access token, paste the two values it gives you into `src/admin/config.yml`, then
invite editors by email. They log in at `/admin/` with email (or Google/Microsoft)
— no GitHub account needed.

### Adding a new episode (the editor's workflow)

1. Go to `/admin/` and log in.
2. Click **Podcast Episodes → New Episode.**
3. Fill in the form: guest name, role, cover image, the Spotify / Apple /
   SoundCloud / YouTube links, and a bio.
4. Set **Sort order** to a number higher than the current top episode so the new
   one appears first (e.g. if the newest is 73, use 74).
5. Click **Publish.** Netlify rebuilds automatically; the new episode is live in
   about a minute.

The editor can also update subscribe links, hosts, and sponsors under
**Site Settings.**

## Notes

- Episode images currently point at the original Wix CDN so the archive looks
  complete out of the gate. They keep working, but over time you can re-upload
  each image through the CMS to fully cut ties with Wix.
- Most archived episodes were seeded with title, role, and image. Bios/links can
  be filled in gradually through the CMS — only Miles Mussenden and Bechir
  Sylvain have full bios so far.
- If a Spotify link is a full episode URL (contains `/episode/`), the episode
  page embeds a playable Spotify player automatically.
