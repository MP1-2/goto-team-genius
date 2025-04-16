
import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PurchasedName {
  id: string;
  name: string;
  purchasedAt: string;
}

interface PurchasedNameSelectorProps {
  purchasedNames: PurchasedName[];
  selectedNameId: string;
  onSelect: (id: string) => void;
}

const PurchasedNameSelector: React.FC<PurchasedNameSelectorProps> = ({
  purchasedNames,
  selectedNameId,
  onSelect,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="team-name">Your Reserved Team Names</Label>
      <Select
        value={selectedNameId}
        onValueChange={onSelect}
      >
        <SelectTrigger id="team-name" className="w-full">
          <SelectValue placeholder="Select a reserved team name" />
        </SelectTrigger>
        <SelectContent>
          {purchasedNames.map((name) => (
            <SelectItem key={name.id} value={name.id}>
              {name.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        Only reserved team names can be used to create logos
      </p>
    </div>
  );
};

export default PurchasedNameSelector;
