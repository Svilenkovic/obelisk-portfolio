# Nacionale Streetwear

Full source repository for the Nacionale web shop: Next.js frontend (static export), PHP API, SQL schema, and Nginx deployment configuration.

## Tech Stack

- Next.js 16 (App Router, `output: "export"`)
- React 19 + TypeScript
- Tailwind CSS 4
- GSAP + Three.js
- PHP API (`backend/api`)
- MySQL schema (`backend/sql`)

## Project Structure

- `src/`: frontend source (app, components, hooks, libraries)
- `backend/api/`: PHP endpoints (`products`, `collections`, `orders`)
- `backend/sql/`: database schema and SQL resources
- `nginx/`: deployment configuration example
- `next.config.ts`: static export configuration

## Local Development (Frontend)

```bash
npm install
npm run dev
```

## Build & Quality Checks

```bash
npm run build
npm run lint
```

## Backend Notes

API endpoints require PHP + MySQL runtime.
Before production deployment, validate:

- database credentials and access control
- prepared statements and error handling
- endpoint behavior (`orders.php`, `products.php`, etc.)

## Live Site

- https://nacionale.svilenkovic.rs

## Production Deployment Flow

1. Build frontend: `npm run build`
2. Deploy `out/` to web root
3. Deploy/update `backend/api` and SQL changes as required
4. Run final API + frontend integration checks
