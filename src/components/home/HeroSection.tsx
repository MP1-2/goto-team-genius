
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCheckName = () => {
    navigate('/login');
  };

  return (
    <section className="relative bg-[#4566E8] text-white py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Find Your Perfect Fantasy Team Name</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Reserve exclusive names, get AI-powered suggestions, and create custom logos for your fantasy sports teams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button 
              variant="ghost" 
              className="flex-1 text-white border border-white hover:bg-white/10"
              onClick={handleCheckName}
            >
              Check Name
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
