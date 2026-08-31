import type { LucideIcon } from 'lucide-react';
import React, { type FC } from 'react';

interface EmptyStateProps {
  icon?: LucideIcon | React.ReactNode;
  title: string;
  description?: React.ReactNode;
  action?: {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: LucideIcon;
  };
}

export const EmptyState: FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => {
  const renderIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === 'function') {
      const LucideComponent = Icon as LucideIcon;
      return <LucideComponent className="w-8 h-8 text-brand-accent-tertiary/60 mb-1" />;
    }
    return Icon;
  };

  const ActionIcon = action?.icon;

  return (
    <div className="flex flex-col items-center justify-center gap-1 p-6 text-center select-none animate-fadeIn max-w-full">
      {renderIcon()}

      <p className="text-sm font-bold text-brand-accent-primary">{title}</p>

      {description && (
        <p className="text-[11px] text-brand-accent-tertiary leading-relaxed">{description}</p>
      )}

      {action && (
        <button
          onClick={action.onClick}
          type="button"
          className="mt-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-accent-primary 
          hover:bg-brand-accent-secondary rounded-xl shadow-xs transition-all duration-200 
          active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          {ActionIcon && <ActionIcon className="w-3.5 h-3.5" />}
          <span>{action.label}</span>
        </button>
      )}
    </div>
  );
};
