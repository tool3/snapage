# snapify
create beautiful page screenshots

# install
```bash
yarn add snapify
```

# usage
```js
const snap = require('./snapify');
(async () => {
  await snap('https://apple.com', {
    viewports: ['iPad Pro'],
    fullPage: true,
    style: {
      filter: 'grayscale(100%)'
    }
  });
})();
```

![](./iPad_Pro.png)

# features
    ✅ plug and play
    ✅ element screenshots
    ✅ custom css styles
    ✅ custom pre-snap script
    ✅ supports all chrome emulated devices and their orientation
    ✅ uses puppeteer-cluster for concurrenct screenshots


# api