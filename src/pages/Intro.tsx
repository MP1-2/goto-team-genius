
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Intro: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center bg-white">
      <div className="space-y-6 max-w-md w-full">
        <h1 className="text-4xl font-bold text-black">GotoGuys</h1>
        
        <p className="text-xl text-gray-600">
          Find and reserve unique fantasy team names
        </p>
        
        <div className="space-y-2 text-gray-500">
          <p>Reserve exclusive names across ESPN, Yahoo, Sleeper, and NFL</p>
          <p>Get AI-powered name suggestions tailored to your preferences</p>
          <p>Create custom logos for your fantasy teams</p>
        </div>
        
        <Button asChild className="w-full mt-8" size="lg">
          <Link to="/login" className="flex items-center justify-center">
            Go to the App
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Intro;
