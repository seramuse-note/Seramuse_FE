import type { SlashCategory, SlashCategoryMeta } from '../types';

export const SLASH_CATEGORIES: Record<SlashCategory, SlashCategoryMeta> = {
  text: {
    id: 'text',
    label: 'Văn bản & Khối',
  },
  list: {
    id: 'list',
    label: 'Danh sách',
  },
  insert: {
    id: 'insert',
    label: 'Chèn & Tiện ích',
  },
  advanced: {
    id: 'advanced',
    label: 'Nâng cao',
  },
};
