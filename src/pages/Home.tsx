
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, Bookmark, Image, Crown } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import ActionCard from '@/components/home/ActionCard';

const Home: React.FC = () => {
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
          <div className="grid grid-cols-2 gap-4">
            <ActionCard
              title="AI Suggestions"
              description="Get personalized team name ideas"
              icon={<Sparkles className="h-6 w-6" />}
              to="/suggestions"
            />
            <ActionCard
              title="Reserve Name"
              description="Secure your unique team name"
              icon={<Bookmark className="h-6 w-6" />}
              to="/search"
            />
            <ActionCard
              title="Create Logo"
              description="Generate a custom team logo"
              icon={<Image className="h-6 w-6" />}
              to="/logo"
            />
            <ActionCard
              title="Subscription"
              description="Upgrade for premium features"
              icon={<Crown className="h-6 w-6" />}
              to="/subscription"
            />
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Trending Names</h2>
            <Button variant="link" className="text-sm">
              See All
            </Button>
          </div>
          <div className="mt-2 space-y-3">
            {['Touchdown Titans', 'Hoop Dreams', 'Diamond Dynamos'].map((name) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span>{name}</span>
                <Button variant="outline" size="sm">
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
