const { describe, it } = require('mocha');
const expect = require('chai').expect;
const screenshot = require('./screenshot');

describe('screenshot', () => {
  let content = '';
  let viewport = '';
  let metas = [];
  let snaps = [];
  
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

  afterEach(() => {
    content = '';
    viewport = '';
    metas = [];
    snaps = [];
  })

  it('should supoport data urls', async () => {
    await screenshot({
      page,
      url: 'data:image_base64_img',
      config: { options: { style: {}, mode: 'screenshot' }, metas, snaps },
      name: 'test',
    });

    expect(content).to.equal('<html><body style="margin: 0;"><img style="margin: 0; width:100%; " src="data:image_base64_img" /></body></html>')
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

  it('should support pdfs', () => {
    
  });

  it('should support pdfs', () => {
    
  });

  it('should scroll page', () => {
    
  });

  it('should support element screenshot', () => {
    
  });

  it('should support element pdf', () => {
    
  });
});
