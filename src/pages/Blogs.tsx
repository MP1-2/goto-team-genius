
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Mock blog posts
const BLOG_POSTS = [
  {
    id: '1',
    title: 'Top Fantasy Football Draft Strategies for 2025',
    excerpt: 'Learn the secrets to dominating your fantasy football league this season.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    date: 'April 15, 2025',
    category: 'Football',
    league: 'NFL',
    type: 'Strategy',
  },
  {
    id: '2',
    title: 'How to Pick the Perfect Fantasy Basketball Team',
    excerpt: 'Expert tips on building a championship-caliber fantasy basketball roster.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    date: 'April 10, 2025',
    category: 'Basketball',
    league: 'NBA',
    type: 'Tips',
  },
  {
    id: '3',
    title: 'Fantasy Baseball: Undervalued Players to Target',
    excerpt: 'Discover hidden gems who could be the key to your fantasy baseball success.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    date: 'April 5, 2025',
    category: 'Baseball',
    league: 'MLB',
    type: 'Analysis',
  },
  {
    id: '4',
    title: 'Fantasy Hockey: Sleeper Picks for 2025',
    excerpt: 'These overlooked players could give you a major advantage in your fantasy hockey league.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    date: 'April 1, 2025',
    category: 'Hockey',
    league: 'NHL',
    type: 'Analysis',
  },
  {
    id: '5',
    title: 'Must-Have Players for Your Fantasy Football Team',
    excerpt: 'These players are set to have breakout seasons and should be on your radar.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    date: 'March 28, 2025',
    category: 'Football',
    league: 'NFL',
    type: 'Tips',
  },
  {
    id: '6',
    title: 'Fantasy Basketball: Mid-Season Roster Adjustments',
    excerpt: 'How to optimize your fantasy basketball roster as the season progresses.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    date: 'March 25, 2025',
    category: 'Basketball',
    league: 'NBA',
    type: 'Strategy',
  },
];

// Define unique categories, leagues, and types for filtering
const categories = Array.from(new Set(BLOG_POSTS.map(post => post.category)));
const leagues = Array.from(new Set(BLOG_POSTS.map(post => post.league)));
const types = Array.from(new Set(BLOG_POSTS.map(post => post.type)));

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = React.useState<string | null>(null);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);

  const filteredPosts = BLOG_POSTS.filter(post => {
    if (selectedCategory && post.category !== selectedCategory) return false;
    if (selectedLeague && post.league !== selectedLeague) return false;
    if (selectedType && post.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center mb-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Fantasy Sports Articles</h1>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sport</label>
            <select 
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Sports</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">League</label>
            <select 
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={selectedLeague || ''}
              onChange={(e) => setSelectedLeague(e.target.value || null)}
            >
              <option value="">All Leagues</option>
              {leagues.map(league => (
                <option key={league} value={league}>{league}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Content Type</label>
            <select 
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={selectedType || ''}
              onChange={(e) => setSelectedType(e.target.value || null)}
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded">{post.category}</span>
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{post.league}</span>
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{post.type}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{post.date}</div>
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary"
                    onClick={() => navigate(`/blogs/${post.id}`)}
                  >
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
