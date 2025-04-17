
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, Sparkles, ImageIcon, ShieldCheck } from 'lucide-react';

interface SolutionSectionProps {
  solutionRef: React.RefObject<HTMLDivElement>;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ solutionRef }) => {
  return (
    <section ref={solutionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Our Solution</h2>
          <p className="text-muted-foreground max-w-2xl">
            A comprehensive platform for all your fantasy team branding needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card className="overflow-hidden border-2 hover:border-primary transition-all">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Bookmark className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">Reserve Unique Names</h3>
              <p className="text-muted-foreground">
                Secure an exclusive team name across ESPN, Yahoo, Sleeper, NFL, and other fantasy platforms.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-2 hover:border-primary transition-all">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">AI Name Suggestions</h3>
              <p className="text-muted-foreground">
                Let our AI generate unique, creative, and personalized team name ideas based on your preferences.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-2 hover:border-primary transition-all">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ImageIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">Logo Generation</h3>
              <p className="text-muted-foreground">
                Create professional-looking team logos that perfectly match your team name and style.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-2 hover:border-primary transition-all">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">Verified Checkmark</h3>
              <p className="text-muted-foreground">
                Display an exclusive verification badge next to your team name, ensuring its authenticity and uniqueness.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
