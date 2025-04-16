
import React from 'react';
import { Label } from '@/components/ui/label';
import { LogoColor } from '@/pages/LogoCreation';
import { cn } from '@/lib/utils';

interface LogoColorPickerProps {
  selectedColor: LogoColor;
  onSelectColor: (color: LogoColor) => void;
}

const LogoColorPicker: React.FC<LogoColorPickerProps> = ({ 
  selectedColor, 
  onSelectColor 
}) => {
  const colors: { value: LogoColor; bg: string }[] = [
    { value: 'blue', bg: 'bg-blue-500' },
    { value: 'red', bg: 'bg-red-500' },
    { value: 'green', bg: 'bg-green-500' },
    { value: 'purple', bg: 'bg-purple-500' },
    { value: 'orange', bg: 'bg-orange-500' },
    { value: 'black', bg: 'bg-gray-800' },
  ];

  return (
    <div className="space-y-2">
      <Label>Logo Color</Label>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            className={cn(
              color.bg,
              'w-8 h-8 rounded-full transition-all',
              selectedColor === color.value
                ? 'ring-2 ring-offset-2 ring-primary'
                : 'hover:scale-110'
            )}
            onClick={() => onSelectColor(color.value)}
            aria-label={`Select ${color.value} color`}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoColorPicker;
