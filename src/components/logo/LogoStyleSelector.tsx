
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
          <SelectItem value="Modern">Modern</SelectItem>
          <SelectItem value="Vintage">Vintage</SelectItem>
          <SelectItem value="Cartoon">Cartoon</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LogoStyleSelector;
