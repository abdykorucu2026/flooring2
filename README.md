# ABBY Floor - Premium E-Commerce Platform

ABBY Floor is a modern, high-performance e-commerce platform built for premium flooring solutions (Luxury Vinyl Planks, Hardwood, Laminate, Engineered Wood).

## Tech Stack
- **Framework:** Next.js 15 (App Router, Server Components)
- **Styling:** Tailwind CSS + shadcn/ui + Lucide Icons
- **Database:** SQLite (for development) + Prisma ORM
- **State Management:** Zustand (for Cart - planned)
- **Data Enrichment:** Custom Node.js scrapers (Cheerio) for fetching rich data from manufacturer websites (e.g., MSI).

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup the Database
The project uses Prisma with an SQLite database (`dev.db`). Initialize the database and apply migrations:
```bash
npx prisma generate
npx prisma db push
```

### 3. Seed the Database
To populate the database with categories and real product data (including Andover, Prescott, and Trecento collections):
```bash
npx prisma db seed
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## Data Scraping & Enrichment
To fetch the latest products, images, specifications, and descriptions from manufacturers (like MSI), you can run the custom scraping scripts located in the root directory:
```bash
npx tsx scrape_prescott_real.ts
npx tsx scrape_andover.ts
```
After scraping, the JSON files in `prisma/data/vinyl/` will be updated. You must run `npx prisma db seed` again to apply these changes to the SQLite database.

## Architecture & Features
- **Dynamic Routing:** Categories (`/category/[slug]`) and Products (`/product/[slug]`) are dynamically generated based on the database.
- **Interactive UI:** Features a custom Product Gallery, area calculator (with 10% waste calculation), and a responsive, premium design aesthetic.
- **Image Optimization:** Uses `next/image` to serve remote images from `cdn.msisurfaces.com` and other configured domains.
