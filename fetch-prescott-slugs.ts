import * as cheerio from 'cheerio';

async function main() {
  const url = 'https://www.msisurfaces.com/luxury-vinyl-planks/prescott/';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const products = [];
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('/luxury-vinyl-planks/prescott/') && href !== '/luxury-vinyl-planks/prescott/') {
        const slug = href.split('/').filter(Boolean).pop();
        if (slug && !products.includes(slug)) {
            products.push(slug);
        }
    }
  });
  console.log("Found slugs:", products);
}

main();
