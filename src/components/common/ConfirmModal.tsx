import React from 'react';
import { createPortal } from 'react-dom';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = 'Xác nhận hành động',
  description,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-sm bg-white/90 backdrop-blur-xl p-5 rounded-3xl border border-white/60 shadow-2xl flex flex-col gap-4 text-center animate-in zoom-in-95 duration-150">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-brand-accent-primary">{title}</h3>
          {description && <div className="text-xs text-brand-accent-tertiary">{description}</div>}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-medium text-brand-accent-tertiary hover:text-brand-accent-primary hover:bg-gray-100 rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Đang xử lý...' : confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
