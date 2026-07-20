import {
  EditorContent,
  findParentNode,
  posToDOMRect,
  useEditor,
  useEditorState,
  Editor as TiptapEditor,
} from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  FileText,
  Image,
  Italic,
  List,
  ListOrdered,
  LucideProvider,
  Quote,
  RotateCcw,
  Strikethrough,
  Table,
  Underline,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

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
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
      TextStyleKit,
      Color,
    ],
    editable: isEditable,
    content: `
      <p>Khu vuc ghi noi dung</p>
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

  const {
    isBold,
    isItalic,
    isStrikethrough,
    isUnder,
    // isList,
    // isOrderedList,
    isAlignLeft,
    isAlignCenter,
    isAlignRight,
    isAlignJustify,
    isQuote,
    currentColor,
  } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold') ?? false,
      isItalic: ctx.editor.isActive('italic') ?? false,
      isStrikethrough: ctx.editor.isActive('strike') ?? false,
      isUnder: ctx.editor.isActive('underline') ?? false,
      isList: ctx.editor.isActive('bulletList') ?? false,
      isOrderedList: ctx.editor.isActive('orderedList') ?? false,
      isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }) ?? false,
      isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }) ?? false,
      isAlignRight: ctx.editor.isActive({ textAlign: 'right' }) ?? false,
      isAlignJustify: ctx.editor.isActive({ textAlign: 'justify' }) ?? false,
      isQuote: ctx.editor.isActive('blockquote') ?? false,
      currentColor: ctx.editor.getAttributes('textStyle').color ?? '#000000',
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

  const handleAlign = (type: string, isActive: boolean) => {
    if (isActive) {
      editor.chain().focus().unsetTextAlign().run();
    } else {
      editor.chain().focus().setTextAlign(type).run();
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowMenu((old) => !old);
          editor?.commands.focus();
        }}
        className="flex gap-3 p-2 box-border items-center"
      >
        <LucideProvider size={20} className="flex gap-2 cursor-pointer items-center">
          <Bold
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${isBold ? 'is-active stroke-3' : ''} `}
          />
          <Italic
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={isItalic ? 'is-active stroke-3' : ''}
          />
          <Underline
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={isUnder ? 'is-active stroke-3' : ''}
          />
          <Strikethrough
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={isStrikethrough ? 'is-active stroke-3' : ''}
          />
          <List
          // onClick={() => editor.chain().focus().toggleBulletList().run()}
          // className={isList ? 'stroke-3' : ''}
          />
          <ListOrdered
          // onClick={() => editor.chain().focus().toggleOrderedList().run()}
          // className={isOrderedList ? 'is-active stroke-3' : ''}
          />
          <AlignLeft
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={isAlignLeft ? 'stroke-3' : ''}
          />
          <AlignCenter
            onClick={() => handleAlign('center', isAlignCenter)}
            className={isAlignCenter ? 'stroke-3' : ''}
          />
          <AlignRight
            onClick={() => handleAlign('right', isAlignRight)}
            className={isAlignRight ? 'stroke-3' : ''}
          />
          <AlignJustify
            onClick={() => handleAlign('justify', isAlignJustify)}
            className={isAlignJustify ? 'stroke-3' : ''}
          />
          <Quote
            values={currentColor}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={isQuote ? 'is-active stroke-3' : ''}
          />
          <Table />
          <Image />
          <FileText />
          <div className="flex items-center  rounded-md bg-white/50 box-border">
            <label
              htmlFor="tiptap-color-picker"
              className="box-border hover:bg-white rounded-l-sm  p-1 "
            >
              <Baseline style={{ color: currentColor }} />
            </label>
            <input
              id="tiptap-color-picker"
              type="color"
              value={currentColor}
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className="absolute w-0 h-0 opacity-0 pointer-events-none"
            />
            <div className="box-border hover:bg-white rounded-r-sm  p-1 ">
              <RotateCcw
                size={10}
                onClick={() => editor.chain().focus().unsetColor().run()}
                className="cursor-pointer flex justify-center text-gray-400  h-4"
              />
            </div>
          </div>
        </LucideProvider>
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
          <BubbleMenu
            editor={editor}
            options={{ placement: 'bottom', offset: 8, flip: true }}
            className="text-sm bg-white border border-[#ccc] rounded-sm p-1 px-2 shadow-[0_4px_6px_rgba(0,0,0,0.1)] "
          >
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`${isBold ? 'is-active' : ''} flex items-center cursor-pointer gap-2`}
              type="button"
            >
              <Bold size={15} />
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`isItalic ? 'is-active' : '' flex items-center cursor-pointer gap-2`}
              type="button"
            >
              <Italic size={15} />
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`${isUnder ? 'is-active' : ''} flex items-center cursor-pointer gap-2`}
              type="button"
            >
              <Underline size={15} /> Underline
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`isStrikethrough ? 'is-active' : ''  flex items-center cursor-pointer gap-2`}
              type="button"
            >
              <Strikethrough size={15} /> Strike through
            </button>
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
              ></button>
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
