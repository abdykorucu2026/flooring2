import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

const targetJsonPath = path.resolve('prisma/data/vinyl/trecento.json');
const collectionName = 'trecento';

const knownSlugs = [
  'calacatta-legend',
  'calacatta-marbello',
  'calacatta-serra',
  'calacatta-venosa-gold',
  'carrara-avell',
  'ivorelle',
  'mountains-gray',
  'quarzo-taj',
  'stormbound',
  'white-ocean',
  'windsor-crest',
  'windsor-isle',
];

async function scrapeProduct(slug: string) {
  const url = `https://www.msisurfaces.com/luxury-vinyl-tile/${collectionName}/${slug}/`;
  console.log(`Scraping ${url}...`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Try alternate URL pattern
      const altUrl = `https://www.msisurfaces.com/luxury-vinyl-planks/${collectionName}/${slug}/`;
      console.log(`  Trying alternate: ${altUrl}`);
      const altResponse = await fetch(altUrl);
      if (!altResponse.ok) return null;
      return await parseHtml(await altResponse.text(), slug);
    }
    return await parseHtml(await response.text(), slug);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error(`Error scraping ${slug}:`, message);
    return null;
  }
}

async function parseHtml(html: string, slug: string) {
  const $ = cheerio.load(html);

  const name = $('h1').first().text().trim() || `Trecento ${slug}`;

  const images: string[] = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || '';
    if (src && (
      src.includes('/images/lvt/') ||
      src.includes('/images/colornames/') ||
      src.includes('/images/roomscenes/')
    ) && !src.includes('thumbnail')) {
      let fullSrc = src;
      if (!fullSrc.startsWith('http')) {
        fullSrc = fullSrc.startsWith('//') ? `https:${fullSrc}` : `https://cdn.msisurfaces.com${fullSrc}`;
      }
      if (!images.includes(fullSrc) && !fullSrc.includes('roomvo')) {
        images.push(fullSrc);
      }
    }
  });

  const description =
    $('div.product-description p').first().text().trim() ||
    $('div.description p').first().text().trim() ||
    $('meta[name="description"]').attr('content') ||
    '';

  const specs: Record<string, string> = {};
  $('table.specs-table tr, table.spec-table tr, .product-specs tr').each((i, el) => {
    const key = $(el).find('th, td.label, td:first-child').text().trim().replace(/:$/, '');
    const value = $(el).find('td.value, td:nth-child(2)').text().trim();
    if (key && value && key.length < 30 && value.length < 50) {
      specs[key] = value;
    }
  });

  if (Object.keys(specs).length === 0) {
    specs['Series Name'] = 'Trecento';
    specs['Thickness'] = '5MM';
    specs['Wear Layer'] = '12MIL';
    specs['Size'] = '12" x 24"';
    specs['Finish'] = 'PietraTech';
    specs['Backing'] = '1MM IXPE';
  }

  return {
    name: name || `Trecento ${slug}`,
    description: description || undefined,
    specs,
    image_url: images.length > 0 ? images[0] : '',
    images: images.length > 0 ? images : [],
    brand: 'MSI',
    collection: 'Trecento',
    price: 3.99,
  };
}

async function main() {
  const updatedData = [];

  for (const slug of knownSlugs) {
    const product = await scrapeProduct(slug);
    if (product) {
      updatedData.push(product);
      console.log(`  ✓ ${product.name} — ${product.images.length} images`);
    }
    await new Promise(r => setTimeout(r, 800));
  }

  fs.writeFileSync(targetJsonPath, JSON.stringify(updatedData, null, 2), 'utf-8');
  console.log(`\nFinished updating trecento.json (${updatedData.length} products)`);
}

main();
