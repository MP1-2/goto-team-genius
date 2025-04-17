
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Newspaper, Trophy, Handshake, CheckCircle } from 'lucide-react';

interface HeaderNavigationProps {
  onNavigate: (ref: React.RefObject<HTMLDivElement>) => void;
  blogsRef: React.RefObject<HTMLDivElement>;
  rankingsRef: React.RefObject<HTMLDivElement>;
  partnershipsRef: React.RefObject<HTMLDivElement>;
  solutionRef: React.RefObject<HTMLDivElement>;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  onNavigate,
  blogsRef,
  rankingsRef,
  partnershipsRef,
  solutionRef
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#4566E8] text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">GotoGuys</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => onNavigate(blogsRef)} 
            className="text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <span className="flex items-center gap-1"><Newspaper className="h-4 w-4" /> Blogs</span>
          </button>
          <button 
            onClick={() => onNavigate(rankingsRef)} 
            className="text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <span className="flex items-center gap-1"><Trophy className="h-4 w-4" /> Rankings</span>
          </button>
          <button 
            onClick={() => onNavigate(partnershipsRef)} 
            className="text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <span className="flex items-center gap-1"><Handshake className="h-4 w-4" /> Partnerships</span>
          </button>
          <button 
            onClick={() => onNavigate(solutionRef)} 
            className="text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Our Solution</span>
          </button>
        </nav>
        
        <div>
          <Button 
            variant="ghost" 
            className="text-white border border-white hover:bg-white/10"
            onClick={() => window.location.href = '/login'}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;
