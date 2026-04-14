# GreenHub

> The digital component of a hybrid physical/digital birthday gift — a 3D-printed desk nameplate with an embedded QR code.

## Stack

- **Vite** + **React 18**
- Hosted on **GitHub Pages** (auto-deployed via GitHub Actions)
- Served through a **Vercel gateway redirect** (permanent — survives repo transfers)

---

## Setup (Before Gifting)

### 1. Clone & customize

```bash
git clone https://github.com/YOUR_USERNAME/GreenHub
cd GreenHub
npm install
npm run dev
```

Open `src/components/MainExperience.jsx` and fill in the two placeholders:
- `[YOUR NAME]` — your name as the gifter
- `[YOUR PERSONAL BIRTHDAY MESSAGE GOES HERE]` — write Emre's birthday message

### 2. Set the correct base path

Open `vite.config.js` and confirm the `base` value matches your repo name exactly:

```js
base: '/GreenHub/',
```

### 3. Enable GitHub Pages

In your repo Settings → Pages:
- Source: **GitHub Actions**

Push to `main` — the workflow in `.github/workflows/deploy.yml` handles the rest.

### 4. Update the Vercel gateway

In your private Vercel/`Greenie` repo, update `index.html` to redirect to the new GitHub Pages URL:

```html
<meta http-equiv="refresh" content="0; url='https://YOUR_USERNAME.github.io/GreenHub/'">
```

---

## On Emre's Birthday

1. Transfer this repo to Emre's GitHub account
2. Emre enables GitHub Pages on his copy (or accepts the existing deployment)
3. Update the Vercel gateway one final time to point to his URL
4. The QR code on the physical nameplate keeps working — permanently

---

## Architecture

```
[3D Nameplate QR] → [Vercel Gateway] → [This GitHub Pages site]
    permanent           updateable           transferable
```

The physical QR code never changes. The redirect layer handles everything else.
