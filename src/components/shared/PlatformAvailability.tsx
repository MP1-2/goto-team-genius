
import React from 'react';
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
          className={`flex items-center rounded-full px-3 py-1 text-sm ${
            platform.available
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}
        >
          <span className="mr-1">{platform.name}</span>
          {platform.available ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <X className="h-3.5 w-3.5" />
          )}
        </div>
      ))}
    </div>
  );
};

export default PlatformAvailability;
