import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, Bookmark, Image } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import ActionCard from '@/components/home/ActionCard';
import { useNavigate } from 'react-router-dom';

// Mock data for recently searched names
const MOCK_RECENT_SEARCHES = [
  { id: '1', name: 'Touchdown Titans', searchedAt: '2025-04-15T10:30:00Z' },
  { id: '2', name: 'Hoop Dreams', searchedAt: '2025-04-14T14:45:00Z' },
  { id: '3', name: 'Diamond Dynamos', searchedAt: '2025-04-13T09:15:00Z' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState(MOCK_RECENT_SEARCHES);
  
  const handleCheckName = (name: string) => {
    navigate('/search', { state: { searchQuery: name } });
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="relative">
        <div className="bg-primary px-6 pb-16 pt-6 text-primary-foreground">
          <h1 className="mb-1 text-2xl font-bold">GotoGuys</h1>
          <p className="text-primary-foreground/80">
            Find your perfect fantasy team name
          </p>
        </div>
        <div className="absolute -bottom-6 left-0 right-0 px-6">
          <div className="flex items-center rounded-full bg-background p-1 shadow-md">
            <Input
              className="flex-1 rounded-full border-0 bg-transparent px-4 py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Search for a team name..."
              type="search"
            />
            <Button size="icon" className="rounded-full">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pt-12">
        <section className="mt-4">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ActionCard
              title="AI Suggestions"
              description="Get personalized team name ideas"
              icon={<Sparkles className="h-6 w-6" />}
              to="/suggestions"
              className="sm:col-span-1"
            />
            <ActionCard
              title="Reserve Name"
              description="Secure your unique team name"
              icon={<Bookmark className="h-6 w-6" />}
              to="/search"
              className="sm:col-span-1"
            />
            <ActionCard
              title="Create Logo"
              description="Generate a custom team logo"
              icon={<Image className="h-6 w-6" />}
              to="/logo"
              className="sm:col-span-1"
            />
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recently Searched</h2>
            <Button variant="link" className="text-sm">
              See All
            </Button>
          </div>
          <div className="mt-2 space-y-3">
            {recentSearches.map((search) => (
              <div
                key={search.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span>{search.name}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCheckName(search.name)}
                >
                  Check
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;
