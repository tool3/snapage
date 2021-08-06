export type Viewport = {
  width?: number;
  height?: number;
};

export type Style = Record<string, string>;

export type SnapageOptions = {
  name?: string;
  path?: string;
  viewports?: Array<Viewport>;
  style?: Style;
  script?: string;
  fullPage?: boolean;
  scroll?: boolean;
  persist?: boolean;
};

export type SnapMeta = {
  viewport: string | Record<string, number>;
  name: string;
  screenshotPath: string;
  snapDir: string;
  device: string;
  opts: Record<string, any>;
};

export type Result = {
  meta: SnapMeta[];
  screenshots: Array<Buffer>;
}

export default function snap(url: string, options?: SnapageOptions): Promise<Result>;