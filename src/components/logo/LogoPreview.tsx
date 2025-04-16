
import React from 'react';
import { Loader2 } from 'lucide-react';
import { LogoColor, LogoStyle } from '@/pages/LogoCreation';
import { cn } from '@/lib/utils';

interface LogoPreviewProps {
  teamName: string;
  color: LogoColor;
  style: LogoStyle;
  isLoading: boolean;
  isGenerated: boolean;
}

const LogoPreview: React.FC<LogoPreviewProps> = ({
  teamName,
  color,
  style,
  isLoading,
  isGenerated,
}) => {
  const getTextColor = () => {
    switch (color) {
      case 'blue': return 'text-blue-500';
      case 'red': return 'text-red-500';
      case 'green': return 'text-green-500';
      case 'purple': return 'text-purple-500';
      case 'orange': return 'text-orange-500';
      case 'black': return 'text-gray-800';
      default: return 'text-blue-500';
    }
  };

  const getBgColor = () => {
    switch (color) {
      case 'blue': return 'bg-blue-100';
      case 'red': return 'bg-red-100';
      case 'green': return 'bg-green-100';
      case 'purple': return 'bg-purple-100';
      case 'orange': return 'bg-orange-100';
      case 'black': return 'bg-gray-100';
      default: return 'bg-blue-100';
    }
  };

  const getFontFamily = () => {
    switch (style) {
      case 'Modern': return 'font-sans';
      case 'Vintage': return 'font-serif';
      case 'Cartoon': return 'font-mono';
      default: return 'font-sans';
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium mb-2">Preview</h3>
      <div className={cn(
        "border rounded-lg flex items-center justify-center p-8",
        getBgColor(),
        "h-64 relative"
      )}>
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-2 text-sm text-gray-500">Generating your logo...</p>
          </div>
        ) : isGenerated ? (
          <div className={cn(
            "text-center flex flex-col items-center",
            getTextColor(),
            getFontFamily()
          )}>
            {/* Different rendering based on style */}
            {style === 'Modern' && (
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-16 h-16 rounded-lg flex items-center justify-center mb-2",
                  getTextColor(),
                  "border-2"
                )}>
                  <span className="text-xl font-bold">{teamName.substring(0, 1)}</span>
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-wider">{teamName}</h2>
              </div>
            )}
            
            {style === 'Vintage' && (
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center mb-3 border-2",
                  getTextColor()
                )}>
                  <span className="text-2xl italic">{teamName.substring(0, 2)}</span>
                </div>
                <h2 className="text-2xl italic">{teamName}</h2>
                <div className="mt-2 text-xs uppercase tracking-widest">EST. 2025</div>
              </div>
            )}
            
            {style === 'Cartoon' && (
              <div className="flex flex-col items-center">
                <div className={cn(
                  "flex items-center justify-center mb-2"
                )}>
                  <span className="text-4xl font-extrabold">{teamName}</span>
                </div>
                <div className="border-t border-b border-current py-1 px-4 text-xs uppercase tracking-wider">
                  TEAM LOGO
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p>Your logo preview will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoPreview;
