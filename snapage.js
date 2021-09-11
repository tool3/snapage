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
    const { name, puppeteerOptions, viewports, persist, mode } = opts;
    const snapDir = path.resolve(opts.path);
    const meta = {};

    // create snap dir
    const exists = await fs
      .access(snapDir)
      .then(() => 1)
      .catch(() => 0);
    if (!exists) await fs.mkdir(snapDir);
    const devices = puppeteer.devices;
    const snaps = [];

    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 3,
      puppeteerOptions,
    });

    await cluster.task(async ({ page, data: { url, viewport } }) => {
      const device = typeof viewport === 'string';
      const snapPath = persist
        ? `${snapDir}/${name}_${
            device
              ? viewport.replace(' ', '_')
              : Object.values(viewport).join('x')
          }.${mode === 'screenshot' ? 'png' : 'pdf'}`
        : undefined;
      const options = {
        snapDir,
        snapPath,
        viewport,
        opts,
        devices,
        device,
        snaps,
      };
      Object.assign(meta, {
        snapDir,
        snapPath,
        viewport,
        opts,
        device,
        snaps,
      });
      await screenshot({ page, url, options });
    });

    for (const viewport of viewports) {
      cluster.queue({ url, viewport });
    }

    await cluster.idle();
    await cluster.close();

    const results = snaps.reduce(
      (acc, item) => {
        const { buffer, snapPath, device, opts, viewport } = item;
        acc.snaps.push(buffer);
        acc.meta.push({
          viewport,
          name,
          snapPath,
          snapDir,
          opts,
          device,
        });
        return acc;
      },
      { snaps: [], meta: [] }
    );
    return results;
  } catch (err) {
    console.error(new Error(`\x1b[32msnap error: ${err.message}\x1b[0m`));
    console.error(err.stack);
    throw err;
  }
}

module.exports = snap;
module.exports.default = snap;
