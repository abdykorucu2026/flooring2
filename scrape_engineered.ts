import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

const dataDir = path.resolve('prisma/data/engineered');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

async function fetchSlugs(collectionName) {
  const url = `https://www.msisurfaces.com/engineered-hardwood-flooring/${collectionName}/`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Failed to fetch ${url} - Status: ${res.status}`);
    return [];
  }
  const html = await res.text();
  const $ = cheerio.load(html);

  const products = [];
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes(`/engineered-hardwood-flooring/${collectionName}/`) && href !== `/engineered-hardwood-flooring/${collectionName}/`) {
        const slug = href.split('/').filter(Boolean).pop();
        if (slug && !products.includes(slug)) {
            products.push(slug);
        }
    }
  });
  return products.slice(0, 6); // Grab up to 6 products per collection
}

async function scrapeProduct(collectionName, slug) {
  const url = `https://www.msisurfaces.com/engineered-hardwood-flooring/${collectionName}/${slug}/`;
  console.log(`Scraping ${url}...`);

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const html = await response.text();
    const $ = cheerio.load(html);

    const name = $('h1').first().text().trim() || `${collectionName.toUpperCase()} ${slug.toUpperCase().replace('-', ' ')}`;

    const images = [];
    $('img').each((i, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src && (src.includes('/images/wood/') || src.includes('/images/roomscenes/') || src.includes('/images/colornames/')) && !src.includes('thumbnail')) {
        let fullSrc = src;
        if (!fullSrc.startsWith('http')) {
            fullSrc = fullSrc.startsWith('//') ? `https:${fullSrc}` : `https://cdn.msisurfaces.com${fullSrc}`;
        }
        if (!images.includes(fullSrc) && !fullSrc.includes('roomvo')) {
            images.push(fullSrc);
        }
      }
    });

    const description = $('div.product-description p').first().text().trim() || 
                        $('div.description p').first().text().trim() ||
                        $('meta[name="description"]').attr('content') || "";

    let sku = "";
    $('td').each((i, el) => {
      if ($(el).text().trim().toLowerCase() === 'id' || $(el).text().trim().toLowerCase() === 'sku') {
        sku = $(el).next('td').text().trim();
      }
    });
    if (!sku) {
        const skuMatch = html.match(/SKU:\s*([A-Z0-9-]+)/i);
        if (skuMatch) sku = skuMatch[1];
    }
    
    const specs = {};
    $('table.specs-table tr, table.spec-table tr, .product-specs tr').each((i, el) => {
      const key = $(el).find('th, td.label, td:first-child').text().trim().replace(/:$/, '');
      const value = $(el).find('td.value, td:nth-child(2)').text().trim();
      if (key && value && key.length < 30 && value.length < 50) {
        specs[key] = value;
      }
    });

    if (Object.keys(specs).length === 0) {
      specs["Series Name"] = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);
      specs["Thickness"] = "5/8\"";
      specs["Wear Layer"] = "Wood Veneer";
      specs["Size"] = "Random Length";
    }

    return {
      name,
      sku: sku || undefined,
      description: description || undefined,
      specs: Object.keys(specs).length > 0 ? specs : undefined,
      image_url: images.length > 0 ? images[0] : "",
      images: images.length > 0 ? images : [],
      price: collectionName === 'mccarran' ? 5.89 : 4.99
    };
  } catch (e) {
    console.error(`Error scraping ${url}:`, e.message);
    return null;
  }
}

async function scrapeCollection(collectionName) {
  const slugs = await fetchSlugs(collectionName);
  console.log(`Found ${slugs.length} slugs for ${collectionName}.`);
  
  const updatedData = [];
  for (const slug of slugs) {
    const product = await scrapeProduct(collectionName, slug);
    if (product) {
      updatedData.push(product);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  
  const targetJsonPath = path.join(dataDir, `${collectionName}.json`);
  fs.writeFileSync(targetJsonPath, JSON.stringify(updatedData, null, 2), 'utf-8');
  console.log(`Finished updating ${collectionName}.json`);
}

async function main() {
  await scrapeCollection('mccarran');
  await scrapeCollection('ladson');
}

main();
