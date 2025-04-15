
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Basketball, Football, Baseball, UserPlus } from 'lucide-react';
import StepIndicator from '@/components/onboarding/StepIndicator';
import PreferenceOption from '@/components/onboarding/PreferenceOption';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    sports: [] as string[],
    teams: [] as string[],
    keywordTypes: [] as string[],
    keywords: '',
  });

  const totalSteps = 3;

  const sports = [
    { id: 'football', label: 'Football', icon: <Football className="h-6 w-6" /> },
    { id: 'basketball', label: 'Basketball', icon: <Basketball className="h-6 w-6" /> },
    { id: 'baseball', label: 'Baseball', icon: <Baseball className="h-6 w-6" /> },
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

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save preferences and navigate to home
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
      navigate('/home');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">Select your favorite sports</h2>
            <p className="text-muted-foreground">
              This helps us generate better team name suggestions for you.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {sports.map((sport) => (
                <PreferenceOption
                  key={sport.id}
                  label={sport.label}
                  icon={sport.icon}
                  selected={preferences.sports.includes(sport.id)}
                  onClick={() => {
                    setPreferences({
                      ...preferences,
                      sports: toggleItem(preferences.sports, sport.id),
                    });
                  }}
                />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">Select your favorite teams</h2>
            <p className="text-muted-foreground">
              This helps us personalize your experience.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {teams.map((team) => (
                <PreferenceOption
                  key={team.id}
                  label={team.label}
                  selected={preferences.teams.includes(team.id)}
                  onClick={() => {
                    setPreferences({
                      ...preferences,
                      teams: toggleItem(preferences.teams, team.id),
                    });
                  }}
                />
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">What's your style?</h2>
            <p className="text-muted-foreground">
              Select the types of team names you like.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {keywordTypes.map((type) => (
                <PreferenceOption
                  key={type.id}
                  label={type.label}
                  selected={preferences.keywordTypes.includes(type.id)}
                  onClick={() => {
                    setPreferences({
                      ...preferences,
                      keywordTypes: toggleItem(preferences.keywordTypes, type.id),
                    });
                  }}
                />
              ))}
            </div>
            <div className="pt-2">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Additional keywords (optional)
              </label>
              <Input
                placeholder="e.g., superhero, animals, mythology"
                value={preferences.keywords}
                onChange={(e) => {
                  setPreferences({
                    ...preferences,
                    keywords: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 p-6">
        <div className="mx-auto max-w-md space-y-6">
          <StepIndicator totalSteps={totalSteps} currentStep={step} />
          
          {renderStepContent()}
          
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => (step > 1 ? setStep(step - 1) : navigate('/'))}
            >
              {step > 1 ? 'Back' : 'Skip'}
            </Button>
            <Button onClick={handleNext}>
              {step < totalSteps ? 'Next' : 'Finish'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
