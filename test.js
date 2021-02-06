const snap = require('./snap');

(async () => {
    const iPhone = 'iPhone X';
    const desktop = {width: 800, height: 600}
    await snap('https://restory.netlify.app', {name: 'shellfie', script: "document.querySelector('.react-toggle').click()", viewports: [iPhone, desktop]});
})();