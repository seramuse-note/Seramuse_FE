import type { Block } from '@/types';

interface BlockContentJSON {
  content?: Array<{
    content?: Array<{
      text?: string;
    }>;
  }>;
}

export const getFirstBlockText = (blocks?: Block[]): string => {
  if (!blocks || blocks.length === 0) return '';

  const props = blocks[0].properties as BlockContentJSON;
  return props?.content?.[0]?.content?.[0]?.text || '';
};
