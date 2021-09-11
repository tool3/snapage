const snap = require('./snapage');

// (async () => {
//   await snap('https://apple.com', {
//     // script: "document.querySelector('.react-toggle').click()",
//     // element: ".unit-wrapper",
//     viewports: [{ width: 800, height: 600 }],
//     fullPage: true,
//     scroll: true,
//     // omitBackground: true,
//     style: {
//       '.unit-wrapper': {
//         filter: 'blur(20px)',
//       },
//     },
//   });
//   // try {
//   //   await snap('https://apple.com', {
//   //     viewports: ['iPad Pro'],
//   //     fullPage: true,
//   //     style: {
//   //       filter: 'grayscale(100%)'
//   //     }
//   //   });
//   // } catch (error) {
//   //   console.log(error.stack)
//   //   throw error;
//   // }
// })();

const fs = require('fs');
(async () => {
  const screenshots = await snap('https://google.com', {persist: false, viewports: ['iPad Pro', {width: 800, height: 600}]});
  let counter = 0;
  screenshots.snaps.forEach((item, i) => {
    fs.writeFileSync(counter++ + '.png', item);
  })
})();