
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, Sparkles, ImageIcon, ShieldCheck } from 'lucide-react';

interface SolutionSectionProps {
  solutionRef: React.RefObject<HTMLDivElement>;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ solutionRef }) => {
  const navigate = useNavigate();

  const solutions = [
    {
      id: 'name-reservation',
      title: 'Reserve Unique Names',
      description: 'Secure an exclusive team name across ESPN, Yahoo, Sleeper, NFL, and other fantasy platforms.',
      icon: <Bookmark className="h-7 w-7" />,
      path: '/solutions/name-reservation'
    },
    {
      id: 'ai-suggestions',
      title: 'AI Name Suggestions',
      description: 'Let our AI generate unique, creative, and personalized team name ideas based on your preferences.',
      icon: <Sparkles className="h-7 w-7" />,
      path: '/solutions/ai-suggestions'
    },
    {
      id: 'logo-generation',
      title: 'Logo Generation',
      description: 'Create professional-looking team logos that perfectly match your team name and style.',
      icon: <ImageIcon className="h-7 w-7" />,
      path: '/solutions/logo-generation'
    },
    {
      id: 'verified-checkmark',
      title: 'Verified Checkmark',
      description: 'Display an exclusive verification badge next to your team name, ensuring its authenticity and uniqueness.',
      icon: <ShieldCheck className="h-7 w-7" />,
      path: '/solutions/verified-checkmark'
    }
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

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
          {solutions.map((solution) => (
            <Card 
              key={solution.id}
              className="overflow-hidden border-2 hover:border-primary transition-all cursor-pointer"
              onClick={() => handleCardClick(solution.path)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold">{solution.title}</h3>
                <p className="text-muted-foreground">
                  {solution.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
