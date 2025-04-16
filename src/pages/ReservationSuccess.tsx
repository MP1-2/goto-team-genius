
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, Home, Image } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import confetti from 'canvas-confetti';

const ReservationSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const teamName = location.state?.teamName || 'Team Name';

  // Trigger confetti animation on component mount
  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const handleCreateLogo = () => {
    navigate('/logo', { state: { teamName } });
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Reservation Successful!</CardTitle>
          <CardDescription>
            Your team name has been successfully reserved
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="my-4 rounded-lg border bg-card p-4">
            <h3 className="text-xl font-semibold text-primary">{teamName}</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Your reservation is valid for 12 months and can be renewed from your profile.
          </p>
        </CardContent>
        <CardFooter className="flex-col space-y-3">
          <Button 
            className="w-full" 
            onClick={handleCreateLogo}
          >
            Create Logo for this Name
            <ChevronRight className="ml-1 h-4 w-4" />
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

export default ReservationSuccess;
