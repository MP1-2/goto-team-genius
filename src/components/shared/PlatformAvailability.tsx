
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface Platform {
  name: string;
  available: boolean;
}

interface PlatformAvailabilityProps {
  platforms: Platform[];
}

const PlatformAvailability: React.FC<PlatformAvailabilityProps> = ({ platforms }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((platform) => (
        <div
          key={platform.name}
          className={cn(
            'platform-badge',
            platform.available ? 'platform-badge-available' : 'platform-badge-taken'
          )}
        >
          <span className="mr-1">{platform.name}</span>
          {platform.available ? (
            <Check className="h-3 w-3" />
          ) : (
            <X className="h-3 w-3" />
          )}
        </div>
      ))}
    </div>
  );
};

export default PlatformAvailability;
