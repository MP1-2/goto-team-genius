
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight } from 'lucide-react';

const Intro: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="animate-fade-in space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bookmark className="h-10 w-10" />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">GotoGuys</h1>
        
        <p className="text-xl text-muted-foreground">
          Find and reserve unique fantasy team names
        </p>
        
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-muted-foreground">
            Reserve exclusive names across ESPN, Yahoo, Sleeper, and NFL
          </p>
          
          <p className="text-sm text-muted-foreground">
            Get AI-powered name suggestions tailored to your preferences
          </p>
          
          <p className="text-sm text-muted-foreground">
            Create custom logos for your fantasy teams
          </p>
        </div>
        
        <Button asChild className="mt-8" size="lg">
          <Link to="/login">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        
        <div className="mt-4">
          <Link to="/login" className="text-sm text-primary hover:underline">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
