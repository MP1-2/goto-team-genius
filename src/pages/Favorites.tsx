
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { toast } from 'sonner';

// Mock data - in a real app this would come from an API or local storage
const INITIAL_FAVORITES = [
  { id: '1', name: 'Thunder Dragons' },
  { id: '2', name: 'Lightning Eagles' },
  { id: '3', name: 'Golden Knights' },
  { id: '4', name: 'Cyber Vikings' },
];

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);

  const handleCheckAvailability = (name: string) => {
    navigate('/search', { state: { searchQuery: name } });
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
    toast.success('Removed from favorites');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background">
        <div className="flex items-center border-b px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/home')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold">Favorite Names</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {favorites.length > 0 ? (
          <div className="space-y-4">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <span className="text-md font-medium">{favorite.name}</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleCheckAvailability(favorite.name)}
                  >
                    Check
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Heart className="h-16 w-16 text-muted-foreground/50" />
            <h2 className="mt-4 text-xl font-semibold">No favorites yet</h2>
            <p className="mt-2 text-muted-foreground">
              Save team names you like to access them quickly
            </p>
            <Button
              className="mt-6"
              onClick={() => navigate('/search')}
            >
              Search for team names
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Favorites;
