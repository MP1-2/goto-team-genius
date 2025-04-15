
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NameSuggestionCard from '@/components/suggestions/NameSuggestionCard';
import { toast } from 'sonner';

const AISuggestions: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{
    id: string;
    name: string;
    checked: boolean;
    favorite: boolean;
    platforms?: { name: string; available: boolean }[];
  }>>([]);

  // Get user preferences from localStorage
  const [userPreferences, setUserPreferences] = useState<any>(null);

  useEffect(() => {
    const storedPreferences = localStorage.getItem('userPreferences');
    if (storedPreferences) {
      setUserPreferences(JSON.parse(storedPreferences));
    }
    
    // Generate initial suggestions based on preferences
    generateSuggestions();
  }, []);

  const generateSuggestions = () => {
    setIsLoading(true);
    
    // Mock API call for generating suggestions
    setTimeout(() => {
      // Create some example suggestions
      const mockSuggestions = [
        { id: '1', name: 'Touchdown Titans', checked: false, favorite: false },
        { id: '2', name: 'Field Goal Phenoms', checked: false, favorite: false },
        { id: '3', name: 'Hail Mary Heroes', checked: false, favorite: false },
        { id: '4', name: 'Blitz Brigade', checked: false, favorite: false },
        { id: '5', name: 'Gridiron Gladiators', checked: false, favorite: false },
        { id: '6', name: 'Fantasy Fieldmasters', checked: false, favorite: false },
      ];
      
      setSuggestions(mockSuggestions);
      setIsLoading(false);
    }, 1500);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt for suggestions');
      return;
    }
    
    setIsLoading(true);
    toast.success('Generating new suggestions...');
    
    // Mock API call for custom prompt
    setTimeout(() => {
      // Create custom suggestions based on prompt
      const customSuggestions = [
        { id: '7', name: `${prompt} Warriors`, checked: false, favorite: false },
        { id: '8', name: `${prompt} Champions`, checked: false, favorite: false },
        { id: '9', name: `Mighty ${prompt}`, checked: false, favorite: false },
        { id: '10', name: `${prompt} Squad`, checked: false, favorite: false },
      ];
      
      setSuggestions([...customSuggestions, ...suggestions].slice(0, 8));
      setIsLoading(false);
    }, 1500);
  };

  const checkAvailability = (id: string) => {
    // Update the specific suggestion to show it's being checked
    setSuggestions(suggestions.map(s => 
      s.id === id ? { ...s, checking: true } : s
    ));
    
    // Simulate availability check
    setTimeout(() => {
      setSuggestions(suggestions.map(s => {
        if (s.id === id) {
          return {
            ...s,
            checked: true,
            checking: false,
            platforms: [
              { name: 'ESPN', available: Math.random() > 0.3 },
              { name: 'Yahoo', available: Math.random() > 0.3 },
              { name: 'Sleeper', available: Math.random() > 0.3 },
              { name: 'NFL', available: Math.random() > 0.3 },
            ]
          };
        }
        return s;
      }));
    }, 1000);
  };

  const toggleFavorite = (id: string) => {
    setSuggestions(suggestions.map(s => 
      s.id === id ? { ...s, favorite: !s.favorite } : s
    ));
  };

  const handleReserve = (name: string) => {
    toast.success(`Redirecting to reserve "${name}"`);
    navigate('/reservation', { state: { teamName: name } });
  };

  return (
    <div className="min-h-screen bg-background pb-6">
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
          <h1 className="ml-2 text-lg font-semibold">AI Name Suggestions</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        {/* Personalized Suggestions */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Suggestions for You</h2>
            <Button
              variant="outline"
              size="sm"
              disabled={isLoading}
              onClick={generateSuggestions}
            >
              <RefreshCw className={`mr-1 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {userPreferences && (
            <div className="mb-3 text-sm text-muted-foreground">
              Based on your interests in {userPreferences.sports.join(', ')} and {userPreferences.keywordTypes.join(', ')} themes.
            </div>
          )}

          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {suggestions.map((suggestion) => (
                <NameSuggestionCard
                  key={suggestion.id}
                  name={suggestion.name}
                  platforms={suggestion.platforms}
                  checked={suggestion.checked}
                  favorite={suggestion.favorite}
                  onCheckAvailability={() => checkAvailability(suggestion.id)}
                  onReserve={() => handleReserve(suggestion.name)}
                  onToggleFavorite={() => toggleFavorite(suggestion.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Custom Prompt Section */}
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">Generate Custom Suggestions</h2>
          <div className="rounded-lg border bg-card p-4">
            <label className="mb-2 block text-sm font-medium">
              Enter a custom prompt
            </label>
            <div className="mb-4 flex gap-2">
              <Input
                placeholder="e.g., dragons, space, ninjas..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button onClick={handleGenerate} disabled={isLoading}>
                Generate
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AISuggestions;
