# snapage
snap a page ! 

snapage allows to create high quality web page screenshots/pdfs, 
for multiple viewports concurrently, with custom styles, element screeenshots, scripts and more!

# install
```bash
npm install snapage
```

# usage
```js
const snap = require('snapage');
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
})();
```

![](./iPad_Pro.png)

# features
✅ plug and play   
✅ element screenshots   
✅ custom css styles   
✅ custom pre-snap script   
✅ supports pdf   
✅ supports all chrome emulated devices and their orientation   
✅ supports lazy loaded content by scrolling the page   
✅ uses puppeteer-cluster for concurrenct screenshots   

# api
```typescript
export type Style = Record<string, string>;

export type Viewport = {
  width?: number;
  height?: number;
} | string;


export type SnapOptions = {
  name?: string;
  path?: string;
  viewports?: Viewport[];
  style?: Style;
  script?: string;
  fullPage?: boolean;
  scroll?: boolean;
  persist?: boolean;
  printBackground?: boolean;
  mode?: string;
  wait?: number;
};

export type SnapMeta = {
  name: string;
  snapPath: string;
  snapDir: string;
  viewport: Viewport;
  device: boolean;
  opts: Record<string, any>;
};

export type SnapResult = {
  meta: SnapMeta[];
  snaps: Buffer[];
}

export default function snap(url: string, options?: SnapOptions): Promise<SnapResult>;
```
# examples
## pdf
snap a pdf of `apple.com`, in an iPhone X and desktop 800x600, scroll the page to get lazy loaded content.
```javascript
const snap = require('snap');
(async () => {
  await snap('https://apple.com', {mode: 'pdf', scroll: true, viewports: ['iPhone X', {width: 800, height: 600}]});
})()
```

## don't persist
don't persist screenshots instead return screenshot per viewport provided in the `viewports` array.
by default, `snapage`saves the screenshots/pdfs to the `snapDir` provided in config.   
```typescript
import snap, {SnapResult} from 'snapage';
const screenshots: SnapResult = await snap('https://google.com', {persist: false, viewports: ['iPad Pro', {width: 800, height: 600}]});
console.log(screenshots);
// {
//   snaps: [
//     <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 08 00 00 00 0a ac 08 06 00 00 00 4b e6 13 8c 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 20 00 ... 204866 more bytes>,
//     <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 0c 80 00 00 09 60 08 06 00 00 00 4a f8 ad 5d 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 20 00 ... 638779 more bytes>
//   ],
//   meta: [
//     {
//       viewport: 'iPad Pro',
//       name: 'snap_YCT5Qt5',
//       snapPath: undefined,
//       snapDir: '/workspaces/experiments/snapage/snaps',
//       opts: [Object],
//       device: true
//     },
//     {
//       viewport: [Object],
//       name: 'snap_aW3dz0g',
//       snapPath: undefined,
//       snapDir: '/workspaces/experiments/snapage/snaps',
//       opts: [Object],
//       device: false
//     },
//   ]
// }
```

