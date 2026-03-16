# GaffyStudios 🎬

> A cinematic creative studio site — showcasing photography,
> videography and cinematography work alongside a digital
> products shop (LUTs + wallpapers).
>
> Built as a portfolio piece demonstrating Next.js, Three.js,
> GSAP, and Framer Motion.

**Live:** [gaffystudios.com](https://gaffystudios.com)

![GaffyStudios Preview](./public/preview.png)

## Tech Stack

| Layer      | Tool                         |
| ---------- | ---------------------------- |
| Framework  | Next.js 14 (App Router)      |
| Styling    | Tailwind CSS                 |
| Animation  | Framer Motion + GSAP         |
| Scroll     | Lenis                        |
| 3D / WebGL | Three.js + React Three Fiber |
| Payments   | Lemon Squeezy                |
| Deployment | Vercel                       |

## Getting Started

```bash
git clone git@github.com:gafitenison/gaffystudios.git
cd gaffystudios
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
gaffystudios/
├── app/
│   ├── page.tsx              # Homepage
│   ├── work/
│   │   └── [slug]/           # Individual project pages
│   ├── shop/                 # LUTs + Wallpapers
│   └── about/                # About page
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── layout/               # Nav, Footer
│   └── sections/             # Page sections
├── content/
│   └── work/                 # Work pieces (MDX)
├── public/
│   └── images/               # Static assets
└── lib/
    └── utils.ts              # Helper functions
```

## Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID=your_store_id
LEMON_SQUEEZY_API_KEY=your_api_key
```

## Features

- 🎬 Full-bleed cinematic work showcase
- 🖱️ Custom cursor with hover morphing
- ✨ WebGL hero background (Three.js)
- 🎭 Page transitions (Framer Motion)
- 🧲 Magnetic buttons (GSAP)
- 📜 Smooth scroll (Lenis)
- 🛍️ Digital product shop (LUTs + Wallpapers)
- 📱 Fully responsive

## Deployment

Auto-deploys to Vercel on every push to `main`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

© 2026 GaffyStudios · Built by [@gafitenison](https://github.com/gafitenison)
