
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import confetti from 'canvas-confetti';

const SubscriptionExtendedSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const teamName = location.state?.teamName || 'Team Name';
  const expiryDate = location.state?.expiryDate || '2026-04-15';

  // Trigger confetti animation on component mount
  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleGoToProfile = () => {
    navigate('/profile', { state: { tab: 'subscriptions' } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Subscription Extended!</CardTitle>
          <CardDescription>
            Your team name reservation has been successfully extended
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="my-4 rounded-lg border bg-card p-4">
            <h3 className="text-xl font-semibold text-primary">{teamName}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Valid until: {new Date(expiryDate).toLocaleDateString()}
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Your reservation has been extended for an additional 12 months.
          </p>
        </CardContent>
        <CardFooter className="flex-col space-y-3">
          <Button 
            variant="outline"
            className="w-full" 
            onClick={handleGoToProfile}
          >
            <User className="mr-1 h-4 w-4" />
            Return to Profile
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGoHome}
          >
            <Home className="mr-1 h-4 w-4" />
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionExtendedSuccess;
