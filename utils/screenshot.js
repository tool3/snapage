const { getStyles, stringifyStyle } = require('./styles');

async function screenshot({ page, url, options }) {
  try {
    const {
      viewport,
      devices,
      opts,
      screenshots = [],
      screenshotPath,
    } = options;
    const { script, style, scroll, element, persist } = opts;
    // visit page
    const styles = stringifyStyle(style);
    if (url.includes('data:image')) {
      await page.setContent(
        `<html><body style="margin: 0;"><img style="margin: 0; width:100%; ${styles}" src="${url}" /></body></html>`
      );
    } else {
      await page.goto(url, { waitUntil: 'networkidle0' });
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

    const hasClasses = Object.values(style).some((s) => typeof s === 'object');
    const stylesObject = { content: `body{ ${styles} }` };
    if (hasClasses) {
      Object.assign(stylesObject, { content: getStyles(style) });
    }
    const { content } = stylesObject;
    // apply styles
    await page.addStyleTag({ content });

    // lazy loaded images
    if (scroll) {
      await scrollPage(page);
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    // before script
    if (script) await page.evaluate(script);

    // set element
    if (element) {
      const area = await page.$(element);
      const filePath = persist ? screenshotPath : undefined;
      return screenshots.push(
        await area.screenshot({ ...opts, path: filePath })
      );
    }

    screenshots.push({
      buffer: await page.screenshot({ ...opts, path: screenshotPath }),
      screenshotPath,
      opts,
      device,
      viewport,
    });
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
