import { EditorContent, useEditor, useEditorState, Editor as TiptapEditor } from '@tiptap/react';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { EXTENSIONS } from '@/constants/editor.constants';
import {
  FormattingBubbleMenu,
  ListBubbleMenu,
  SlashCommandMenu,
  useSlashCommand,
} from '@/components/editor';
import type { Block, CreateBlockPayload } from '@/types';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface EditorProps {
  value: Block[];
  onSetBlock: (newBlock: CreateBlockPayload[]) => void;
}

export const Editor = ({ value, onSetBlock }: EditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [allImages, setAllImages] = useState<{ src: string }[]>([]);
  const [showMenu] = useState(true);

  const handleTriggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDownRef = useRef<(event: KeyboardEvent) => boolean>(() => false);
  const slashHandlersRef = useRef<{
    handleSelectionUpdate: (editor: TiptapEditor) => void;
    handleTransaction: (editor: TiptapEditor) => void;
  }>({
    handleSelectionUpdate: () => {},
    handleTransaction: () => {},
  });

  const editor = useEditor({
    extensions: EXTENSIONS,
    content: value[0]?.properties || { type: 'paragraph', content: [{ type: 'text', text: '' }] },

    editorProps: {
      handleClick: (view, _pos, event) => {
        const target = event.target as HTMLElement;

        if (target && target.tagName === 'IMG') {
          const clickedSrc = target.getAttribute('src');
          if (!clickedSrc) return false;

          const imgElements = Array.from(view.dom.querySelectorAll('img')) as HTMLImageElement[];

          const imageList = imgElements.map((img) => ({ src: img.src }));
          setAllImages(imageList);

          const index = imgElements.findIndex((img) => img.src === clickedSrc);
          setLightboxIndex(index !== -1 ? index : 0);
          setLightboxOpen(true);
          return true;
        }
        return false;
      },
      handleKeyDown: (_view, event) => handleKeyDownRef.current(event),
    },

    onSelectionUpdate: ({ editor }) => {
      slashHandlersRef.current.handleSelectionUpdate(editor);
    },

    onTransaction: ({ editor }) => {
      slashHandlersRef.current.handleTransaction(editor);
    },

    onUpdate: ({ editor }) => {
      const properties = editor.getJSON();
      onSetBlock([
        {
          type: value[0]?.type ?? 'paragraph',
          properties: properties,
        },
      ]);
    },
  });

  const slash = useSlashCommand({
    editor,
    onUploadImage: handleTriggerImageUpload,
  });

  // Đồng bộ handlers của slash command sau render mà không vi phạm rule react-hooks/refs
  useEffect(() => {
    handleKeyDownRef.current = slash.handleKeyDown;
    slashHandlersRef.current = {
      handleSelectionUpdate: slash.handleSelectionUpdate,
      handleTransaction: slash.handleTransaction,
    };
  }, [slash.handleKeyDown, slash.handleSelectionUpdate, slash.handleTransaction]);

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        editor?.chain().focus().setImage({ src: reader.result, alt: file.name }).run();
      }
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

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

  return (
    <div className="flex flex-col h-full min-h-full w-full gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUploadImage}
        accept="image/*"
        className="hidden"
      />
      <div className="flex-1 min-h-0 w-full h-full overflow-y-auto bg-white rounded-xl border border-gray-100">
        <EditorContent editor={editor} className="h-full" />
      </div>
      {editor && showMenu && (
        <>
          <FormattingBubbleMenu editor={editor} editorState={editorState} />
          <ListBubbleMenu editor={editor} />
          <SlashCommandMenu
            editor={editor}
            slashQuery={slash.slashQuery}
            commands={slash.filteredCommands}
            groupedCommands={slash.groupedCommands}
            selectedIndex={slash.selectedIndex}
            onSelectIndex={slash.setSelectedIndex}
            onExecuteCommand={slash.handleExecuteCommand}
            onUploadImage={handleTriggerImageUpload}
          />
        </>
      )}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allImages}
      />
    </div>
  );
};
