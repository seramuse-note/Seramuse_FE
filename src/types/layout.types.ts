export const LAYOUT_MODE = {
  SPLIT: 'SPLIT',
  FULL_SIDEBAR: 'FULL_SIDEBAR',
  FULL_EDITOR: 'FULL_EDITOR',
} as const;

export type LayoutMode = (typeof LAYOUT_MODE)[keyof typeof LAYOUT_MODE];
