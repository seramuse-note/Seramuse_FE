import { useState } from 'react';
import { BubbleMenu } from '@tiptap/react/menus';
import { Editor as TiptapEditor, type ChainedCommands } from '@tiptap/react';
import {
  Type,
  ChevronRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Baseline,
  RotateCcw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Table,
  Image,
  FileText,
} from 'lucide-react';
import { BUBBLE_MENU_OPTIONS } from '@/constants/editor.constants';
export interface EditorStateProps {
  isBold: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnder: boolean;
  isQuote: boolean;
  isAlignLeft: boolean;
  isAlignCenter: boolean;
  isAlignRight: boolean;
  isAlignJustify: boolean;
  align: string;
  currentColor: string;
}

interface Props {
  editor: TiptapEditor;
  editorState: EditorStateProps;
}

export const FormattingBubbleMenu = ({ editor, editorState }: Props) => {
  const [isOpenSubBubble, setIsSubBubble] = useState(false);

  const executeCommand = (
    editor: TiptapEditor | null,
    commandFn: (chain: ChainedCommands) => ChainedCommands | boolean
  ): boolean | undefined => {
    if (!editor) return;
    const result = commandFn(editor.chain().focus());

    if (typeof result === 'boolean') return result;

    return result.run();
  };

  const handleAlign = (type: 'left' | 'center' | 'right' | 'justify') => {
    if (!editor) return;
    if (editorState?.align === type) {
      editor.chain().focus().unsetTextAlign().run();
    } else {
      editor.chain().focus().setTextAlign(type).run();
    }
  };

  return (
    <BubbleMenu
      key="tiptap-bubble-menu"
      editor={editor}
      options={BUBBLE_MENU_OPTIONS}
      shouldShow={({ editor, from, to }) => {
        return !editor.view.state.selection.empty && from !== to;
      }}
      className="flex flex-col items-stretch w-[192px] text-[8px] p-2 rounded-lg bg-white/60 backdrop-blur-md shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsSubBubble((prev) => !prev)}
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
        {/* Style Controls */}
        <div className="flex gap-1 items-center">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth "
          >
            <Bold size={20} className={`${editorState.isBold ? ' stroke-3' : ''} p-1`} />
          </button>
          <button
            title="Italicize"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
          >
            <Italic size={20} className={`${editorState.isItalic ? ' stroke-3' : ''} p-1`} />
          </button>
          <button
            title="Underline"
            onClick={() => executeCommand(editor, (chain) => chain.toggleUnderline())}
            className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
          >
            <Underline size={20} className={`${editorState.isUnder ? 'stroke-3' : ''} p-1`} />
          </button>
          <button
            title="Strikethrough"
            onClick={() => executeCommand(editor, (chain) => chain.toggleStrike())}
            className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
          >
            <Strikethrough
              size={20}
              className={`${editorState.isStrikethrough ? ' stroke-3' : ''} p-1`}
            />
          </button>

          {/* Color Picker */}
          <div className=" flex items-center cursor-pointer rounded-md border border-gray-100 px-.5 hover:backdrop-blur-lg hover:border-brand-accent-fourth">
            <label
              htmlFor="tiptap-color-picker"
              className="box-border hover:bg-white hover:cursor-pointer  rounded-md"
              title="Text color"
            >
              <Baseline size={20} className={`p-1 text=${editorState.currentColor}`} />
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

        {/* Alignment Controls */}
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
              onClick={() => handleAlign('center')}
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
              onClick={() => handleAlign('right')}
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
              onClick={() => handleAlign('justify')}
              className={`${editorState.isAlignJustify ? 'is-active stroke-3' : ''} p-1`}
            />
          </button>
        </div>

        {/* Node Extra Controls */}
        <div className="flex gap-1 items-center">
          <button
            title="Quote"
            onClick={() => executeCommand(editor, (chain) => chain.toggleBlockquote())}
            className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
          >
            <Quote
              size={20}
              color={String(editorState.currentColor ?? '')}
              className={`${editorState.isQuote ? 'stroke-3' : ''} p-1`}
            />
          </button>
          <button
            title="Table"
            className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
          >
            <Table size={20} className={`p-1`} />
          </button>
          <button
            title="Image"
            className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
          >
            <Image size={20} className={`p-1`} />
          </button>
          <button
            title="FileText"
            className="cursor-pointer rounded-md border border-transparent hover:backdrop-blur-lg hover:border-brand-accent-fourth"
          >
            <FileText size={20} className={`p-1`} />
          </button>
        </div>
      </div>
      {isOpenSubBubble && (
        <div
          className="absolute top-0 left-full flex flex-col items-stretch w-[192px] overflow-hidden text-[8px] p-2 rounded-lg
               bg-white/60 backdrop-blur-md  shadow-[0_4px_6px_rgba(0,0,0,0.1)] "
        ></div>
      )}
    </BubbleMenu>
  );
};
