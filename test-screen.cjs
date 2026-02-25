const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 }
    });

    console.log('Navigating to local portfolio...');
    await page.goto('http://localhost:4173/Portfolio/');

    console.log('Waiting for Framer Motion animations to settle...');
    await page.waitForTimeout(3000);

    const screenshotPath = '/home/dhili/.gemini/antigravity/brain/a9b288d6-b942-4bb2-9bfa-f94973ae137a/portfolio_ultrawide_1920.webp';
    await page.screenshot({ path: screenshotPath });

    await browser.close();
    console.log(`Screenshot saved successfully to: ${screenshotPath}`);
  } catch (error) {
    console.error('Playwright Error:', error);
  }
})();
