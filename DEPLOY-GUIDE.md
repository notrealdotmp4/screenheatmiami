# Screen Heat Miami — Complete Step-by-Step Guide

This walks you through everything from zero: putting the site online, connecting
your domain, and turning on the editor login so someone else can add podcast
episodes. No coding required. Follow it top to bottom.

You will create three free accounts along the way: **GitHub** (stores the code),
**Netlify** (hosts the live site), and **DecapBridge** (handles editor logins).
All three have free tiers that are plenty for this site.

Set aside about 45 minutes. Take it one Part at a time.

---

## Part 1 — Create your accounts (10 min)

1. **GitHub** — go to https://github.com/signup and create an account.
   Use a business email you'll keep (e.g. your graphographics address).
2. **Netlify** — go to https://app.netlify.com/signup and sign up. Choose
   **"Sign up with GitHub"** — this links the two automatically and saves time later.
3. **DecapBridge** — go to https://decapbridge.com/auth/signup and create an
   account. (We'll use this in Part 4.)

That's all the sign-ups. Keep these three browser tabs open.

---

## Part 2 — Put the website code on GitHub (10 min)

The finished website lives in the `shm` folder I created. We need to upload it
to GitHub. The easiest no-command-line way is **GitHub Desktop**.

1. Download and install **GitHub Desktop** from https://desktop.github.com/,
   open it, and sign in with your GitHub account.
2. In GitHub Desktop: **File → Add Local Repository.**
3. Click **Choose…** and select the `shm` folder (inside your
   "Update various sites" project folder). Click **Add Repository.**
   - If it says "this directory does not appear to be a Git repository," click
     the **"create a repository"** link it offers, then click **Create Repository.**
4. Click **Publish repository** (top right).
   - Name it `screenheatmiami`.
   - **Untick "Keep this code private"** only if you want it public; private is fine.
   - Click **Publish Repository.**

Your code is now on GitHub. You can confirm at
`https://github.com/YOUR-USERNAME/screenheatmiami`.

> Prefer the command line? From inside the `shm` folder run:
> `git init && git add . && git commit -m "initial commit" && git branch -M main`
> then create an empty repo on GitHub and follow its "push an existing repository" lines.

---

## Part 3 — Put the site live on Netlify (5 min)

1. Go to https://app.netlify.com and click **Add new site → Import an existing project.**
2. Click **Deploy with GitHub** and authorize Netlify if asked.
3. Pick the **`screenheatmiami`** repository.
4. Netlify auto-detects the settings from the included `netlify.toml` file:
   - Build command: `npm run build`
   - Publish directory: `_site`
   Leave them as-is and click **Deploy.**
5. Wait 1–2 minutes. When it finishes you'll get a temporary address like
   `https://random-name-123.netlify.app`. Click it — your site is live. 🎉

**Rename it (optional):** Site configuration → change site name → e.g.
`screenheatmiami` so the temp address is `screenheatmiami.netlify.app`.

From now on, **any change saved to GitHub automatically rebuilds and updates the
live site** within a minute. You won't need to touch Netlify again.

---

## Part 4 — Turn on the editor login (DecapBridge) (10 min)

This is what lets a non-technical person add episodes. DecapBridge connects the
editor's login to your GitHub repo. You do this once.

### 4a. Create a GitHub access token (so DecapBridge can save changes)

1. On GitHub, click your **profile picture (top-right) → Settings.**
2. Bottom of the left menu: **Developer settings.**
3. **Personal access tokens → Fine-grained tokens → Generate new token.**
4. Fill in:
   - **Token name:** `DecapBridge Access`
   - **Expiration:** No expiration
   - **Repository access:** *Only select repositories* → choose `screenheatmiami`
   - **Permissions → Repository permissions:**
     - **Contents:** Read and write
     - **Pull requests:** Read and write
5. Click **Generate token** and **copy** the token now (you can't see it again).

### 4b. Register the site in DecapBridge

1. In DecapBridge, click **Create New Site.**
2. **GitHub repository:** enter `YOUR-USERNAME/screenheatmiami`.
3. **GitHub token:** paste the token from step 4a.
4. **Decap CMS URL:** `https://screenheatmiami.com/admin/`
   (or your `.netlify.app/admin/` address if you haven't connected the domain yet).
5. Save. DecapBridge now shows you two values: a **repo** line and an
   **identity_url** (it contains your Site ID).

### 4c. Paste those values into the site config

1. Open the file `shm/src/admin/config.yml` (in GitHub Desktop you can right-click →
   open in your text editor, e.g. Notepad or TextEdit).
2. Near the top, replace the two placeholders with what DecapBridge gave you:
   - `repo: YOUR-GITHUB-USERNAME/screenheatmiami` → your real `username/screenheatmiami`
   - `identity_url: https://auth.decapbridge.com/sites/YOUR-SITE-ID` → the real URL
3. Save the file. In GitHub Desktop you'll see the change listed — type a short
   summary ("configure DecapBridge") and click **Commit to main**, then **Push origin.**

Netlify rebuilds automatically. In about a minute the editor login is live.

### 4d. Invite the editor

1. In DecapBridge, open your site → **Manage Collaborators.**
2. Enter the person's name and email → **Send Invitation Email.**
3. They get an email, set a password (or use Google/Microsoft), and they're in.

---

## Part 5 — Connect your domain screenheatmiami.com (10 min)

Your domain currently points at Wix. When you're happy with the new site, switch it.

1. In Netlify: **Domain management → Add a domain →** type `screenheatmiami.com` → **Verify → Add.**
2. Netlify shows you DNS records to set. You have two choices:
   - **Easiest:** use **Netlify DNS** — Netlify gives you 4 nameservers. Log in
     wherever your domain is registered (this may be Wix, GoDaddy, etc.), find
     **Nameservers**, and replace them with Netlify's four.
   - **Or** keep your current DNS and just add the **A record** and **CNAME**
     Netlify lists.
3. DNS changes can take a few minutes to a few hours. Netlify auto-issues a free
   HTTPS certificate once it sees the domain pointing at it.

> ⚠️ Don't cancel Wix until the new site is fully live on your domain and you've
> confirmed everything works. Nothing breaks by keeping Wix a little longer.

---

## Part 6 — How the editor adds a new episode (the everyday workflow)

Share this part with whoever manages episodes.

1. Go to **screenheatmiami.com/admin/** and log in with your DecapBridge email.
2. Click **Podcast Episodes → New Episode.**
3. Fill in the form:
   - **Guest / Episode Title** — e.g. "Jane Director"
   - **Role / Subtitle** — e.g. "Director/Producer"
   - **Sort order** — a number **higher than the current top episode** so the new
     one shows first (if the newest is 73, use 74; next time 75, and so on).
   - **Cover Image** — upload the guest's photo.
   - **Spotify / Apple / SoundCloud / YouTube** — paste whichever links you have.
     (A full Spotify episode link that contains `/episode/` will show a play button
     right on the page.)
   - **Description / Bio** — paste the guest bio.
4. Click **Publish → Publish now.**
5. The site updates itself in about a minute. Refresh the homepage to see it.

To edit or fix an existing episode, open it from the same list, change what you
need, and Publish again. **Site Settings** in the same menu lets you update
subscribe links, hosts, and sponsors.

---

## Quick reference

| Thing | Where |
|---|---|
| Live site | your Netlify address / screenheatmiami.com |
| Editor login | screenheatmiami.com/admin/ |
| Add/invite editors | DecapBridge dashboard → Manage Collaborators |
| Hosting / builds | Netlify dashboard (rarely needed) |
| The code | GitHub → screenheatmiami repo |

## Troubleshooting

- **Editor can't log in / "config error":** the two placeholders in
  `src/admin/config.yml` (Part 4c) probably aren't filled in with the real
  DecapBridge values, or weren't pushed to GitHub.
- **Saved an episode but it's not showing:** give it a minute (Netlify is
  rebuilding), then hard-refresh. Check the new episode's **Sort order** is high.
- **A photo looks stretched:** landscape images look best; re-upload a wider crop.
- **Old images still from Wix:** the archive photos currently load from Wix's
  servers so the site looked complete on day one. They keep working; you can
  re-upload any of them through the CMS over time to fully leave Wix behind.
