import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe';
const [url, sel, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: EXE, headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: 'networkidle' });
if (sel && sel !== '-') {
  const el = p.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(900);
  await el.screenshot({ path: out });
} else {
  await p.waitForTimeout(600);
  await p.screenshot({ path: out });
}
await b.close();
console.log('shot:', out);
