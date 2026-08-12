import {
  EditorContent,
  findParentNode,
  posToDOMRect,
  useEditor,
  useEditorState,
  Editor as TiptapEditor,
  type ChainedCommands,
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
  ChevronRight,
  FileText,
  Image,
  Italic,
  Quote,
  RotateCcw,
  Strikethrough,
  Table,
  Type,
  Underline,
} from 'lucide-react';
import { useState } from 'react';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import type { BlockDto } from '@/types/dto.type';

interface EditorProps {
  blocksNote: BlockDto[];
  onSetBlock: (newBlock: BlockDto[]) => void;
}

interface CommandItem {
  title: string;
  description: string;
  action: (editor: TiptapEditor) => void;
}

export const BUBBLE_MENU_OPTIONS = {
  placement: 'bottom' as const,
  offset: 8,
  flip: true,
};

export const EXTENSIONS = [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
    defaultAlignment: 'left',
  }),
  TextStyleKit,
  Color,
];

const COMMAND_ITEMS: CommandItem[] = [
  {
    title: 'Heading 1',
    description: 'Tiêu đề lớn',
    action: (ed) => ed.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    title: 'Heading 2',
    description: 'Tiêu đề vừa',
    action: (ed) => ed.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    title: 'Bullet List',
    description: 'Danh sách dấu chấm',
    action: (ed) => ed.chain().focus().toggleBulletList().run(),
  },
  {
    title: 'Ordered List',
    description: 'Danh sách số',
    action: (ed) => ed.chain().focus().toggleOrderedList().run(),
  },
  {
    title: 'Code Block',
    description: 'Khối mã code',
    action: (ed) => ed.chain().focus().toggleCodeBlock().run(),
  },
];

