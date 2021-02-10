export type Viewport = {
  width?: number;
  height?: number;
};

export type SnapifyOptions = {
  name?: string;
  location?: string;
  viewports?: Array<Viewport>;
  style?: string;
  script?: string;
  fullPage?: boolean;
  scroll?: boolean;
  persist?: boolean;
};

export default function snap(url: string, options?: SnapifyOptions): Promise<Array<Buffer>>;