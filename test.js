const snap = require('./snapage');

(async () => {
  await snap('https://restory.netlify.app', {
    script: "document.querySelector('.react-toggle').click()",
    element: ".hero",
    viewports: [{width: 800, height: 600}],
    omitBackground: true,
    style: {
      '.some-class': {
        color: 'white',
        filter: 'blur(5px)'
      }
    }
  });

  try {
    await snap('https://apple.com', {
      viewports: ['iPad Pro'],
      fullPage: true,
      style: {
        filter: 'grayscale(100%)'
      }
    });  
  } catch (error) {
    console.log(error.stack)
    throw error;
  }
  
})();
