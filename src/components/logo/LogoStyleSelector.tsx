
import React from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LogoStyle } from '@/pages/LogoCreation';

interface LogoStyleSelectorProps {
  selectedStyle: LogoStyle;
  onSelectStyle: (style: LogoStyle) => void;
}

const LogoStyleSelector: React.FC<LogoStyleSelectorProps> = ({ 
  selectedStyle, 
  onSelectStyle 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="logo-style">Logo Style</Label>
      <Select 
        value={selectedStyle}
        onValueChange={(value) => onSelectStyle(value as LogoStyle)}
      >
        <SelectTrigger id="logo-style">
          <SelectValue placeholder="Select a style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Modern" className="flex items-center">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-primary rounded mr-2"></div>
              <span>Modern</span>
            </div>
          </SelectItem>
          <SelectItem value="Vintage" className="flex items-center">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
              <span>Vintage</span>
            </div>
          </SelectItem>
          <SelectItem value="Cartoon" className="flex items-center">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
              <span>Cartoon</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        {selectedStyle === 'Modern' && 'Clean, sleek design with sharp lines and minimal elements'}
        {selectedStyle === 'Vintage' && 'Classic look with retro elements and decorative touches'}
        {selectedStyle === 'Cartoon' && 'Playful design with bold colors and fun elements'}
      </p>
    </div>
  );
};

export default LogoStyleSelector;
