const { describe, it } = require('mocha');
const expect = require('chai').expect;
const { getStyles, getStyle, stringifyStyle } = require('./styles');

describe('styles', () => {
  it('should get styles recursively', () => {
    const style = {
      body: {
        background: 'black',
      },
      '.some_selector': {
        border: '1px solid red',
      },
      '#another': {
        color: 'white',
      },
    };
    const styles = getStyles(style);
    expect(styles).to.equal(
      'body{ background: black; }.some_selector{ border: 1px solid red; }#another{ color: white; }'
    );
  });

  it('should stringify styles', () => {
    const style = { filter: 'grayscale(100%)' };
    const styles = stringifyStyle(style);
    expect(styles).to.equal('filter: grayscale(100%);');
  });

  it('should create style object', () => {
    const style = { transform: 'translate(0, 100)' };
    const styles = getStyle('.some_class', style);
    expect(styles).to.equal('.some_class{ transform: translate(0, 100); }');
  });
});
