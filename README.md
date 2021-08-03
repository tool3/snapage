# snapage
snap a web page

# install
```bash
yarn add snapage
```

# usage
```js
const snap = require('./snapage');
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
✅ supports lazy loaded content by scrolling the page   
✅ uses puppeteer-cluster for concurrenct screenshots   


# api
```typescript
async snap(url: string, options?: SnapageOptions): Promise<Array<Buffer>>;
```

# options

## name
`string`
## path
`string`
## viewports
`[{width, height}, 'emulatedDevice']`
## style
`object`
## script
`string`
## fullPage
`boolean`
## scroll
`boolean`
## persist
`boolean`

# examples
do not persist screenshots - return screenshot per viewport provided in the `viewports` array:
```typescript
const screenshots: Buffer[] = await snap('https://google.com', {persist: false});
```
