# snapage
snap a page ! 

snapage allows to create beautiful web page screenshots, or pdfs, for multiple viewports concurrently, with custom styles, scripts and more!

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
type SnapResult = {
  meta: SnapMeta[];
  snaps: Buffer[];
}
async snap(url: string, options?: SnapageOptions): Promise<SnapResult>;
```

# options
```typescript
export type Style = Record<string, string>;

export type Viewport = {
  width?: number;
  height?: number;
} | string;


export type SnapageOptions = {
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

export default function snap(url: string, options?: SnapageOptions): Promise<SnapResult>;
```
# examples
do not persist screenshots - return screenshot per viewport provided in the `viewports` array:
```typescript
import snap, {SnapResult} from 'snapage';
const screenshots: SnapResult = await snap('https://google.com', {persist: false});
// screenshots: {
// 
// }
```


