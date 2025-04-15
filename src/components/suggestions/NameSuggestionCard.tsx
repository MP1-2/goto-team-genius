
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, RefreshCw, Star } from 'lucide-react';
import PlatformAvailability from '../shared/PlatformAvailability';
import { cn } from '@/lib/utils';

interface NameSuggestionCardProps {
  name: string;
  platforms?: { name: string; available: boolean }[];
  checked?: boolean;
  favorite?: boolean;
  onCheckAvailability?: () => void;
  onReserve?: () => void;
  onToggleFavorite?: () => void;
  className?: string;
}

const NameSuggestionCard: React.FC<NameSuggestionCardProps> = ({
  name,
  platforms,
  checked = false,
  favorite = false,
  onCheckAvailability,
  onReserve,
  onToggleFavorite,
  className,
}) => {
  return (
    <div className={cn("rounded-lg border bg-card p-4 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        {onToggleFavorite && (
          <button 
            onClick={onToggleFavorite}
            className={cn(
              "rounded-full p-1 transition-colors",
              favorite ? "text-accent" : "text-muted-foreground hover:text-accent"
            )}
          >
            <Star className="h-5 w-5" fill={favorite ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      
      {platforms && (
        <div className="mt-2">
          <PlatformAvailability platforms={platforms} />
        </div>
      )}
      
      <div className="mt-4 flex flex-wrap gap-2">
        {!checked && onCheckAvailability && (
          <Button 
            onClick={onCheckAvailability} 
            variant="outline" 
            className="flex-1"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Check Availability
          </Button>
        )}
        
        {checked && onReserve && (
          <Button 
            onClick={onReserve}
            className="flex-1"
          >
            <Check className="mr-2 h-4 w-4" />
            Reserve
          </Button>
        )}
      </div>
    </div>
  );
};

export default NameSuggestionCard;
