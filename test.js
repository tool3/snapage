const snap = require('./snapify');
// const snap = require('./snapify');

(async () => {
  await snapify('https://restory.netlify.app', {
    script: "document.querySelector('.react-toggle').click()",
    element: ".hero",
    viewports: [{width: 800, height: 600}],
    omitBackground: true
  });

  await snap('https://apple.com', {
    viewports: ['iPad Pro'],
    fullPage: true,
    style: {
      filter: 'grayscale(100%)'
    }
  });
})();
