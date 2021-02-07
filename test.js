const snap = require('./snapify');
// const snap = require('./snapify');

(async () => {
  const iPhone = 'iPhone X';
  const iPad = 'iPad Pro landscape';
  const desktop = { width: 800, height: 600 };
  await snap('https://restory.netlify.app', {
    name: 'shellfie',
    // script: "document.querySelector('.react-toggle').click()",
    element: ".hero",
    viewports: [iPhone, iPad, desktop],
    omitBackground: true
  });

  // await snap('https://google.com', {
  //   name: 'google',
  //   viewports: [{width: 1920, height: 1080}],
  //   fullPage: true,
  //   style: {
  //       filter: 'invert(100%)'
  //   }
  // });
  


})();
