import { EditorContent, useEditor, useEditorState, Editor as TiptapEditor } from '@tiptap/react';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { COMMAND_ITEMS, EXTENSIONS } from '@/constants/editor.constants';
import { FormattingBubbleMenu, ListBubbleMenu, SlashCommandMenu } from '@/components/editor';
import type { Block, CreateBlockPayload } from '@/types';

interface EditorProps {
  blocksNote: Block[];
  onSetBlock: (newBlock: CreateBlockPayload[]) => void;
}

export const Editor = ({ blocksNote, onSetBlock }: EditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showMenu] = useState(true);
  const [slashQuery, setSlashQuery] = useState('');

  const editor = useEditor({
    extensions: EXTENSIONS,
    content: blocksNote[0]?.properties,

    onUpdate: ({ editor }) => {
      const properties = editor.getJSON();

      const newBlocks: CreateBlockPayload[] = [
        {
          type: blocksNote[0]?.type ?? 'paragraph',
          properties: properties,
        },
      ];
      const isUnchanged = JSON.stringify(blocksNote[0]?.properties) === JSON.stringify(properties);

      if (!isUnchanged) {
        onSetBlock(newBlocks);
      }

      const { $from } = editor.state.selection;
      const currentLineText = $from.nodeBefore?.text || '';
      const match = currentLineText.match(/(?:^|\s)\/(\w*)$/);

      setSlashQuery(match ? match[1].toLowerCase() : '');
    },
  });

  const filteredCommands = COMMAND_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(slashQuery)
  );

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

    if (match && match.index !== undefined) {
      const deleteFrom = $from.pos - match[0].length;
      editor.chain().focus().deleteRange({ from: deleteFrom, to: $from.pos }).run();
    }

    action(editor);
    setSlashQuery('');
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        editor.chain().focus().setImage({ src: reader.result, alt: file.name }).run();
      }
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const triggerImageUpload = () => {
    handleExecuteCommand(() => {});
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
  }, [blocksNote, editor]);

  return (
    <div className="flex flex-col h-full min-h-full w-full gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUploadImage}
        accept="image/*"
        className="hidden"
      />
      <div
        className="flex-1 min-h-0 w-full h-full overflow-y-auto
       bg-white rounded-xl border border-gray-100"
      >
        <EditorContent editor={editor} className="h-full " />
      </div>
      {editor && showMenu && (
        <>
          <FormattingBubbleMenu editor={editor} editorState={editorState} />
          <ListBubbleMenu editor={editor} />
          <SlashCommandMenu
            editor={editor}
            slashQuery={slashQuery}
            commands={filteredCommands}
            onExecuteCommand={handleExecuteCommand}
            onUploadImage={triggerImageUpload}
          />
        </>
      )}
    </div>
  );
};
