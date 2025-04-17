
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Wand, Image } from 'lucide-react';

const ActionShortcuts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-3 gap-4">
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/search')}>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <span className="text-sm font-medium text-center">Reserve Name</span>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/suggestions')}>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Wand className="h-6 w-6 text-primary" />
          </div>
          <span className="text-sm font-medium text-center">AI Name</span>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/logo')}>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Image className="h-6 w-6 text-primary" />
          </div>
          <span className="text-sm font-medium text-center">AI Logo</span>
        </CardContent>
      </Card>
    </section>
  );
};

export default ActionShortcuts;
