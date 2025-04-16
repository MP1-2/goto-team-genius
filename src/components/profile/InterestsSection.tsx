
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PreferenceOption from '@/components/onboarding/PreferenceOption';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InterestsSectionProps {
  interests: {
    sports: string[];
    teams: string[];
    keywordTypes: string[];
    keywords: string;
  };
  onInterestChange: (newInterests: any) => void;
  isEditing: boolean;
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ 
  interests, 
  onInterestChange,
  isEditing
}) => {
  const sports = [
    { id: 'football', label: 'Football', icon: <div className="h-6 w-6">🏈</div> },
    { id: 'basketball', label: 'Basketball', icon: <div className="h-6 w-6">🏀</div> },
    { id: 'baseball', label: 'Baseball', icon: <div className="h-6 w-6">⚾</div> },
  ];

  const teams = [
    { id: 'chiefs', label: 'Kansas City Chiefs' },
    { id: 'eagles', label: 'Philadelphia Eagles' },
    { id: 'ravens', label: 'Baltimore Ravens' },
    { id: 'niners', label: '49ers' },
    { id: 'lions', label: 'Detroit Lions' },
    { id: 'cowboys', label: 'Dallas Cowboys' },
  ];

  const keywordTypes = [
    { id: 'funny', label: 'Funny' },
    { id: 'clever', label: 'Clever' },
    { id: 'aggressive', label: 'Aggressive' },
    { id: 'classic', label: 'Classic' },
    { id: 'punny', label: 'Punny' },
    { id: 'pop-culture', label: 'Pop Culture' },
  ];

  const toggleItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Interests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Favorite Sports</Label>
          <div className="grid grid-cols-3 gap-3">
            {sports.map((sport) => (
              <PreferenceOption
                key={sport.id}
                label={sport.label}
                icon={sport.icon}
                selected={interests.sports.includes(sport.id)}
                onClick={() => {
                  if (isEditing) {
                    onInterestChange({
                      ...interests,
                      sports: toggleItem(interests.sports, sport.id),
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Favorite Teams</Label>
          <div className="grid grid-cols-2 gap-3">
            {teams.map((team) => (
              <PreferenceOption
                key={team.id}
                label={team.label}
                selected={interests.teams.includes(team.id)}
                onClick={() => {
                  if (isEditing) {
                    onInterestChange({
                      ...interests,
                      teams: toggleItem(interests.teams, team.id),
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Name Style Preferences</Label>
          <div className="grid grid-cols-2 gap-3">
            {keywordTypes.map((type) => (
              <PreferenceOption
                key={type.id}
                label={type.label}
                selected={interests.keywordTypes.includes(type.id)}
                onClick={() => {
                  if (isEditing) {
                    onInterestChange({
                      ...interests,
                      keywordTypes: toggleItem(interests.keywordTypes, type.id),
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Additional Keywords</Label>
          {isEditing ? (
            <Input
              id="keywords"
              value={interests.keywords}
              onChange={(e) => {
                onInterestChange({
                  ...interests,
                  keywords: e.target.value,
                });
              }}
              placeholder="e.g., superhero, animals, mythology"
            />
          ) : (
            <div className="rounded-md border px-3 py-2">
              {interests.keywords || "No additional keywords"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestsSection;
