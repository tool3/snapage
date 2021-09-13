const { describe, it } = require('mocha');
const expect = require('chai').expect;
const screenshot = require('./screenshot');

describe('screenshot', () => {
  it('should supoport data urls', async () => {
    let content = '';
    let viewport = '';

    const page = {
      setContent: (cnt) => {
        content = cnt;
      },
      emulateMediaType: () => {},
      setViewport: (vprt) => {
        viewport = vprt;
      },
      addStyleTag: () => {},
      screenshot: () => 'snapped',
    };
    const metas = [];
    const snaps = [];

    await screenshot({
      page,
      url: 'data:image_base64_img',
      config: { options: { style: {}, mode: 'screenshot' }, metas, snaps },
      name: 'test',
    });

    expect(metas).to.deep.equal([
      {
        viewport: undefined,
        name: 'test',
        snapPath: undefined,
        snapDir: undefined,
        options: { style: {}, mode: 'screenshot' },
        device: false,
      },
    ]);
		expect(snaps).to.deep.equal(['snapped']);
  });
});
