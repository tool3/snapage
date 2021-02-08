const snap = require('./snapify');
// const snap = require('./snapify');

(async () => {
  await snap('https://restory.netlify.app', {
    script: "document.querySelector('.react-toggle').click()",
    element: ".hero",
    omitBackground: true
  });
})();
