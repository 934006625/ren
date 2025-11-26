export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

export enum AnimationState {
  Idle = 'idle',
  Hover = 'hover',
  Active = 'active'
}