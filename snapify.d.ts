export type Viewport = {
  width?: number;
  height?: number;
};

export type SnapifyOptions = {
  name?: string;
  location?: string;
  width?: number;
  height?: number;
  style?: string;
  script?: string;
  fullPage?: boolean;
  scroll?: boolean;
  persist?: boolean;
  viewports?: Viewport[];
};

export default function snap(url: string, options?: SnapifyOptions): Promise<Array<Buffer>>;