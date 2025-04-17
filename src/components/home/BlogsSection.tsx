
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock blog posts
const BLOG_POSTS = [
  {
    id: '1',
    title: 'Top Fantasy Football Draft Strategies for 2025',
    excerpt: 'Learn the secrets to dominating your fantasy football league this season.',
    date: 'April 15, 2025',
  },
  {
    id: '2',
    title: 'How to Pick the Perfect Fantasy Basketball Team',
    excerpt: 'Expert tips on building a championship-caliber fantasy basketball roster.',
    date: 'April 10, 2025',
  },
  {
    id: '3',
    title: 'Fantasy Baseball: Undervalued Players to Target',
    excerpt: 'Discover hidden gems who could be the key to your fantasy baseball success.',
    date: 'April 5, 2025',
  },
];

interface BlogsSectionProps {
  blogsRef: React.RefObject<HTMLDivElement>;
}

const BlogsSection: React.FC<BlogsSectionProps> = ({ blogsRef }) => {
  const navigate = useNavigate();

  const handleViewAllArticles = () => {
    navigate('/blogs');
  };

  const handleReadMore = (articleId: string) => {
    navigate(`/blogs/${articleId}`);
  };

  return (
    <section ref={blogsRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Latest Fantasy Sports Tips</h2>
          <p className="text-muted-foreground max-w-2xl">
            Expert advice, news, and insights to help you dominate your fantasy leagues
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">{post.date}</div>
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary"
                    onClick={() => handleReadMore(post.id)}
                  >
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" onClick={handleViewAllArticles}>View All Articles</Button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
