import { Editor as TiptapEditor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Table,
  Image,
  FileText,
  Baseline,
  RotateCcw,
  Mic,
  List,
  ListOrdered,
} from 'lucide-react';
import type { EditorStateProps } from './FormattingBubbleMenu';

interface Props {
  editor: TiptapEditor | null;
  editorState: EditorStateProps;
}

export const EditorToolbar = ({ editor, editorState }: Props) => {
  if (!editor) return null;

  const handleAlign = (type: 'left' | 'center' | 'right' | 'justify') => {
    if (editorState.align === type) {
      editor.chain().focus().unsetTextAlign().run();
    } else {
      editor.chain().focus().setTextAlign(type).run();
    }
  };
  return (
    <div className="flex items-center justify-between box-border w-full p-1 shrink-0 bg-white rounded-xl border border-gray-200 overflow-x-auto gap-1">
      {/* Cụm công cụ định dạng */}
      <div className="flex gap-2 box-border items-center">
        {/* Style cơ bản */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="p-1 hover:bg-gray-100 rounded"
          title="Bold"
        >
          <Bold size={18} className={editorState.isBold ? 'stroke-[3]' : ''} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="p-1 hover:bg-gray-100 rounded"
          title="Italic"
        >
          <Italic size={18} className={editorState.isItalic ? 'stroke-[3]' : ''} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="p-1 hover:bg-gray-100 rounded"
          title="Underline"
        >
          <Underline size={18} className={editorState.isUnder ? 'stroke-[3]' : ''} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="p-1 hover:bg-gray-100 rounded"
          title="Strikethrough"
        >
          <Strikethrough size={18} className={editorState.isStrikethrough ? 'stroke-[3]' : ''} />
        </button>

        {/* List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="p-1 hover:bg-gray-100 rounded"
          title="Bullet List"
        >
          <List size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="p-1 hover:bg-gray-100 rounded"
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>

        {/* Căn lề */}
        <button
          type="button"
          onClick={() => handleAlign('left')}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Left"
        >
          <AlignLeft size={18} className={editorState.isAlignLeft ? 'text-blue-600' : ''} />
        </button>

        <button
          type="button"
          onClick={() => handleAlign('center')}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Center"
        >
          <AlignCenter size={18} className={editorState.isAlignCenter ? 'text-blue-600' : ''} />
        </button>

        <button
          type="button"
          onClick={() => handleAlign('right')}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Right"
        >
          <AlignRight size={18} className={editorState.isAlignRight ? 'text-blue-600' : ''} />
        </button>

        <button
          type="button"
          onClick={() => handleAlign('justify')}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Justify"
        >
          <AlignJustify size={18} className={editorState.isAlignJustify ? 'text-blue-600' : ''} />
        </button>

        {/* Trích dẫn & Khác */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="p-1 hover:bg-gray-100 rounded"
          title="Quote"
        >
          <Quote size={18} className={editorState.isQuote ? 'stroke-[3]' : ''} />
        </button>

        <Table size={18} className="cursor-pointer opacity-50 hover:opacity-100" />
        <Image size={18} className="cursor-pointer opacity-50 hover:opacity-100" />
        <FileText size={18} className="cursor-pointer opacity-50 hover:opacity-100" />

        {/* Color Picker */}
        <div className="flex items-center rounded-md border border-gray-200 p-1 box-border gap-1">
          <label
            htmlFor="toolbar-color-picker"
            className="cursor-pointer hover:bg-gray-100 rounded p-0.5"
            title="Set text color"
          >
            <Baseline size={18} style={{ color: editorState.currentColor }} />
          </label>
          <input
            id="toolbar-color-picker"
            type="color"
            value={editorState.currentColor}
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="absolute w-0 h-0 opacity-0 pointer-events-none"
          />
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="hover:bg-gray-100 rounded p-0.5"
            title="Reset color"
          >
            <RotateCcw size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="bg-brand-accent-primary hover:opacity-90 rounded-full p-2 cursor-pointer flex items-center justify-center shrink-0"
        title="Use voice chat"
      >
        <Mic className="text-white w-4 h-4" />
      </button>
    </div>
  );
};
