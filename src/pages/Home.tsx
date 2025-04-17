import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, Bookmark, Image, ArrowRight, CheckCircle, Smartphone, Trophy, Handshake, Newspaper } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ActionCard from '@/components/home/ActionCard';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for recently searched names
const MOCK_RECENT_SEARCHES = [
  { id: '1', name: 'Touchdown Titans', searchedAt: '2025-04-15T10:30:00Z' },
  { id: '2', name: 'Hoop Dreams', searchedAt: '2025-04-14T14:45:00Z' },
  { id: '3', name: 'Diamond Dynamos', searchedAt: '2025-04-13T09:15:00Z' },
];

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

// Mock rankings
const PLAYER_RANKINGS = [
  { id: '1', name: 'Christian McCaffrey', sport: 'Football', position: 'RB', rank: 1 },
  { id: '2', name: 'Nikola Jokić', sport: 'Basketball', position: 'C', rank: 1 },
  { id: '3', name: 'Aaron Judge', sport: 'Baseball', position: 'OF', rank: 1 },
  { id: '4', name: 'Connor McDavid', sport: 'Hockey', position: 'C', rank: 1 },
];

// Mock partners
const PARTNERS = [
  { id: '1', name: 'ESPN Fantasy', logo: '🏆' },
  { id: '2', name: 'Yahoo Fantasy', logo: '🎮' },
  { id: '3', name: 'NFL Fantasy', logo: '🏈' },
  { id: '4', name: 'Sleeper', logo: '💤' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const solutionRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);
  const rankingsRef = useRef<HTMLDivElement>(null);
  const partnershipsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleCheckName = (name: string) => {
    navigate('/search', { state: { searchQuery: name } });
  };

  const redirectToSearch = () => {
    navigate('/search');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">GotoGuys</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection(blogsRef)} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <span className="flex items-center gap-1"><Newspaper className="h-4 w-4" /> Blogs</span>
            </button>
            <button 
              onClick={() => scrollToSection(rankingsRef)} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <span className="flex items-center gap-1"><Trophy className="h-4 w-4" /> Rankings</span>
            </button>
            <button 
              onClick={() => scrollToSection(partnershipsRef)} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <span className="flex items-center gap-1"><Handshake className="h-4 w-4" /> Partnerships</span>
            </button>
            <button 
              onClick={() => scrollToSection(solutionRef)} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Our Solution</span>
            </button>
          </nav>
          
          <div>
            <Button asChild size="sm">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Find Your Perfect Fantasy Team Name</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl">
              Reserve exclusive names, get AI-powered suggestions, and create custom logos for your fantasy sports teams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button asChild size="lg" className="flex-1">
                <Link to="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1 bg-white text-primary hover:bg-white/90">
                <Link to="/search">Check Name</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section ref={solutionRef} className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Our Solution</h2>
            <p className="text-muted-foreground max-w-2xl">
              A comprehensive platform for all your fantasy team branding needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-2 hover:border-primary transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Bookmark className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold">Reserve Unique Names</h3>
                <p className="text-muted-foreground">
                  Secure an exclusive team name across ESPN, Yahoo, Sleeper, NFL, and other fantasy platforms.
                </p>
                <Button asChild variant="outline">
                  <Link to="/search">Check Availability</Link>
                </Button>
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
                <Button asChild variant="outline">
                  <Link to="/suggestions">Get Suggestions</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-2 hover:border-primary transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Image className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold">Logo Generation</h3>
                <p className="text-muted-foreground">
                  Create professional-looking team logos that perfectly match your team name and style.
                </p>
                <Button asChild variant="outline">
                  <Link to="/logo">Create Logo</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
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
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline">View All Articles</Button>
          </div>
        </div>
      </section>

      {/* Rankings Section */}
      <section ref={rankingsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Player Rankings</h2>
            <p className="text-muted-foreground max-w-2xl">
              Stay up-to-date with the top-ranked players across different fantasy sports
            </p>
          </div>
          
          <Tabs defaultValue="football" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="football">Football</TabsTrigger>
              <TabsTrigger value="basketball">Basketball</TabsTrigger>
              <TabsTrigger value="baseball">Baseball</TabsTrigger>
              <TabsTrigger value="hockey">Hockey</TabsTrigger>
            </TabsList>
            
            <TabsContent value="football" className="border rounded-lg p-4">
              <div className="space-y-4">
                {PLAYER_RANKINGS.filter(player => player.sport === 'Football').map((player) => (
                  <div key={player.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {player.rank}
                      </div>
                      <div>
                        <h4 className="font-medium">{player.name}</h4>
                        <p className="text-sm text-muted-foreground">{player.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Similar content for other tabs */}
            <TabsContent value="basketball" className="border rounded-lg p-4">
              <div className="space-y-4">
                {PLAYER_RANKINGS.filter(player => player.sport === 'Basketball').map((player) => (
                  <div key={player.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {player.rank}
                      </div>
                      <div>
                        <h4 className="font-medium">{player.name}</h4>
                        <p className="text-sm text-muted-foreground">{player.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="baseball" className="border rounded-lg p-4">
              <div className="space-y-4">
                {PLAYER_RANKINGS.filter(player => player.sport === 'Baseball').map((player) => (
                  <div key={player.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {player.rank}
                      </div>
                      <div>
                        <h4 className="font-medium">{player.name}</h4>
                        <p className="text-sm text-muted-foreground">{player.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="hockey" className="border rounded-lg p-4">
              <div className="space-y-4">
                {PLAYER_RANKINGS.filter(player => player.sport === 'Hockey').map((player) => (
                  <div key={player.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {player.rank}
                      </div>
                      <div>
                        <h4 className="font-medium">{player.name}</h4>
                        <p className="text-sm text-muted-foreground">{player.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-10 text-center">
            <Button variant="outline">View Complete Rankings</Button>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section ref={partnershipsRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Our Partnerships</h2>
            <p className="text-muted-foreground max-w-2xl">
              We work with the leading fantasy sports platforms to provide you with a seamless experience
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {PARTNERS.map((partner) => (
              <div key={partner.id} className="flex flex-col items-center space-y-3">
                <div className="h-24 w-24 rounded-full bg-white shadow flex items-center justify-center text-4xl">
                  {partner.logo}
                </div>
                <h3 className="font-medium">{partner.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-6">
              Interested in partnering with GotoGuys? We're always looking to expand our network of fantasy sports platforms.
            </p>
            <Button>Contact Us</Button>
          </div>
        </div>
      </section>

      {/* App Teaser Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Get the GotoGuys App</h2>
              <p className="text-lg text-muted-foreground">
                Access all our features on the go. Download our mobile app for a seamless fantasy team management experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  App Store
                </Button>
                <Button className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Google Play
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-8 rounded-xl shadow-lg w-72 h-96 flex items-center justify-center">
                <p className="text-center text-muted-foreground">
                  [App Screenshot]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">GotoGuys</h3>
              <p className="text-gray-400">
                Your ultimate platform for fantasy team branding and name management.
              </p>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">📱</span> (123) 456-7890
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✉️</span> contact@gotoguys.com
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📍</span> 123 Fantasy Lane, Sports City
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">FAQs</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Download</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-800 hover:text-white">
                  <Smartphone className="mr-2 h-5 w-5" />
                  App Store
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-800 hover:text-white">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Google Play
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 GotoGuys. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                <span className="text-xl">📱</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="text-xl">📷</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="text-xl">👥</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Keep the BottomNavigation only for mobile */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Home;
