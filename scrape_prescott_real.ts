import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

const prescottJsonPath = path.resolve('prisma/data/vinyl/prescott.json');

const slugsToScrape = [
  'akadia',
  'finely',
  'katella-ash',
  'sandino',
  'whitfield-gray',
  'woburn'
];

async function scrapeProduct(slug) {
  const url = `https://www.msisurfaces.com/luxury-vinyl-planks/prescott/${slug}/`;
  console.log(`Scraping ${url}...`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Failed to fetch ${url}: ${response.status}`);
      return null;
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    // Name
    const name = $('h1').first().text().trim() || `PRESCOTT ${slug.toUpperCase().replace('-', ' ')}`;

    // Images
    const images = [];
    $('img').each((i, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src && (src.includes('/images/lvt/') || src.includes('/images/colornames/') || src.includes('/images/roomscenes/')) && !src.includes('thumbnail')) {
        let fullSrc = src;
        if (!fullSrc.startsWith('http')) {
            fullSrc = fullSrc.startsWith('//') ? `https:${fullSrc}` : `https://cdn.msisurfaces.com${fullSrc}`;
        }
        if (!images.includes(fullSrc)) {
            images.push(fullSrc);
        }
      }
    });

    // Description
    const description = $('div.product-description p').first().text().trim() || 
                        $('div.description p').first().text().trim() ||
                        $('meta[name="description"]').attr('content') || "";

    // SKU
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
    
    // Specs
    const specs = {};
    $('table.specs-table tr, table.spec-table tr, .product-specs tr').each((i, el) => {
      const key = $(el).find('th, td.label, td:first-child').text().trim().replace(/:$/, '');
      const value = $(el).find('td.value, td:nth-child(2)').text().trim();
      if (key && value && key.length < 30 && value.length < 50) {
        specs[key] = value;
      }
    });

    if (Object.keys(specs).length === 0) {
      specs["Series Name"] = "Prescott";
      specs["Thickness"] = "6.5MM";
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
      price: 3.89 
    };
  } catch (e) {
    console.error(`Error scraping ${url}:`, e.message);
    return null;
  }
}

async function main() {
  const updatedData = [];
  for (const slug of slugsToScrape) {
    const product = await scrapeProduct(slug);
    if (product) {
      updatedData.push(product);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  
  fs.writeFileSync(prescottJsonPath, JSON.stringify(updatedData, null, 2), 'utf-8');
  console.log('Finished updating prescott.json');
}

main();
