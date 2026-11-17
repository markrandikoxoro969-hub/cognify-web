# Cognify — Learn smarter with expert tutors & AI

A premium tuition / learning website with a live AI tutor, built with **React + Vite + Framer Motion**.

## Features
- Animated hero: word-by-word headline reveal, cursor spotlight, 3D-tilt chat mockup, draggable floating cards, scroll parallax
- Subject marquee, bento feature grid with cursor-glow cards and animated SVG/heatmap
- Course catalogue with animated filter tabs (`layoutId`) and `AnimatePresence` layout transitions
- **Live AI tutor** (Cognify Core) – embedded chat section + floating chat widget, sharing one conversation
  - Markdown + simple math rendering, typing indicator, stop/reset, suggested prompts
  - Conversation memory (recent turns are sent with each request, since the API is stateless)
  - Cold-start notice for the Render free tier
- Scroll-linked "How it works" timeline, count-up stats, 3D tilt tutor cards with glare
- Auto-scrolling + draggable testimonials, pricing with monthly/yearly toggle, FAQ accordion
- Respects `prefers-reduced-motion` via `MotionConfig`

## AI API
`GET https://cognify-api-2.onrender.com/chat?text=...` → `{ success, name, model, reply }`

The API does not send CORS headers, so the browser calls the same-origin path **`/api/chat`**, which is proxied:
- **Dev / preview:** Vite proxy (`vite.config.js`)
- **Vercel:** `vercel.json` rewrite
- **Netlify:** `netlify.toml` redirect (status 200 proxy)

> GitHub Pages can't proxy, so the AI chat only works there if the API adds
> `Access-Control-Allow-Origin` (e.g. FastAPI `CORSMiddleware`).

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Deploy
Import the repo on **Vercel** or **Netlify** — no configuration needed.
