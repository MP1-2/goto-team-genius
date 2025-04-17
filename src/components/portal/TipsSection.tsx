
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

// Mock data for blog posts (renamed to team name tips)
const recentBlogs = [
  { 
    id: '1', 
    title: 'Use Alliteration for Memorable Names', 
    date: 'April 15, 2025',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f76?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: '2', 
    title: 'Incorporate Local Culture in Team Names', 
    date: 'April 10, 2025',
    image: 'https://images.unsplash.com/photo-1546519638-68e109acd27d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
];

const TipsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Tips for Good Team Name</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/blogs')}>
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recentBlogs.map((blog) => (
          <Card key={blog.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/blogs/${blog.id}`)}>
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-full object-cover transition-all hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=60";
                }}
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">{blog.date}</div>
                <h3 className="font-semibold">{blog.title}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TipsSection;
