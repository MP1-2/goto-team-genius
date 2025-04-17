import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlatformAvailability from '@/components/shared/PlatformAvailability';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    name: string;
    platforms: { name: string; available: boolean }[];
  } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    setIsLoggedIn(!!userInfo);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a team name to search');
      return;
    }
    
    setIsSearching(true);
    
    setTimeout(() => {
      const result = {
        name: searchQuery,
        platforms: [
          { name: 'ESPN', available: Math.random() > 0.5 },
          { name: 'Yahoo', available: Math.random() > 0.5 },
          { name: 'Sleeper', available: Math.random() > 0.5 },
          { name: 'NFL', available: Math.random() > 0.5 },
        ],
      };
      
      setSearchResult(result);
      setIsSearching(false);
    }, 1000);
  };

  const handleReserve = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to reserve this name');
      sessionStorage.setItem('pendingReservation', searchResult?.name || '');
      navigate('/login');
      return;
    }
    
    toast.success('Redirecting to reservation page');
    navigate('/reservation', { state: { teamName: searchResult?.name } });
  };

  const handleLogin = () => {
    if (searchResult) {
      sessionStorage.setItem('pendingReservation', searchResult.name);
    }
    navigate('/login');
  };

  return (
    <section className="relative bg-[#4566E8] text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Find Your Perfect Fantasy Team Name</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Reserve exclusive names, get AI-powered suggestions, and create custom logos for your fantasy sports teams
            </p>
            <div className="flex gap-3 w-full max-w-md">
              <Input 
                placeholder="Enter team name..." 
                className="bg-white/90 text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-white text-[#4566E8] hover:bg-white/90"
              >
                {isSearching ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="ml-2">Check</span>
              </Button>
            </div>
          </div>
          
          {/* Loading state */}
          {isSearching && (
            <div className="flex items-center justify-center w-full max-w-2xl mx-auto min-h-[300px] bg-white/10 rounded-lg border border-white/20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            </div>
          )}
          
          {/* Search results */}
          {searchResult && (
            <div className="w-full max-w-2xl mx-auto">
              <Card className="bg-white text-gray-900 p-6 rounded-lg shadow-lg animate-in fade-in duration-300">
                <div className="mb-4 w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/ec71341c-a362-44f6-b970-0f1bb995671b.png" 
                    alt="Team Name Availability" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <h2 className="text-2xl font-bold text-[#4566E8] mb-4">{searchResult.name}</h2>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Availability Status
                  </h3>
                  <PlatformAvailability platforms={searchResult.platforms} />
                </div>
                
                <div className="mt-4">
                  {!isLoggedIn && (
                    <div className="p-4 bg-blue-50 rounded-lg mb-4 border border-blue-100">
                      <div className="flex flex-col items-center space-y-3 text-center">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Lock className="h-6 w-6 text-[#4566E8]" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800">Secure Your Team Name</h3>
                        <p className="text-sm text-gray-600">
                          Log in to GotoGuys to ensure exclusivity and reserve your team name across all fantasy sports platforms
                        </p>
                        <Button onClick={handleLogin} className="mt-2 w-full bg-[#4566E8]" size="lg">
                          <LogIn className="mr-2 h-5 w-5" /> Log in to GotoGuys
                        </Button>
                      </div>
                    </div>
                  )}

                  {isLoggedIn && (
                    <Button 
                      className="w-full bg-[#4566E8]" 
                      onClick={handleReserve} 
                      disabled={!searchResult.platforms.some(p => p.available)}
                    >
                      {searchResult.platforms.some(p => p.available) ? 
                        'Reserve This Name' : 
                        'This name is not available on any platform'}
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
