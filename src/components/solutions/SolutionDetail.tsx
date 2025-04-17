
import React, { useRef } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface SolutionSection {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface SolutionDetailProps {
  title: string;
  description: string;
  sections: SolutionSection[];
  actionLink: string;
  actionText: string;
}

const SolutionDetail: React.FC<SolutionDetailProps> = ({
  title,
  description,
  sections,
  actionLink,
  actionText
}) => {
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const scrollToNextSection = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollBy({ top: 300, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white p-4 shadow-sm fixed top-0 w-full z-10">
        <div className="container mx-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/home')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-semibold">{title}</span>
        </div>
      </header>
      
      <main className="flex-1 pt-16 pb-20">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="max-w-2xl mx-auto mb-8">{description}</p>
            <Button 
              variant="default"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => navigate(actionLink)}
            >
              {actionText}
            </Button>
          </div>
        </section>
        
        {/* Scrollable Content */}
        <div className="relative">
          <ScrollArea ref={scrollAreaRef} className="h-[calc(100vh-16rem)]">
            <div className="container mx-auto px-4 md:px-6 py-8">
              {sections.map((section, index) => (
                <div 
                  key={section.id}
                  className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center gap-8 py-16 border-b last:border-b-0`}
                >
                  <div className="w-full md:w-1/2">
                    <img
                      src={section.imageUrl}
                      alt={section.title}
                      className="rounded-lg shadow-md w-full h-auto object-cover aspect-video"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=60";
                      }}
                    />
                  </div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <h2 className="text-2xl font-semibold">{section.title}</h2>
                    <p className="text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Scroll indicator */}
          <div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
            onClick={scrollToNextSection}
          >
            <ChevronDown className="h-8 w-8 text-primary" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SolutionDetail;
