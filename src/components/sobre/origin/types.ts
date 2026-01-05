export type OriginText = {
  type: 'text';
  text: string;
  highlight?: string;
};

export type OriginMedia = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  aspectRatio?: string;
  preserveRatio?: boolean;
};
