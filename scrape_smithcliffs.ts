import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

const dataDir = path.resolve('prisma/data/laminate');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const targetJsonPath = path.join(dataDir, 'smithcliffs.json');
const collectionName = 'smithcliffs';

async function fetchSlugs() {
  const url = `https://www.msisurfaces.com/hybrid-rigid-core/${collectionName}/`;
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const products = [];
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes(`/hybrid-rigid-core/${collectionName}/`) && href !== `/hybrid-rigid-core/${collectionName}/`) {
        const slug = href.split('/').filter(Boolean).pop();
        if (slug && !products.includes(slug)) {
            products.push(slug);
        }
    }
  });
  return products.slice(0, 8); // Grab 8 products
}

async function scrapeProduct(slug) {
  const url = `https://www.msisurfaces.com/hybrid-rigid-core/${collectionName}/${slug}/`;
  console.log(`Scraping ${url}...`);

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const html = await response.text();
    const $ = cheerio.load(html);

    const name = $('h1').first().text().trim() || `SMITHCLIFFS ${slug.toUpperCase().replace('-', ' ')}`;

    const images = [];
    $('img').each((i, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src && (src.includes('/images/lvt/') || src.includes('/images/colornames/') || src.includes('/images/roomscenes/') || src.includes('/images/hybrid-rigid-core/')) && !src.includes('thumbnail')) {
        let fullSrc = src;
        if (!fullSrc.startsWith('http')) {
            fullSrc = fullSrc.startsWith('//') ? `https:${fullSrc}` : `https://cdn.msisurfaces.com${fullSrc}`;
        }
        // Filter out roomvo generic images
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
      specs["Series Name"] = "Smithcliffs";
      specs["Thickness"] = "10MM";
      specs["Wear Layer"] = "20MIL";
      specs["Size"] = "7\" x 48\"";
    }

    return {
      name,
      sku: sku || undefined,
      description: description || undefined,
      specs: Object.keys(specs).length > 0 ? specs : undefined,
      image_url: images.length > 0 ? images[0] : "",
      images: images.length > 0 ? images : [],
      price: 3.49
    };
  } catch (e) {
    console.error(`Error scraping ${url}:`, e.message);
    return null;
  }
}

async function main() {
  const slugs = await fetchSlugs();
  console.log(`Found ${slugs.length} slugs to scrape.`);
  
  const updatedData = [];
  for (const slug of slugs) {
    const product = await scrapeProduct(slug);
    if (product) {
      updatedData.push(product);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  
  fs.writeFileSync(targetJsonPath, JSON.stringify(updatedData, null, 2), 'utf-8');
  console.log('Finished updating smithcliffs.json');
}

main();
