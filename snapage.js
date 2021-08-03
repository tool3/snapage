const path = require('path');
const fs = require('fs').promises;
const getConfig = require('./utils/config');
const { Cluster } = require('puppeteer-cluster');
const puppeteer = require('puppeteer');
const screenshot = require('./utils/screenshot');

async function snap(url, options = {}) {
  try {
    if (!url) {
      throw new Error(
        'no url provided.\nsnapify needs a url to produce a screenshot.'
      );
    }
    // set config
    const localPath = process.env.INIT_CWD || process.cwd();
    const opts = getConfig(options, localPath);
    const snapDir = path.resolve(opts.location);
    // create snap dir
    const exists = await fs
      .access(snapDir)
      .then(() => 1)
      .catch(() => 0);
    if (!exists) await fs.mkdir(snapDir);
    const devices = puppeteer.devices;
    const screenshots = [];

    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 3,
      puppeteerOptions: {args: ['--no-sandbox', '--disable-setuid-sandbox']}
      
    });

    await cluster.task(async ({ page, data: { url, viewport } }) => {
      const options = { snapDir, viewport, opts, devices, screenshots };
      await screenshot({ page, url, options });
    });

    for (const viewport of opts.viewports) {
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

module.exports = snap;
module.exports.default = snap;