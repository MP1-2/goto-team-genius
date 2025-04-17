
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Mock blog posts - same as in Blogs.tsx
const BLOG_POSTS = [
  {
    id: '1',
    title: 'Top Fantasy Football Draft Strategies for 2025',
    excerpt: 'Learn the secrets to dominating your fantasy football league this season.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.\n\nQuisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.',
    date: 'April 15, 2025',
    category: 'Football',
    league: 'NFL',
    type: 'Strategy',
    author: 'John Smith',
    authorTitle: 'Fantasy Sports Analyst',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    title: 'How to Pick the Perfect Fantasy Basketball Team',
    excerpt: 'Expert tips on building a championship-caliber fantasy basketball roster.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.\n\nQuisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.',
    date: 'April 10, 2025',
    category: 'Basketball',
    league: 'NBA',
    type: 'Tips',
    author: 'Emily Johnson',
    authorTitle: 'NBA Fantasy Expert',
    image: 'https://images.unsplash.com/photo-1546519638-68e109acd27d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    title: 'Fantasy Baseball: Undervalued Players to Target',
    excerpt: 'Discover hidden gems who could be the key to your fantasy baseball success.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.\n\nQuisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.',
    date: 'April 5, 2025',
    category: 'Baseball',
    league: 'MLB',
    type: 'Analysis',
    author: 'Michael Rodriguez',
    authorTitle: 'MLB Fantasy Analyst',
    image: 'https://images.unsplash.com/photo-1554143091-c41d76e3da15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '4',
    title: 'Fantasy Hockey: Sleeper Picks for 2025',
    excerpt: 'These overlooked players could give you a major advantage in your fantasy hockey league.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.\n\nQuisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.',
    date: 'April 1, 2025',
    category: 'Hockey',
    league: 'NHL',
    type: 'Analysis',
    author: 'Sarah Williams',
    authorTitle: 'NHL Fantasy Insider',
    image: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '5',
    title: 'Must-Have Players for Your Fantasy Football Team',
    excerpt: 'These players are set to have breakout seasons and should be on your radar.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.\n\nQuisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.',
    date: 'March 28, 2025',
    category: 'Football',
    league: 'NFL',
    type: 'Tips',
    author: 'Marcus Thompson',
    authorTitle: 'Fantasy Football Coach',
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '6',
    title: 'Fantasy Basketball: Mid-Season Roster Adjustments',
    excerpt: 'How to optimize your fantasy basketball roster as the season progresses.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.\n\nQuisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.',
    date: 'March 25, 2025',
    category: 'Basketball',
    league: 'NBA',
    type: 'Strategy',
    author: 'Lisa Chen',
    authorTitle: 'Fantasy Basketball Expert',
    image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
];

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = BLOG_POSTS.find(post => post.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blogs')}>Back to Articles</Button>
        </div>
      </div>
    );
  }
  
  // Find related posts (same category, different ID)
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mb-6"
          onClick={() => navigate('/blogs')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="rounded-lg overflow-hidden aspect-video mb-8">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a default sports image if the original fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";
                }}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded">{post.category}</span>
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{post.league}</span>
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{post.type}</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex items-center mb-8">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                {post.author[0]}
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-muted-foreground">{post.authorTitle}</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">{post.date}</div>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6">{paragraph}</p>
            ))}
          </div>
          
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map(relatedPost => (
                  <div 
                    key={relatedPost.id} 
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/blogs/${relatedPost.id}`)}
                  >
                    <div className="aspect-video rounded-md overflow-hidden mb-3">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          // Fallback to a default sports image if the original fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
                        }}
                      />
                    </div>
                    <h4 className="font-medium mb-2 hover:text-primary">{relatedPost.title}</h4>
                    <p className="text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
