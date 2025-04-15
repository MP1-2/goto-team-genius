
import React from 'react';
import { cn } from '@/lib/utils';

interface PreferenceOptionProps {
  label: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const PreferenceOption: React.FC<PreferenceOptionProps> = ({
  label,
  icon,
  selected,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'preference-box',
        selected && 'preference-box-selected'
      )}
      onClick={onClick}
    >
      {icon && <div className="mb-2 text-primary">{icon}</div>}
      <span className={cn('text-sm font-medium', selected && 'text-primary')}>
        {label}
      </span>
    </div>
  );
};

export default PreferenceOption;
