import { chromium } from 'playwright-core';

const EXE = process.env.HOME + '/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe';
const URL = process.argv[2] || 'http://localhost:8123/';

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

let bytes = 0, reqs = 0;
page.on('response', async (r) => {
  reqs++;
  try { const b = (await r.body()).length; bytes += b; } catch {}
});

const t0 = Date.now();
await page.goto(URL, { waitUntil: 'load' });
const loadMs = Date.now() - t0;

const paint = await page.evaluate(() => {
  const fcp = performance.getEntriesByName('first-contentful-paint')[0];
  const nav = performance.getEntriesByType('navigation')[0];
  return { fcp: fcp ? Math.round(fcp.startTime) : null, dcl: Math.round(nav.domContentLoadedEventEnd) };
});

const blurLayers = await page.evaluate(() =>
  [...document.querySelectorAll('*')].filter((el) => {
    const s = getComputedStyle(el);
    return (s.backdropFilter && s.backdropFilter !== 'none') || (s.webkitBackdropFilter && s.webkitBackdropFilter !== 'none');
  }).length
);

// FPS during a 3s scripted scroll through the whole page
const fps = await page.evaluate(() => new Promise((resolve) => {
  const max = document.documentElement.scrollHeight - innerHeight;
  let frames = 0, last = performance.now();
  const start = last, dur = 3000;
  function tick(now) {
    frames++;
    const p = (now - start) / dur;
    window.scrollTo(0, Math.min(max, max * p));
    if (now - start < dur) requestAnimationFrame(tick);
    else resolve(Math.round((frames / (now - start)) * 1000));
  }
  requestAnimationFrame(tick);
}));

console.log(JSON.stringify({
  loadMs, fcp: paint.fcp, dcl: paint.dcl,
  requests: reqs, transferKB: Math.round(bytes / 1024),
  backdropBlurLayers: blurLayers, scrollFPS: fps,
}, null, 2));

await browser.close();
