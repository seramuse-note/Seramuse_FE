import { FloatingMenu } from '@tiptap/react/menus';
import { Editor as TiptapEditor } from '@tiptap/react';
import type { CommandItem } from '@/constants/editor.constants';

interface Props {
  editor: TiptapEditor;
  slashQuery: string;
  commands: CommandItem[];
  onExecuteCommand: (action: (editor: TiptapEditor) => void) => void;
}

export const SlashCommandMenu = ({ editor, slashQuery, commands, onExecuteCommand }: Props) => {
  return (
    <FloatingMenu
      editor={editor}
      shouldShow={() => !!slashQuery && commands.length > 0}
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
        {commands.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onExecuteCommand(item.action)}
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
  );
};
