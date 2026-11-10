import type { Editor as TiptapEditor } from '@tiptap/react';

/**
 * Trích xuất chuỗi truy vấn slash command tại vị trí con trỏ hiện tại.
 * Bỏ qua nếu con trỏ đang nằm trong khối mã nguồn (codeBlock).
 */
export const getSlashQuery = (editor: TiptapEditor | null): string | null => {
  if (!editor || editor.isDestroyed) return null;

  // Không kích hoạt menu slash bên trong code block
  if (editor.isActive('codeBlock')) {
    return null;
  }

  const { $from } = editor.state.selection;
  if (!$from.parent.isTextblock) return null;

  // Lấy toàn bộ text trước con trỏ trong block hiện tại
  const textBefore = $from.parent.textBetween(0, $from.parentOffset, null, '\ufffc');
  const match = textBefore.match(/(?:^|\s)\/([^\s]*)$/);

  return match ? match[1].toLowerCase() : null;
};

/**
 * Xóa sạch dải ký tự `/<query>` vừa gõ để chuẩn bị thực thi lệnh.
 */
export const deleteSlashQuery = (editor: TiptapEditor | null): void => {
  if (!editor || editor.isDestroyed) return;

  const { $from } = editor.state.selection;
  if (!$from.parent.isTextblock) return;

  const textBefore = $from.parent.textBetween(0, $from.parentOffset, null, '\ufffc');
  const match = textBefore.match(/(?:^|\s)\/([^\s]*)$/);

  if (match && match.index !== undefined) {
    const hasLeadingSpace = match[0].startsWith(' ');
    const slashIndexInMatch = hasLeadingSpace ? 1 : 0;
    const deleteLength = match[0].length - slashIndexInMatch; // độ dài của `/query`
    const deleteFrom = $from.pos - deleteLength;

    editor.chain().focus().deleteRange({ from: deleteFrom, to: $from.pos }).run();
  }
};
