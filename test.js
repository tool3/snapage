const snap = require('./snapify');
// const snap = require('./snapify');

(async () => {
  const iPhone = 'iPhone X';
  const iPad = 'iPad Pro landscape';
  const desktop = { width: 800, height: 600 };
  await snap('https://restory.netlify.app', {
    name: 'shellfie',
    script: "document.querySelector('.react-toggle').click()",
    viewports: [iPhone, iPad, desktop]
  });
  
})();
