const snap = require('./snap');
//{pdfOptions: {script: "document.querySelector('.react-toggle').click()"} }
// pdfy('https://apple.com', {style: {filter: 'grayscale(100%)'}, script: "document.querySelector('.ac-ls-close-text').click()", name: 'apple', singlePage: true}).then(() => {
//     console.log('done')
// });

// pdfy('https://google.com', {style: {filter: 'grayscale(100%)'}, name: 'google', singlePage: true}).then(() => {
//     console.log('done')
// });

// pdfy('https://stackoverflow.com', {style: {filter: 'grayscale(100%)'}, name: 'stackoverflow', singlePage: true}).then(() => {
//     console.log('done')
// });


(async () => {
    await Promise.all([
        // await snap('https://apple.com', {name: 'apple', element: '.unit-link'}),
        await snap('https://restory.netlify.app', {name: 'restory', script: "document.querySelector('.react-toggle').click()", fullPage: true}),
        // await snap('https://stackoverflow.com', {name: 'stackoverflow', fullPage: false})
    ]);
})();

// for (i = 0; i < height / innerHeight; i++) {
//     page.evaluate((_) => {
//       window.scrollBy(0, window.innerHeight);
//     });
//     await sleep(200);
//     console.log(i);
//   }