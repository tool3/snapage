const { describe, it } = require('mocha');
const expect = require('chai').expect;
const getConfig = require('./config');

describe('getConfig', () => {
  it('should override default config values', () => {
    const conf = {
      wait: 1000,
      name: 'hello',
    };

    const expected = {
      name: 'hello',
      path: '/workspaces/experiments/snapage/utils/snaps',
      viewports: [{ width: 1920, height: 1080 }, 'iPad Pro', 'iPhone X'],
      puppeteerOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox'] },
      style: {},
      script: false,
      fullPage: false,
      scroll: false,
      persist: true,
      wait: 1000,
      printBackground: true,
      mode: 'screenshot',
    };

    const config = getConfig(conf, __dirname);
    expect(config).to.deep.equal(expected);
  });

  it('should generate random name', () => {
    const conf = getConfig({}, __dirname);
    expect(conf.name()).to.match(/snap_/);
  });
});
