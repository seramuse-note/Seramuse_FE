import { useCallback, useMemo, useState } from 'react';
import type { Editor as TiptapEditor } from '@tiptap/react';
import { DEFAULT_SLASH_COMMANDS } from '../config/commands.config';
import type { UseSlashCommandOptions } from '../types';
import { deleteSlashQuery, getSlashQuery } from '../utils/editor.utils';
import { groupCommandsByCategory, matchesSlashQuery } from '../utils/search.utils';

export const useSlashCommand = ({
  editor,
  onUploadImage,
  commands = DEFAULT_SLASH_COMMANDS,
}: UseSlashCommandOptions) => {
  const [slashQuery, setSlashQuery] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Lọc danh sách lệnh theo query tìm kiếm
  const filteredCommands = useMemo(() => {
    if (slashQuery === null) return [];
    return commands.filter((cmd) => matchesSlashQuery(cmd, slashQuery));
  }, [commands, slashQuery]);

  // Gom nhóm danh sách đã lọc theo các category
  const groupedCommands = useMemo(() => {
    return groupCommandsByCategory(filteredCommands);
  }, [filteredCommands]);

  /**
   * Thực thi một lệnh slash:
   * 1. Xóa sạch `/<query>` trên editor
   * 2. Chạy action tương ứng
   * 3. Đóng menu và reset index
   */
  const handleExecuteCommand = useCallback(
    (action: (editor: TiptapEditor) => void) => {
      if (!editor) return;

      deleteSlashQuery(editor);
      action(editor);
      setSlashQuery(null);
      setSelectedIndex(0);
    },
    [editor]
  );

  /**
   * Kích hoạt tải ảnh từ máy tính
   */
  const handleTriggerUploadImage = useCallback(() => {
    if (editor) {
      deleteSlashQuery(editor);
    }
    setSlashQuery(null);
    setSelectedIndex(0);
    onUploadImage?.();
  }, [editor, onUploadImage]);

  /**
   * Bắt các phím điều hướng ArrowUp, ArrowDown, Enter, Tab, Escape
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent): boolean => {
      // Tránh xung đột khi người dùng gõ tiếng Việt có dấu qua IME (Telex / VNI)
      if (event.isComposing || event.keyCode === 229) {
        return false;
      }

      if (slashQuery !== null) {
        // 1. Phím Escape: luôn đóng menu slash (kể cả khi không có kết quả tìm kiếm)
        if (event.key === 'Escape') {
          event.preventDefault();
          setSlashQuery(null);
          setSelectedIndex(0);
          return true;
        }

        // 2. Phím ArrowDown: di chuyển xuống dưới
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          if (filteredCommands.length > 0) {
            setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
          }
          return true;
        }

        // 3. Phím ArrowUp: di chuyển lên trên
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          if (filteredCommands.length > 0) {
            setSelectedIndex(
              (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length
            );
          }
          return true;
        }

        // 4. Phím Enter hoặc Tab: chọn lệnh đang được highlight
        if (event.key === 'Enter' || event.key === 'Tab') {
          if (filteredCommands.length > 0) {
            event.preventDefault();
            const selected = filteredCommands[selectedIndex];
            if (selected) {
              if (selected.id === 'image' || selected.title.toLowerCase() === 'image') {
                handleTriggerUploadImage();
              } else {
                handleExecuteCommand(selected.action);
              }
              return true;
            }
          }
        }
      }

      return false;
    },
    [slashQuery, filteredCommands, selectedIndex, handleTriggerUploadImage, handleExecuteCommand]
  );

  /**
   * Bắt sự kiện transaction để cập nhật query theo thời gian thực khi gõ
   */
  const handleTransaction = useCallback((editorInstance: TiptapEditor) => {
    const nextQuery = getSlashQuery(editorInstance);
    setSlashQuery((prev) => {
      if (prev !== nextQuery) {
        setSelectedIndex(0);
        return nextQuery;
      }
      return prev;
    });
  }, []);

  /**
   * Bắt sự kiện selectionUpdate để đóng menu nếu con trỏ rời khỏi vùng slash
   */
  const handleSelectionUpdate = useCallback((editorInstance: TiptapEditor) => {
    setSlashQuery((prev) => {
      if (prev === null) return null;
      const nextQuery = getSlashQuery(editorInstance);
      if (nextQuery === null) {
        setSelectedIndex(0);
        return null;
      }
      return prev;
    });
  }, []);

  return {
    slashQuery,
    setSlashQuery,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    groupedCommands,
    handleKeyDown,
    handleTransaction,
    handleSelectionUpdate,
    handleExecuteCommand,
    handleTriggerUploadImage,
  };
};
