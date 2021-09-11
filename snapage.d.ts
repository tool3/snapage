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
  wait?: number;
  mode?: string;
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