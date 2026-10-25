# Git + Vercel: how to push and host

The folder `D:\Japan_Hackathon_Final\Japan_Hackathon_Git` is the site. It's plain static files: no build step, no server code.

```
index.html      hub page (links to everything)
deck/           the combined pitch deck      ← filled once Final_Html/index.html is built
prototype/      Part 1 · live prototype
film/           Part 2 · the film (index.html) + pipeline scripts
business/       Part 3 · research, BMC, slides, survey
finale/         Part 4 · Arigatō
docs/           plan, context, interviews, checkpoint 1
sync.ps1        refreshes all of the above from the working folders
```

> **Don't push until `deck/` has its `index.html`.** Until then, the "Pitch deck" card on the hub page shows a 404.

---

## 0. One-time setup
1. Install **Git**: https://git-scm.com/download/win (keep the defaults).
2. Tell Git who you are (once per computer):
   ```powershell
   git config --global user.name  "Madhav Arora"
   git config --global user.email "you@example.com"
   ```
3. Have a **GitHub** account. You need **write access** to the repo you push to (see step 2).
4. Optional, only for the CLI route in step 4: install **Node.js LTS** from https://nodejs.org.

## 1. Refresh the folder (every time something changes)
Run this after the film or the deck is updated. It copies the latest version of every part:
```powershell
cd D:\Japan_Hackathon_Final\Japan_Hackathon_Git
powershell -ExecutionPolicy Bypass -File .\sync.ps1
```
Then open `index.html` in Chrome and click through each card.
(The MP4 film, ~80 MB, stays local on purpose. GitHub warns above 50 MB, and `/film/` is the same film.)

## 2. Pick where it goes

### Option A (recommended): the existing repo, which keeps the QR code working
The repo is `https://github.com/diksha13555/Japan-Cultural-and-Tourism-Exchange`. Its Vercel project serves
**https://japan-cultural-and-tourism-exchange.vercel.app**, and that is the URL in the QR code on the last slide.
Pushing here keeps that link alive. You need to be a collaborator (Diksha can add you under
GitHub → Settings → Collaborators).

Push to a **branch first**. Vercel then builds a *preview* URL without touching the live site:
```powershell
cd D:\Japan_Hackathon_Final\Japan_Hackathon_Git
git init -b final-pitch
git remote add origin https://github.com/diksha13555/Japan-Cultural-and-Tourism-Exchange.git
git fetch origin
git reset origin/main          # sits our files on top of main's history; your files are NOT changed
git add -A
git status                      # check: our folders added; old app files (api/, data/, sw.js…) deleted
git commit -m "Final pitch: combined deck, prototype, film, business research, finale"
git push -u origin final-pitch
```
- GitHub may open a browser window to sign in. That's normal.
- `git reset origin/main` is a *mixed* reset: it only moves Git's pointer, so it doesn't touch your files. The old app stays in the
  repo history, and you can get it back any time.
- To go live, open GitHub → **Pull requests → New → `final-pitch` into `main` → Merge**. Vercel redeploys
  production in about 1 minute at the same URL.

**Later updates (Option A):**
```powershell
powershell -ExecutionPolicy Bypass -File .\sync.ps1
git add -A
git commit -m "Update deck"
git push
```

### Option B: a brand-new repo of your own
1. On GitHub, click **New repository**, name it e.g. `trip-dna`, and leave it **empty** (no README, no .gitignore).
2. Push:
   ```powershell
   cd D:\Japan_Hackathon_Final\Japan_Hackathon_Git
   git init -b main
   git add -A
   git commit -m "Trip DNA: final pitch"
   git remote add origin https://github.com/<your-username>/trip-dna.git
   git push -u origin main
   ```
3. You'll get a **new URL**, so update the QR code (step 5).

## 3. Host on Vercel (website route, no installs)
**Option A:** if the existing Vercel project is already linked to the repo, there's nothing to do. Every push deploys.
Check under vercel.com → the project → **Deployments**. The `final-pitch` branch shows as a *Preview*.
Under **Settings → Build & Deployment**, make sure:
- Framework Preset: **Other**
- Build Command / Output Directory / Install Command: **empty** (override off)
- Root Directory: **./**
(The old app had `vercel.json` + `api/`. They're gone now, so Vercel serves plain static files.)

**Option B:** vercel.com → **Add New… → Project → Import** your GitHub repo → Framework Preset **Other**, leave
the build settings empty → **Deploy**. You get e.g. `https://trip-dna.vercel.app`. Every later `git push` redeploys.

## 4. Host on Vercel (CLI route, if you prefer the terminal)
```powershell
cd D:\Japan_Hackathon_Final\Japan_Hackathon_Git
npx vercel login          # sign in in the browser
npx vercel link           # pick your team, then the EXISTING project (Option A) or create a new one (Option B)
npx vercel                # preview deployment → prints a URL to test
npx vercel --prod         # production
```

## 5. If the URL changed (Option B only): update the QR code on the last slide
1. In `D:\Japan_Hackathon_Final\Part4-Arigato\build_assets.py`, set `QR_URL` to the new URL.
2. In `Part4-Arigato\index.html`, update the `href` and the `<code>` text of the `.a4-qr` link to the same URL.
3. Rebuild, then re-sync:
   ```powershell
   cd D:\Japan_Hackathon_Final\Part4-Arigato
   python build_assets.py
   python build_inline.py
   cd ..
   python Final_Html\build.py
   cd Japan_Hackathon_Git
   powershell -ExecutionPolicy Bypass -File .\sync.ps1
   git add -A
   git commit -m "Point QR to new URL"
   git push
   ```

## 6. Check the live site (2 minutes)
- `/` hub loads and every card opens.
- `/deck/`: press → through the deck. The film plays **with sound**, the demo steps through all 30 beats, the finale steps play.
- `/prototype/index.html#click`: → runs the scripted demo.
- Scan the QR on the last slide with a phone. It should open the site.
- F12 → Console: no red errors.

## Troubleshooting
| Problem | Fix |
|---|---|
| `remote: Permission denied` / 403 | You're not a collaborator on that repo. Ask the owner, or use Option B |
| `failed to push some refs` | Someone pushed first: `git pull --rebase`, then `git push` |
| `File … exceeds GitHub's file size limit` | A big file got in. Add it to `.gitignore`, then `git rm --cached <file>`, commit, push |
| Vercel shows the **old** app | You pushed to `final-pitch` and haven't merged into `main` yet (that's a preview), or the build settings still have an override |
| Vercel 404 on `/deck/` | `deck/index.html` is missing. Build the deck, run `sync.ps1`, commit, push |
| Film is silent online | Browsers only play sound after a key press or click. Press → or click the play button on the film slide |
