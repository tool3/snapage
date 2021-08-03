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

export default function snap(url: string, options?: SnapageOptions): Promise<Array<Buffer>>;