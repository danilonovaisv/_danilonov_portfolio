export type BlockType =
  | 'text'
  | 'image'
  | 'video'
  | 'video-autoplay'
  | 'image-text'
  | 'text-image'
  | 'image-image'
  | 'image-video'
  | 'video-text';

export interface LandingPageBlockContent {
  text?: string;
  text2?: string;
  media?: string;
  media2?: string;
  mediaType?: 'image' | 'video' | 'youtube';
  mediaType2?: 'image' | 'video' | 'youtube';
  autoplay?: boolean;
}

export interface LandingPageBlock {
  id: string;
  type: BlockType;
  content: LandingPageBlockContent;
  // Transient fields for Admin UI
  file?: File | null;
  file2?: File | null;
  previewUrl?: string;
  previewUrl2?: string;
}
