import { SLASH_CATEGORIES } from '../config/categories.config';
import type { GroupedSlashCommands, SlashCategory, SlashCommandItem } from '../types';

/**
 * Chuẩn hóa chuỗi tiếng Việt có dấu thành không dấu (lowercase).
 */
export const removeVietnameseTones = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();
};

/**
 * Kiểm tra xem một lệnh có khớp với truy vấn tìm kiếm hay không.
 * Hỗ trợ tiếng Việt có dấu, không dấu, viết tắt, và từ khóa (keywords).
 */
export const matchesSlashQuery = (item: SlashCommandItem, rawQuery: string | null): boolean => {
  if (rawQuery === null) return false;
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;

  const normalizedQuery = removeVietnameseTones(query);

  // 1. Kiểm tra theo title
  const rawTitle = item.title.toLowerCase();
  const normalizedTitle = removeVietnameseTones(item.title);
  if (rawTitle.includes(query) || normalizedTitle.includes(normalizedQuery)) {
    return true;
  }

  // 2. Kiểm tra theo description
  const rawDesc = item.description.toLowerCase();
  const normalizedDesc = removeVietnameseTones(item.description);
  if (rawDesc.includes(query) || normalizedDesc.includes(normalizedQuery)) {
    return true;
  }

  // 3. Kiểm tra theo keywords / aliases
  return item.keywords.some((keyword) => {
    const rawKw = keyword.toLowerCase();
    const normalizedKw = removeVietnameseTones(keyword);
    return rawKw.includes(query) || normalizedKw.includes(normalizedQuery);
  });
};

/**
 * Gom nhóm danh sách các lệnh theo từng danh mục có sẵn.
 */
export const groupCommandsByCategory = (commands: SlashCommandItem[]): GroupedSlashCommands[] => {
  const categoryOrder: SlashCategory[] = ['text', 'list', 'insert', 'advanced'];
  const groupedMap = new Map<SlashCategory, SlashCommandItem[]>();

  commands.forEach((command) => {
    const list = groupedMap.get(command.category) || [];
    list.push(command);
    groupedMap.set(command.category, list);
  });

  const result: GroupedSlashCommands[] = [];

  categoryOrder.forEach((catKey) => {
    const items = groupedMap.get(catKey);
    if (items && items.length > 0) {
      result.push({
        category: SLASH_CATEGORIES[catKey] || { id: catKey, label: catKey },
        items,
      });
    }
  });

  return result;
};
