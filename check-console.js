import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  // Navigate to main
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  console.log('--- At Root ---');
  let bodyHandle = await page.$('body');
  let html = await page.evaluate(body => body.innerHTML, bodyHandle);
  console.log('Root body length:', html.length);
  
  // Navigate to AI
  await page.goto('http://localhost:3000/kaizen-ai', { waitUntil: 'networkidle2' });
  console.log('--- At /kaizen-ai ---');
  bodyHandle = await page.$('body');
  html = await page.evaluate(body => body.innerHTML, bodyHandle);
  console.log('AI body length:', html.length);
  // Get text content of root element to see what's rendered
  const rootText = await page.evaluate(() => document.getElementById('root').innerText);
  console.log('Root text:', rootText.substring(0, 500));

  await browser.close();
})();
