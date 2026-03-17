# KSU Landing Page

Modern landing page for Kurgan State University (KSU), built with Next.js App Router.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Radix UI + Lucide Icons

## Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Docker

Build image:

```bash
docker build -t ksu-landing .
```

Run container:

```bash
docker run --rm -p 3000:3000 ksu-landing
```

## Project Structure

- `src/app` — Next.js app entry, layout, global styles
- `src/components` — UI blocks and page sections
- `src/lib` — content and helpers
- `public/images` — static assets
