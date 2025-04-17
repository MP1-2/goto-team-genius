
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Find Your Perfect Fantasy Team Name</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Reserve exclusive names, get AI-powered suggestions, and create custom logos for your fantasy sports teams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button asChild size="lg" className="flex-1">
              <Link to="/search">Check Name</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="flex-1 bg-white text-primary hover:bg-white/90"
            >
              <Link to="/search">Check Name</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
