const fs = require('fs').promises;

async function screenshot({ page, url, options }) {
  try {
    const { snapDir, viewport, devices, opts, screenshots = [] } = options;
    const { location, script, style, name, scroll, element } = opts;
    // visit page
    const styles = Object.keys(style)
      .map((key) => `${key}: ${style[key]};`)
      .join(' ');
    if (url.includes('data:image')) {
      await page.setContent(
        `<html><body style="margin: 0;"><img style="margin: 0; width:100%; ${styles}" src="${url}" /></body></html>`
      );
    } else {
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.addStyleTag({ content: `body{ ${styles} }` });
    }

    const device = typeof viewport === 'string';

    // set viewport
    await page.emulateMediaType('screen');
    if (device) {
      const emulatedDevice = devices[viewport];
      await page.emulate(emulatedDevice);
    } else {
      await page.setViewport({ ...viewport, deviceScaleFactor: 4 });
    }

    const path = `${location}/${name}_${
      device ? viewport : Object.values(viewport).join('X')
    }.png`;

    // lazy loaded images
    if (scroll) {
      await scrollPage(page);
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    // set element
    if (element) {
      const element = await page.$(element);
      const snap = await element.screenshot({ type: 'png' });
      const buffer = Buffer.from(snap).toString('base64');
      await page.setContent(
        `<html><body style="margin: 0;"><img style="margin: 0; width:100%; ${styles}" src="data:image/jpeg;base64,${buffer}" /></body></html>`
      );
    }

    // before script
    if (script) await page.evaluate(script);

    // create snap dir
    const exists = await fs
      .access(snapDir)
      .then(() => 1)
      .catch(() => 0);
    if (!exists) await fs.mkdir(snapDir);
    screenshots.push(await page.screenshot({ ...opts, path }));
  } catch (error) {
    console.error(error);
  }
}

async function scrollPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 30);
    });
  });
}
module.exports = screenshot;
