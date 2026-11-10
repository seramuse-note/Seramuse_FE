import type { FC } from 'react';
import { SearchX } from 'lucide-react';

export const SlashCommandEmpty: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-2">
        <SearchX className="w-4 h-4" />
      </div>
      <div className="text-xs font-medium text-gray-700">Không tìm thấy lệnh phù hợp</div>
      <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
        Nhấn{' '}
        <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded font-mono text-[9px]">
          Esc
        </kbd>{' '}
        để hủy
      </div>
    </div>
  );
};
