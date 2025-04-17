
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Filter, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock blog posts with images
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
    image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f76?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
    image: 'https://images.unsplash.com/photo-1546519638-68e109acd27d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
    image: 'https://images.unsplash.com/photo-1554143091-c41d76e3da15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
    image: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
    image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

// Define unique categories, leagues, and types for filtering
const categories = Array.from(new Set(BLOG_POSTS.map(post => post.category)));
const leagues = Array.from(new Set(BLOG_POSTS.map(post => post.league)));
const types = Array.from(new Set(BLOG_POSTS.map(post => post.type)));

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = BLOG_POSTS.filter(post => {
    // Filter by search query
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category, league, and type
    if (selectedCategory && post.category !== selectedCategory) return false;
    if (selectedLeague && post.league !== selectedLeague) return false;
    if (selectedType && post.type !== selectedType) return false;
    
    return true;
  });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedLeague(null);
    setSelectedType(null);
    setSearchQuery('');
  };

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

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..." 
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter Articles</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="font-semibold text-xs">By Sport</DropdownMenuLabel>
                {categories.map(category => (
                  <DropdownMenuItem 
                    key={category}
                    className={selectedCategory === category ? "bg-primary/10" : ""}
                    onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="font-semibold text-xs">By League</DropdownMenuLabel>
                {leagues.map(league => (
                  <DropdownMenuItem 
                    key={league}
                    className={selectedLeague === league ? "bg-primary/10" : ""}
                    onClick={() => setSelectedLeague(league === selectedLeague ? null : league)}
                  >
                    {league}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="font-semibold text-xs">By Type</DropdownMenuLabel>
                {types.map(type => (
                  <DropdownMenuItem 
                    key={type}
                    className={selectedType === type ? "bg-primary/10" : ""}
                    onClick={() => setSelectedType(type === selectedType ? null : type)}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={clearFilters}>
                  Clear All Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory || selectedLeague || selectedType) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedCategory && (
              <div className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                Sport: {selectedCategory}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSelectedCategory(null)}
                >
                  <span className="sr-only">Remove</span>
                  ×
                </Button>
              </div>
            )}
            {selectedLeague && (
              <div className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                League: {selectedLeague}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSelectedLeague(null)}
                >
                  <span className="sr-only">Remove</span>
                  ×
                </Button>
              </div>
            )}
            {selectedType && (
              <div className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                Type: {selectedType}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSelectedType(null)}
                >
                  <span className="sr-only">Remove</span>
                  ×
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Articles Grid with ScrollArea */}
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-all hover:scale-105"
                    />
                  </div>
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
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Blogs;