export const Editor = ({ blocksNote, onSetBlock }: EditorProps) => {
  const [showMenu] = useState(true);
  const [slashQuery, setSlashQuery] = useState('');
  const [isOpenYellow, setIsOpenYellow] = useState(false);

  const editor = useEditor({
    extensions: EXTENSIONS,
    content: blocksNote[0]?.properties,

    onUpdate: ({ editor }) => {
      const contentJSON = editor.getJSON();
      onSetBlock([{ type: 'paragraph', properties: contentJSON }]);

      const { $from } = editor.state.selection;
      const currentLineText = $from.nodeBefore?.text || '';
      const match = currentLineText.match(/(?:^|\s)\/(\w*)$/);

      setSlashQuery(match ? match[1].toLowerCase() : '');
    },
  });

  const editorState = useEditorState({
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
      align:
        ['left', 'center', 'right', 'justify'].find((a) => ctx.editor.isActive({ textAlign: a })) ||
        'left',
      currentColor: ctx.editor.getAttributes('textStyle').color ?? '#000000',
    }),
  });

  const handleExecuteCommand = (action: (ed: TiptapEditor) => void) => {
    if (!editor) return;
    const { $from } = editor.state.selection;
    const currentLineText = $from.nodeBefore?.text || '';
    const match = currentLineText.match(/(?:^|\s)\/(\w*)$/);

    // Xóa ký tự "/" và từ khóa đã gõ trước khi thực thi lệnh
    if (match && match.index !== undefined) {
      const deleteFrom = $from.pos - match[0].length;
      editor.chain().focus().deleteRange({ from: deleteFrom, to: $from.pos }).run();
    }

    action(editor);
    setSlashQuery('');
  };

  const executeCommand = (
    editor: TiptapEditor | null,
    commandFn: (chain: ChainedCommands) => ChainedCommands | boolean
  ): boolean | undefined => {
    if (!editor) return;
    const result = commandFn(editor.chain().focus());

    if (typeof result === 'boolean') return result;

    return result.run();
  };

  type Alignment = 'left' | 'center' | 'right' | 'justify';
  const handleAlign = (type: Alignment, isActive: boolean) => {
    if (!editor) return;
    if (editorState?.align === type) {
      editor.chain().focus().unsetTextAlign().run();
    } else {
      editor.chain().focus().setTextAlign(type).run();
    }
    executeCommand(editor, (chain) =>
      isActive ? chain.unsetTextAlign() : chain.setTextAlign(type)
    );
  };

  // Lọc các câu lệnh theo từ khóa gõ sau dấu "/"
  const filteredCommands = COMMAND_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(slashQuery)
  );

  return (
    <div className="flex flex-col h-full min-h-full w-full gap-2">
      <div
        className="flex-1 min-h-0 w-full h-full overflow-y-auto
       bg-white rounded-xl border border-gray-100"
      >
        <EditorContent editor={editor} className="h-full " />
      </div>
      {/* <div
        className="flex items-center justify-between  box-border
        w-full p-1  shrink-0 bg-white rounded-xl
        border border-gray-200 overflow-x-auto overflow-y-auto gap-1"
      >
        <div
          onClick={() => {
            setShowMenu((old) => !old);
            editor?.commands.focus();
          }}
          className="flex gap-2 box-border items-center"
        >
          <LucideProvider size={20} className="">
            <Bold
              onClick={() => executeCommand(editor, (chain) => chain.toggleBold())}
              className={`${isBold ? ' stroke-3' : ''} border-white/60 border cursor-pointer`}
            />
            <Italic
              onClick={() => executeCommand(editor, (chain) => chain.toggleItalic())}
              className={`${isItalic ? ' stroke-3' : ''} cursor-pointer`}
            />
            <Underline
              onClick={() => executeCommand(editor, (chain) => chain.toggleUnderline())}
              className={`${isUnder ? 'stroke-3' : ''} cursor-pointer`}
            />
            <Strikethrough
              onClick={() => executeCommand(editor, (chain) => chain.toggleStrike())}
              className={`${isStrikethrough ? ' stroke-3' : ''} cursor-pointer`}
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
              onClick={() => executeCommand(editor, (chain) => chain.setTextAlign('left'))}
              className={`${isAlignLeft ? 'is-active stroke-3' : ''} cursor-pointer`}
            />
            <AlignCenter
              onClick={() => handleAlign('center', isAlignCenter)}
              className={`${isAlignCenter ? 'is-active stroke-3' : ''}cursor-pointer`}
              cursor-pointer
            />
            <AlignRight
              onClick={() => handleAlign('right', isAlignRight)}
              className={`${isAlignRight ? 'is-active stroke-3' : ''}`}
              cursor-pointer
            />
            <AlignJustify
              onClick={() => handleAlign('justify', isAlignJustify)}
              className={`${isAlignJustify ? 'is-active stroke-3' : ''}cursor-pointer`}
            />
            <Quote
              values={currentColor}
              onClick={() => executeCommand(editor, (chain) => chain.toggleBlockquote())}
              className={`${isQuote ? 'stroke-3' : ''} cursor-pointer`}
            />
            <Table />
            <Image />
            <FileText />
            <div className="flex items-center rounded-md border border-gray-200 p-1 box-border">
              <label
                htmlFor="tiptap-color-picker"
                className="box-border hover:bg-white hover:cursor-pointer rounded-l-sm"
                title="Set text color"
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
              <div className="box-border hover:bg-white rounded-r-sm  ">
                <RotateCcw
                  size={20}
                  onClick={() => editor.chain().focus().unsetColor().run()}
                  className="cursor-pointer flex justify-center text-gray-400 min-h-2"
                />
              </div>
            </div>
          </LucideProvider>
        </div>
        <button
          className="bg-brand-accent-primary hover: opacity-90 rounded-full p-1 cursor-pointer"
          title="Use voice chat"
        >
          <Mic className="text-white w-2 h-2" />
        </button>
      </div> */}
      {editor && showMenu && (
        <>
          <BubbleMenu
            key="tiptap-bubble-menu"
            editor={editor}
            options={BUBBLE_MENU_OPTIONS}
            shouldShow={({ editor, from, to }) => {
              return !editor.view.state.selection.empty && from !== to;
            }}
            className=" flex flex-col items-stretch w-[192px]  text-[8px] p-2 rounded-lg
            bg-white/60 backdrop-blur-md  shadow-[0_4px_6px_rgba(0,0,0,0.1)] "
          >
            <div className="relative">
              <button
                title="More"
                type="button"
                onClick={() => setIsOpenYellow((prev) => !prev)}
                className="cursor-pointer w-full mb-1 rounded-lg bg-transparent  hover:bg-brand-accent-secondary/5 border border-transparent 
                flex items-center justify-between  hover:backdrop-blur-lg hover:border-white transition-all duration-300"
              >
                <div className="flex items-center gap-1 ">
                  <Type size={20} className="p-1" />
                  TEXT NORMAL
                </div>
                <ChevronRight size={20} className="p-1 text-brand-accent-fourth" />
              </button>
            </div>
            <div className="h-[.5px] w-full inline-full my-.5 bg-brand-accent-fourth " />
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex gap-1 items-center">
                <button
                  title="Blod"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth "
                >
                  <Bold
                    size={20}
                    onClick={() => executeCommand(editor, (chain) => chain.toggleBold())}
                    className={`${editorState.isBold ? ' stroke-3' : ''} p-1`}
                  />
                </button>
                <button
                  title="Italicize"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <Italic
                    size={20}
                    onClick={() => executeCommand(editor, (chain) => chain.toggleItalic())}
                    className={`${editorState.isItalic ? ' stroke-3' : ''} p-1`}
                  />
                </button>
                <button
                  title="Blod"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <Underline
                    size={20}
                    onClick={() => executeCommand(editor, (chain) => chain.toggleUnderline())}
                    className={`${editorState.isUnder ? 'stroke-3' : ''} p-1`}
                  />
                </button>
                <button
                  title="Blod"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <Strikethrough
                    size={20}
                    onClick={() => executeCommand(editor, (chain) => chain.toggleStrike())}
                    className={`${editorState.isStrikethrough ? ' stroke-3' : ''} p-1`}
                  />
                </button>
                <div
                  title="Blod"
                  className=" flex items-center cursor-pointer rounded-md border border-gray-100 px-.5 hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <label
                    htmlFor="tiptap-color-picker"
                    className="box-border hover:bg-white hover:cursor-pointer  rounded-md"
                    title="Text color"
                  >
                    <Baseline
                      size={20}
                      style={{ color: editorState.currentColor }}
                      className="p-1"
                    />
                  </label>
                  <input
                    id="tiptap-color-picker"
                    type="color"
                    value={editorState.currentColor}
                    onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                    className="absolute w-0 h-0 opacity-0 pointer-events-none"
                  />
                  <button title="Default text" className="box-border hover:bg-white rounded-r-sm ">
                    <RotateCcw
                      size={8}
                      onClick={() => editor.chain().focus().unsetColor().run()}
                      className="cursor-pointer flex justify-center text-gray-400 min-h-2"
                    />
                  </button>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <button
                  title="Blod"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <AlignLeft
                    size={20}
                    onClick={() => executeCommand(editor, (chain) => chain.setTextAlign('left'))}
                    className={`${editorState.isAlignLeft ? 'is-active stroke-3' : ''}  p-1`}
                  />
                </button>
                <button
                  title="Blod"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <AlignCenter
                    size={20}
                    onClick={() => handleAlign('center', editorState.isAlignCenter)}
                    className={`${editorState.isAlignCenter ? 'is-active stroke-3' : ''} p-1`}
                    cursor-pointer
                  />
                </button>
                <button
                  title="Blod"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <AlignRight
                    size={20}
                    onClick={() => handleAlign('right', editorState.isAlignRight)}
                    className={`${editorState.isAlignRight ? 'is-active stroke-3' : ''}p-1`}
                    cursor-pointer
                  />
                </button>
                <button
                  title="Blod"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <AlignJustify
                    size={20}
                    onClick={() => handleAlign('justify', editorState.isAlignJustify)}
                    className={`${editorState.isAlignJustify ? 'is-active stroke-3' : ''} p-1`}
                  />
                </button>
              </div>
              <div className="flex gap-1 items-center">
                <button
                  title="Blod"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <Quote
                    size={20}
                    values={editorState.currentColor}
                    onClick={() => executeCommand(editor, (chain) => chain.toggleBlockquote())}
                    className={`${editorState.isQuote ? 'stroke-3' : ''} p-1`}
                  />
                </button>
                <button
                  title="Blod"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <Table size={20} className={`p-1`} />
                </button>
                <button
                  title="Blod"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <Image size={20} className={`p-1`} />
                </button>
                <button
                  title="Blod"
                  className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
                >
                  <FileText size={20} className={`p-1`} />
                </button>
              </div>

              {/* <List
                size={20}
                // onClick={() => editor.chain().focus().toggleBulletList().run()}
                // className={isList ? 'stroke-3' : ''}
              />
              <ListOrdered
                size={20}
                // onClick={() => editor.chain().focus().toggleOrderedList().run()}
                // className={isOrderedList ? 'is-active stroke-3' : ''}
              /> */}
            </div>
            {isOpenYellow && (
              <div
                className="absolute top-0 left-full flex flex-col items-stretch w-[192px] overflow-hidden text-[8px] p-2 rounded-lg
               bg-white/60 backdrop-blur-md  shadow-[0_4px_6px_rgba(0,0,0,0.1)] "
              ></div>
            )}
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
    </div>
  );
};
