
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft, Clock, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import PlatformAvailability from '@/components/shared/PlatformAvailability';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

const TeamNameSearch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{
    name: string;
    platforms: { name: string; available: boolean }[];
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  // Mock data for recently searched names
  const recentSearches = [
    { id: '1', name: 'Touchdown Titans', searchedAt: '2025-04-15T10:30:00Z' },
    { id: '2', name: 'Hoop Dreams', searchedAt: '2025-04-14T14:45:00Z' },
    { id: '3', name: 'Diamond Dynamos', searchedAt: '2025-04-13T09:15:00Z' },
  ];

  // Check for pre-populated search query from location state
  useEffect(() => {
    const state = location.state as { searchQuery?: string; searchTerm?: string } | null;
    
    if (state) {
      // Handle both possible property names for backward compatibility
      const query = state.searchQuery || state.searchTerm;
      
      if (query) {
        setSearchQuery(query);
        // Auto-search when arriving with a pre-populated query
        handleSearch(query);
      }
    }
  }, [location.state]);

  // Show recent searches when user types and hasn't submitted yet
  useEffect(() => {
    if (searchQuery.trim() && !searchResult && !isSearching) {
      setShowRecentSearches(true);
    } else if (!searchQuery.trim() || searchResult || isSearching) {
      setShowRecentSearches(false);
    }
  }, [searchQuery, searchResult, isSearching]);

  const handleSearch = (query: string = searchQuery) => {
    if (!query.trim()) {
      toast.error('Please enter a team name to search');
      return;
    }
    
    setIsSearching(true);
    setShowRecentSearches(false);
    
    // Simulate API call
    setTimeout(() => {
      // For demo, generate random availability
      const result = {
        name: query,
        platforms: [
          { name: 'ESPN', available: Math.random() > 0.5 },
          { name: 'Yahoo', available: Math.random() > 0.5 },
          { name: 'Sleeper', available: Math.random() > 0.5 },
          { name: 'NFL', available: Math.random() > 0.5 },
        ],
      };
      
      setSearchResult(result);
      setIsSearching(false);
    }, 1500);
  };

  const handleRecentSearchClick = (name: string) => {
    setSearchQuery(name);
    handleSearch(name);
  };

  const handleReserve = () => {
    // Check if user is logged in before proceeding to reservation
    const userInfo = localStorage.getItem('userInfo');
    
    if (!userInfo) {
      toast.error('Please log in to reserve this name');
      // Save team name in session storage so we can redirect back after login
      sessionStorage.setItem('pendingReservation', searchResult?.name || '');
      navigate('/login');
      return;
    }
    
    toast.success('Redirecting to reservation page');
    navigate('/reservation', { state: { teamName: searchResult?.name } });
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background">
        <div className="flex items-center border-b px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/portal')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold">Team Name Search</h1>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-6 pt-6">
        <div className="flex gap-2">
          <Input
            placeholder="Enter team name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={() => handleSearch()} disabled={isSearching}>
            {isSearching ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Recent Searches (shown only when typing and not searching) */}
        {showRecentSearches && (
          <div className="mt-4 space-y-2 animate-in fade-in duration-200">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              Recent Searches
            </p>
            {recentSearches.map((search) => (
              <Card 
                key={search.id} 
                className="hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleRecentSearchClick(search.name)}
              >
                <CardContent className="p-3 flex items-center justify-between">
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
        )}

        {/* Search Result */}
        {searchResult && (
          <div className="mt-6 animate-fade-in rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-bold">{searchResult.name}</h2>
            
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Availability Status
              </h3>
              <PlatformAvailability platforms={searchResult.platforms} />
            </div>
            
            <div className="mt-6">
              {searchResult.platforms.some((p) => p.available) ? (
                <Button className="w-full" onClick={handleReserve}>
                  Reserve This Name
                </Button>
              ) : (
                <div className="text-center text-sm text-muted-foreground">
                  This name is not available on any platform.
                  <div className="mt-2">
                    <Button variant="outline" onClick={() => navigate('/suggestions')}>
                      Get AI Suggestions
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamNameSearch;
