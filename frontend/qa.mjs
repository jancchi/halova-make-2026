import { chromium } from 'playwright';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000');
  
  // Wait for fonts to load implicitly or explicitly
  await page.waitForTimeout(2000);

  // QA Scenario 1
  const s1 = await page.evaluate(() => {
    const bodyFont = getComputedStyle(document.body).fontFamily;
    const heroFont = getComputedStyle(document.querySelector('[data-testid="hero-title"]')).fontFamily;
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim();
    const text = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
    return { bodyFont, heroFont, bg, text };
  });
  console.log('Scenario 1 Results:', s1);

  // Take screenshot for Scenario 1
  fs.mkdirSync('../.sisyphus/evidence', { recursive: true });
  await page.screenshot({ path: '../.sisyphus/evidence/task-2-typography.png' });

  // QA Scenario 2
  const s2 = await page.evaluate(() => {
    const btn = document.querySelector('a.bg-indigo-600') || document.querySelector('button') || document.querySelector('a');
    let btnRadius = btn ? getComputedStyle(btn).borderRadius : null;
    return { btnRadius };
  });
  console.log('Scenario 2 Results:', s2);

  await page.screenshot({ path: '../.sisyphus/evidence/task-2-sharp-edges.png' });

  await browser.close();
}

run().catch(console.error);