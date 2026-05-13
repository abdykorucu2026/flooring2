import * as cheerio from 'cheerio';

async function test() {
  const url = 'https://www.msisurfaces.com/luxury-vinyl-planks/prescott/borealis/';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const images = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src) images.push(src);
  });
  
  const desc = $('div.product-description p').first().text().trim() || 
               $('div.description p').first().text().trim() ||
               $('meta[name="description"]').attr('content');

  console.log("Found Images:", images.filter(s => s.includes('lvt') || s.includes('roomscenes') || s.includes('colornames')).slice(0, 5));
  console.log("Description:", desc);
  
  // check title to see if it's a 404 page disguised as 200
  console.log("Title:", $('title').text());
}
test();
