
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Wand, Image, Clock, User, Heart } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';

const UserPortal: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo') || '{}') 
    : { name: 'User' };

  // Mock data for recently searched names
  const recentSearches = [
    { id: '1', name: 'Touchdown Titans', searchedAt: '2025-04-15T10:30:00Z' },
    { id: '2', name: 'Hoop Dreams', searchedAt: '2025-04-14T14:45:00Z' },
    { id: '3', name: 'Diamond Dynamos', searchedAt: '2025-04-13T09:15:00Z' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Welcome, {userInfo.name}</h1>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        {/* Action Shortcuts */}
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

        {/* Recently Searched Names */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Recently Searched</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/search')}>
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {recentSearches.map((search) => (
              <Card key={search.id} className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate('/search', { state: { searchQuery: search.name } })}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{search.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    navigate('/favorites');
                  }}>
                    <Heart className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Suggested Categories */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Suggested Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-blue-100 text-blue-800 hover:bg-blue-200 justify-start" variant="ghost" onClick={() => navigate('/search', { state: { category: 'football' } })}>
              Football
            </Button>
            <Button className="bg-green-100 text-green-800 hover:bg-green-200 justify-start" variant="ghost" onClick={() => navigate('/search', { state: { category: 'basketball' } })}>
              Basketball
            </Button>
            <Button className="bg-red-100 text-red-800 hover:bg-red-200 justify-start" variant="ghost" onClick={() => navigate('/search', { state: { category: 'baseball' } })}>
              Baseball
            </Button>
            <Button className="bg-purple-100 text-purple-800 hover:bg-purple-200 justify-start" variant="ghost" onClick={() => navigate('/search', { state: { category: 'hockey' } })}>
              Hockey
            </Button>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default UserPortal;
