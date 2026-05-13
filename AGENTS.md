<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ABBY Floor Project Guidelines
When working on the ABBY Floor e-commerce platform, follow these rules:

1. **Tech Stack**: Use Next.js 15 (App Router), Tailwind CSS, and shadcn/ui.
2. **Database**: We use Prisma with SQLite (`dev.db`). Any schema changes require `npx prisma db push` and `npx prisma generate`.
3. **Data Population**: Product data is stored in `prisma/data/vinyl/*.json` and seeded via `prisma/seed.ts`. Use the Node.js scraping scripts (e.g. `scrape_prescott_real.ts`) to pull real data from manufacturer sites (like MSI). Always run `npx prisma db seed` after modifying JSON files.
4. **Design Aesthetic**: Premium, clean, and modern. Use vibrant visuals, rounded corners, subtle shadows, and Lucide icons.
5. **Components**: For icons like social media logos (Facebook, Instagram) that aren't natively supported by lucide-react without extra config, use inline SVG paths or custom components to avoid build-time errors.
6. **Next.js Async Routing**: Always treat `params` as a Promise in dynamic routes (e.g., `const { slug } = await params;`).
