
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LogoNameInputProps {
  name: string;
  setName: (name: string) => void;
}

const LogoNameInput: React.FC<LogoNameInputProps> = ({ name, setName }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="logo-name">Team Name</Label>
      <Input
        id="logo-name"
        placeholder="Enter your team name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full"
        autoFocus
        maxLength={30}
      />
      <p className="text-xs text-muted-foreground">
        {name.length}/30 characters
      </p>
    </div>
  );
};

export default LogoNameInput;
