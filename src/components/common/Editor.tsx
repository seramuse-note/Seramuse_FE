import {
  EditorContent,
  findParentNode,
  posToDOMRect,
  useEditor,
  useEditorState,
  Editor as TiptapEditor, // Import type Editor của Tiptap để thay thế cho any
} from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

// Định nghĩa interface rõ ràng cho cấu trúc của một dòng lệnh Slash
interface CommandItem {
  title: string;
  description: string;
  action: (editor: TiptapEditor) => void;
}

export const Editor = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [isEditable, setIsEditable] = useState(true);
  const [slashQuery, setSlashQuery] = useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    editable: isEditable,
    content: `
      <p>Hệ thống hỗ trợ gõ dấu gạch chéo "/" ở đầu dòng trống để mở menu giống Notion.</p>
      <p>/</p>
    `,
    onUpdate: ({ editor }) => {
      const { state } = editor;
      const { selection } = state;
      const { $from } = selection;

      const currentLineText = $from.nodeBefore?.text || '';
      const match = currentLineText.match(/(?:^|\s)\/(\w*)$/);

      if (match) {
        setSlashQuery(match[1].toLowerCase());
      } else {
        setSlashQuery('');
      }
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  const { isBold, isItalic, isStrikethrough } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold') ?? false,
      isItalic: ctx.editor.isActive('italic') ?? false,
      isStrikethrough: ctx.editor.isActive('strike') ?? false,
    }),
  });

  // Định nghĩa kiểu dữ liệu mảng CommandItem cho danh sách menu khối
  const commandItems: CommandItem[] = [
    {
      title: 'Heading 1',
      description: 'Tiêu đề lớn chính',
      action: (ed) => ed.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      title: 'Heading 2',
      description: 'Tiêu đề phụ vừa',
      action: (ed) => ed.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      title: 'Bullet List',
      description: 'Danh sách dấu chấm',
      action: (ed) => ed.chain().focus().toggleBulletList().run(),
    },
    {
      title: 'Ordered List',
      description: 'Danh sách số thứ tự',
      action: (ed) => ed.chain().focus().toggleOrderedList().run(),
    },
    {
      title: 'Code Block',
      description: 'Khối mã code',
      action: (ed) => ed.chain().focus().toggleCodeBlock().run(),
    },
  ];

  const filteredCommands = commandItems.filter((item) =>
    item.title.toLowerCase().includes(slashQuery)
  );

  // Định nghĩa callback action nhận vào thực thể TiptapEditor chuẩn xác
  const handleExecuteCommand = (action: (ed: TiptapEditor) => void) => {
    if (!editor) return;

    const { selection } = editor.state;
    const { $from } = selection;
    const currentLineText = $from.nodeBefore?.text || '';
    const match = currentLineText.match(/(?:^|\s)\/(\w*)$/);

    if (match && match.index !== undefined) {
      const deleteFrom = $from.pos - match[0].length;
      editor.chain().focus().deleteRange({ from: deleteFrom, to: $from.pos }).run();
    }

    action(editor);
    setSlashQuery('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowMenu((old) => !old);
          editor?.commands.focus();
        }}
      >
        Toggle menu
      </button>
      <div className="control-group">
        <label>
          <input type="checkbox" checked={isEditable} onChange={() => setIsEditable(!isEditable)} />
          Editable
        </label>
      </div>

      {editor && showMenu && (
        <>
          {/* 1. BUBBLE MENU TEXT FORMAT */}
          <BubbleMenu editor={editor} options={{ placement: 'bottom', offset: 8, flip: true }}>
            <div className="bubble-menu">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={isBold ? 'is-active' : ''}
                type="button"
              >
                Bold
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={isItalic ? 'is-active' : ''}
                type="button"
              >
                Italic
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={isStrikethrough ? 'is-active' : ''}
                type="button"
              >
                Strike
              </button>
            </div>
          </BubbleMenu>

          {/* 2. BUBBLE MENU CHO ĐOẠN LISTS */}
          <BubbleMenu
            editor={editor}
            shouldShow={() => editor.isActive('bulletList') || editor.isActive('orderedList')}
            getReferencedVirtualElement={() => {
              const parentNode = findParentNode(
                (node) => node.type.name === 'bulletList' || node.type.name === 'orderedList'
              )(editor.state.selection);
              if (parentNode) {
                const domRect = posToDOMRect(
                  editor.view,
                  parentNode.start,
                  parentNode.start + parentNode.node.nodeSize
                );
                return {
                  getBoundingClientRect: () => domRect,
                  getClientRects: () => [domRect],
                };
              }
              return null;
            }}
            options={{ placement: 'top-start', offset: 8 }}
          >
            <div className="bubble-menu">
              <button
                onClick={() => {
                  const chain = editor.chain().focus();
                  if (editor.isActive('bulletList')) {
                    chain.toggleOrderedList();
                  } else {
                    chain.toggleBulletList();
                  }
                  chain.run();
                }}
                type="button"
              >
                Toggle list type
              </button>
            </div>
          </BubbleMenu>

          {/* 3. SLASH COMMANDS FLOATING MENU */}
          <FloatingMenu
            editor={editor}
            shouldShow={() => !!slashQuery && filteredCommands.length > 0}
            options={{
              placement: 'bottom-start',
            }}
          >
            <div
              className="slash-menu"
              style={{
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '4px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              {filteredCommands.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleExecuteCommand(item.action)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '6px 12px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{item.description}</div>
                </button>
              ))}
            </div>
          </FloatingMenu>
        </>
      )}

      <EditorContent editor={editor} />
    </>
  );
};
