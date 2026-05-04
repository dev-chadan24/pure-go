import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let logs = '';
  
  page.on('console', msg => {
    logs += `CONSOLE [${msg.type()}]: ${msg.text()}\n`;
  });
  
  page.on('pageerror', error => {
    logs += `PAGE ERROR: ${error.message}\n`;
    logs += `PAGE ERROR STACK: ${error.stack}\n`;
  });

  try {
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
  } catch (e) {
    logs += `NAVIGATION ERROR: ${e.message}\n`;
  }
  
  fs.writeFileSync('browser_logs.txt', logs);
  await browser.close();
})();
