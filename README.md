# 11-gaming.com

11's personal site — games, space facts, and an art gallery he can grow over time.

## Editing the content

Almost everything you'll want to change lives in **`js/main.js`**, at the top, in three clearly marked lists:

- `GAMES` — add/remove games and short notes
- `SPACE_FACTS` — the facts the terminal shows when you tap the planet
- `ART` — filenames for drawings (put the image files in the `/art` folder first)

You don't need to touch the HTML or CSS to update content.

## Publish it for free with GitHub Pages

### 1. Create the GitHub repo
1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click **New repository**. Name it anything, e.g. `11-gaming-site`. Set it to **Public**. Don't add a README (you already have one).
3. Click **Create repository**.

### 2. Upload the site
Easiest way, no command line needed:
1. On the new repo's page, click **uploading an existing file**.
2. Drag in everything from this folder (`index.html`, `css/`, `js/`, `art/`, `CNAME`, `README.md`).
3. Click **Commit changes**.

(If you're comfortable with git/terminal, you can instead `git init`, `git add .`, `git commit`, and `git push` to a new repo.)

### 3. Turn on GitHub Pages
1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Click **Save**.
4. GitHub will give you a URL like `https://yourusername.github.io/11-gaming-site/`. Wait a minute or two, then check it loads.

### 4. Connect your GoDaddy domain (11-gaming.com)

The `CNAME` file is already in this folder, set to `11-gaming.com` — that tells GitHub Pages which domain to expect. You still need to point the domain itself at GitHub from GoDaddy's side:

**In GoDaddy (DNS settings for 11-gaming.com):**

Add these records (delete any conflicting default "Parked" or "Forwarding" A records first):

| Type  | Name | Value               |
|-------|------|---------------------|
| A     | @    | 185.199.108.153     |
| A     | @    | 185.199.109.153     |
| A     | @    | 185.199.110.153     |
| A     | @    | 185.199.111.153     |
| CNAME | www  | yourusername.github.io |

**In GitHub (repo Settings → Pages):**
1. Under **Custom domain**, type `11-gaming.com` and click **Save**. (This confirms the CNAME file.)
2. Wait for the DNS check to pass — can take anywhere from a few minutes to a few hours.
3. Once it's verified, tick **Enforce HTTPS** so the site loads securely.

DNS changes can take up to 24-48 hours to fully propagate, though it's usually much faster. If `11-gaming.com` doesn't load right away, give it some time and try again.

## Notes
- The site is plain HTML/CSS/JS — no build step, no dependencies to install.
- Respects reduced-motion settings for accessibility.
- Works on mobile.
