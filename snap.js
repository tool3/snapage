const path = require('path');
const getConfig = require('./config');
const fs = require('fs').promises;
const { Cluster } = require('puppeteer-cluster');
const puppeteer = require('puppeteer');

async function snapify(url, options) {
  try {
    if (!url) {
      throw new Error(
        'no url provided.\nsnap needs a url to produce a screenshot.'
      );
    }
    // set config
    const localPath = process.env.INIT_CWD || process.cwd();
    const opts = getConfig(options, localPath);
    const { name, location, script, style } = opts;

    const viewports = opts.viewports || [
      { width: 1920, height: 1080 },
      'iPad Pro',
      'iPhone X',
    ];

    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 3,
    });

    const screenshots = [];

    await cluster.task(async ({ page, data: { url, viewport } }) => {
      try {
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
          const emulatedDevice = puppeteer.devices[viewport];
          await page.emulate(emulatedDevice);
        } else {
          await page.setViewport({ ...viewport, deviceScaleFactor: 4 });
        }

        const filePath = `${location}/${name}_${
          device ? viewport : Object.values(viewport).join('X')
        }.png`;

        // lazy loaded images
        if (opts.scroll) {
          await scrollPage(page);
          await page.evaluate(() => window.scrollTo(0, 0));
        }

        // set element
        if (opts.element) {
          const element = await page.$(opts.element);
          const snap = await element.screenshot({ type: 'png' });
          const buffer = Buffer.from(snap).toString('base64');
          await page.setContent(
            `<html><body style="margin: 0;"><img style="margin: 0; width:100%; ${styles}" src="data:image/jpeg;base64,${buffer}" /></body></html>`
          );
        }

        // before script
        if (script) await page.evaluate(script);

        // create snap dir
        const snapDir = path.resolve(location);
        const exists = await fs
          .access(snapDir)
          .then(() => 1)
          .catch(() => 0);
        if (!exists) await fs.mkdir(snapDir);
        screenshots.push(await page.screenshot({ ...opts, path: filePath }));
      } catch (error) {
        console.error(error);
      }
    });

    for (const viewport of viewports) {
      cluster.queue({ url, viewport });
    }

    await cluster.idle();
    await cluster.close();
    return screenshots;
  } catch (err) {
    console.error(new Error(`\x1b[32msnap error: ${err.message}\x1b[0m`));
    console.error(err.stack);
    throw err;
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

module.exports = snapify;
