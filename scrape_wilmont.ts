import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

const targetJsonPath = path.resolve('prisma/data/vinyl/wilmont.json');
const collectionName = 'wilmont';

async function fetchSlugs() {
  const url = `https://www.msisurfaces.com/luxury-vinyl-planks/${collectionName}/`;
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const products = [];
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes(`/luxury-vinyl-planks/${collectionName}/`) && href !== `/luxury-vinyl-planks/${collectionName}/`) {
        const slug = href.split('/').filter(Boolean).pop();
        if (slug && !products.includes(slug)) {
            products.push(slug);
        }
    }
  });
  return products.slice(0, 8); // Just grab 8 products to not take too long
}

async function scrapeProduct(slug) {
  const url = `https://www.msisurfaces.com/luxury-vinyl-planks/${collectionName}/${slug}/`;
  console.log(`Scraping ${url}...`);

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const html = await response.text();
    const $ = cheerio.load(html);

    const name = $('h1').first().text().trim() || `WILMONT ${slug.toUpperCase().replace('-', ' ')}`;

    const images = [];
    $('img').each((i, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src && (src.includes('/images/lvt/') || src.includes('/images/colornames/') || src.includes('/images/roomscenes/')) && !src.includes('thumbnail')) {
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
      specs["Series Name"] = "Wilmont";
      specs["Thickness"] = "2MM"; // Typically Wilmont is 2mm
      specs["Wear Layer"] = "12MIL";
      specs["Size"] = "7\" x 48\"";
    }

    return {
      name,
      sku: sku || undefined,
      description: description || undefined,
      specs: Object.keys(specs).length > 0 ? specs : undefined,
      image_url: images.length > 0 ? images[0] : "",
      images: images.length > 0 ? images : [],
      price: 2.49 // Cheaper since it's glue down
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
  console.log('Finished updating wilmont.json');
}

main();
