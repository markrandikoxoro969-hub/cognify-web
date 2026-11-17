# Cognify — Learn smarter with expert tutors & AI

A premium tuition / learning website with a live AI tutor, built with **React + Vite + Motion** and a lightweight custom CSS theme.

## Features
- Animated hero: staggered headline, locally hosted licensed Annapurna photo, SVG background beams, Devanagari lettering and layered Himalayan parallax
- Subject marquee, Buddha-eyes ornamental divider, bento feature grid and animated SVG/heatmap
- Course catalogue with animated filter tabs (`layoutId`) and `AnimatePresence` layout transitions
- **Live AI tutor** (Cognify Core) – embedded chat section + floating chat widget, sharing one conversation
  - Markdown + simple math rendering, typing indicator, stop/reset, suggested prompts
  - Conversation memory (recent turns are sent with each request, since the API is stateless)
  - Cold-start notice for the Render free tier
- Scroll-linked "How it works" timeline, count-up stats, tutor cards, responsive testimonial grid, pricing with monthly/yearly toggle and FAQ accordion
- A small CSS-animated diya beside the AI tutor; custom motifs respect reduced-motion preferences
- Respects `prefers-reduced-motion` via `MotionConfig`

## AI API
`GET https://cognify-api-2.onrender.com/chat?text=...` → `{ success, name, model, reply }`

The API does not send CORS headers, so the browser calls the same-origin path **`/api/chat`**, which is proxied:
- **Dev / preview:** Vite proxy (`vite.config.js`)
- **Vercel:** `vercel.json` rewrite
- **Netlify:** `netlify.toml` redirect (status 200 proxy)

> GitHub Pages can't proxy, so the AI chat only works there if the API adds
> `Access-Control-Allow-Origin` (e.g. FastAPI `CORSMiddleware`).

## Run locally (beginner friendly)
1. Install the project's dependencies (including Motion): `npm install`
2. Start the local website: `npm run dev`, then open the URL printed in the terminal (usually http://localhost:5173).
3. Check the production build: `npm run build` (the finished files go into `dist/`).

Motion is imported from `motion/react`. The Himalayan beams and symbols are small local SVG/CSS components, so no shadcn CLI command or external image service is required.

## Deploy
Import the repo on **Vercel** or **Netlify** — no configuration needed.
