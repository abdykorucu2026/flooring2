import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Clear existing data
  await prisma.variant.deleteMany();
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Main Categories
  const vinyl = await prisma.category.create({
    data: {
      name: "Vinyl Flooring",
      slug: "vinyl",
      imageUrl: "/images/category_vinyl.png",
    },
  });

  const laminate = await prisma.category.create({
    data: {
      name: "Laminate Flooring",
      slug: "laminate",
      imageUrl: "/images/category_laminate.png",
    },
  });

  const hardwood = await prisma.category.create({
    data: {
      name: "Hardwood Flooring",
      slug: "hardwood",
      imageUrl: "/images/category_hardwood.png",
    },
  });

  const engineered = await prisma.category.create({
    data: {
      name: "Engineered Wood Flooring",
      slug: "engineered-wood",
      imageUrl: "/images/category_engineered.png",
    },
  });

  // Create Subcategories
  const luxuryVinyl = await prisma.category.create({
    data: {
      name: "Luxury Vinyl Flooring",
      slug: "luxury-vinyl-flooring",
      parentId: vinyl.id,
    },
  });

  const stoneLookTile = await prisma.category.create({
    data: {
      name: "Luxury Vinyl Tile with Stone Look",
      slug: "stone-look-vinyl-tile",
      parentId: vinyl.id,
    },
  });

  const glueDownVinyl = await prisma.category.create({
    data: {
      name: "Glue-Down Luxury Vinyl Flooring",
      slug: "glue-down-vinyl",
      parentId: vinyl.id,
    },
  });

  // Laminate Subcategories
  const laminate10mm = await prisma.category.create({
    data: {
      name: "10 MM Thickness",
      slug: "10mm-laminate",
      parentId: laminate.id,
    },
  });

  const laminate12mm = await prisma.category.create({
    data: {
      name: "12 MM Thickness",
      slug: "12mm-laminate",
      parentId: laminate.id,
    },
  });

  // Hardwood Subcategories
  const ash = await prisma.category.create({
    data: { name: "Ash", slug: "ash-hardwood", parentId: hardwood.id },
  });
  const maple = await prisma.category.create({
    data: { name: "Maple", slug: "maple-hardwood", parentId: hardwood.id },
  });
  const redOak = await prisma.category.create({
    data: { name: "Red Oak", slug: "red-oak-hardwood", parentId: hardwood.id },
  });
  const whiteOak = await prisma.category.create({
    data: { name: "White Oak", slug: "white-oak-hardwood", parentId: hardwood.id },
  });

  // Engineered Subcategories
  const mccarran = await prisma.category.create({
    data: { name: "MCCARRAN COLLECTION", slug: "mccarran-collection", parentId: engineered.id },
  });
  const ladson = await prisma.category.create({
    data: { name: "LADSON COLLECTION", slug: "ladson-collection", parentId: engineered.id },
  });

  // Helper for slugs
  const slugify = (text: string) => text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  // Seed Vinyl Products from JSON files
  const vinylDir = path.resolve("prisma/data/vinyl");
  const vinylFiles = fs.readdirSync(vinylDir).filter(file => file.endsWith(".json"));

  for (const file of vinylFiles) {
    const collectionName = file.replace(".json", "");
    const data = JSON.parse(fs.readFileSync(path.join(vinylDir, file), "utf-8"));
    
    // Determine category based on collection
    let targetCategoryId = luxuryVinyl.id;
    if (collectionName === "trecento") {
      targetCategoryId = stoneLookTile.id;
    }

    for (const item of data) {
      await prisma.product.create({
        data: {
          name: item.name,
          slug: slugify(item.name),
          categoryId: targetCategoryId,
          description: item.description || null,
          brand: item.brand || "MSI",
          collection: item.collection || (collectionName.charAt(0).toUpperCase() + collectionName.slice(1)),
          specs: JSON.stringify(item.specs || {}),
          images: {
            create: item.images 
              ? item.images.map((url: string) => ({ url }))
              : [{ url: item.image_url }]
          },
          variants: {
            create: [{
              price: item.price || 2.29,
              sku: item.sku || (slugify(item.name) + "-default"),
              stock: 1000
            }]
          }
        }
      });
    }
    console.log(`${collectionName} products created!`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
