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

(async () => {
  await snap('https://apple.com', {
    name: 'iPad Pro',
    fullPage: true,
    scroll: true,
    viewports: ['iPad Pro'],
    style: {
      filter: 'grayscale(100%)'
    }
  });
  // console.log(JSON.stringify(result, null, 2));
})();