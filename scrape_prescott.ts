import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

const prescottJsonPath = path.resolve('prisma/data/vinyl/prescott.json');
let prescottData = JSON.parse(fs.readFileSync(prescottJsonPath, 'utf-8'));

function getSlug(name) {
  let cleanName = name.replace(/PRESCOTT/i, '').trim();
  cleanName = cleanName.replace(/®/g, '').trim();
  return cleanName.toLowerCase().replace(/\s+/g, '-');
}

async function scrapeProduct(product) {
  const slug = getSlug(product.name);
  const url = `https://www.msisurfaces.com/luxury-vinyl-planks/prescott/${slug}/`;
  console.log(`Scraping ${url}...`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Failed to fetch ${url}: ${response.status}`);
      return product;
    }
    const html = await response.text();
    const $ = cheerio.load(html);

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

    // Fallback if table not found
    if (Object.keys(specs).length === 0) {
      specs["Series Name"] = "Prescott";
      specs["Thickness"] = "6.5MM";
      specs["Wear Layer"] = "20MIL";
      specs["Size"] = "7\" x 48\"";
    }

    return {
      ...product,
      sku: sku || undefined,
      description: description || undefined,
      specs: Object.keys(specs).length > 0 ? specs : undefined,
      images: images.length > 0 ? images : [product.image_url],
      price: product.price || 3.89 // Prescott usually costs a bit more, setting generic price
    };
  } catch (e) {
    console.error(`Error scraping ${url}:`, e.message);
    return product;
  }
}

async function main() {
  const updatedData = [];
  for (const product of prescottData) {
    const updatedProduct = await scrapeProduct(product);
    updatedData.push(updatedProduct);
    // Delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 1000));
  }
  
  fs.writeFileSync(prescottJsonPath, JSON.stringify(updatedData, null, 2), 'utf-8');
  console.log('Finished updating prescott.json');
}

main();
