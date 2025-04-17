
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const MOCK_PURCHASED_NAMES = [
  { id: '1', name: 'Thunder Dragons', purchasedAt: '2025-03-15' },
  { id: '2', name: 'Lightning Eagles', purchasedAt: '2025-03-28' },
  { id: '3', name: 'Golden Knights', purchasedAt: '2025-04-05' },
];

const Reservation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const teamName = location.state?.teamName || 'Team Name';
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [purchasedNames] = useState(MOCK_PURCHASED_NAMES);

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('userInfo');
    
    if (!userInfo) {
      toast.error('Please log in to reserve a name');
      // Save team name in session storage so we can redirect back after login
      sessionStorage.setItem('pendingReservation', teamName);
      navigate('/login');
    }
  }, [navigate, teamName]);

  const handleReserve = () => {
    if (!isSubscribed) {
      navigate('/payment', { state: { teamName, returnPath: '/reservation-success' } });
      return;
    }

    setIsLoading(true);
    toast.success('Processing reservation...');
    
    setTimeout(() => {
      setIsReserved(true);
      setIsLoading(false);
      
      navigate('/reservation-success', { state: { teamName } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="sticky top-0 z-10 bg-background">
        <div className="flex items-center border-b px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/search')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold">{teamName} Reservation</h1>
        </div>
      </div>

      <div className="px-6 pt-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">{teamName}</CardTitle>
            <CardDescription>
              Secure exclusive rights to this team name
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 font-medium">Reservation Benefits</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
                  Exclusive team name rights across all platforms
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
                  Authenticity verification checkmark
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
                  12-month reservation period
                </li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">Subscription Status</h3>
              {isSubscribed ? (
                <div className="flex items-center text-sm text-secondary">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Active Subscription
                </div>
              ) : (
                <div className="flex items-center text-sm text-destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Subscription Required
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleReserve}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : isSubscribed ? (
                'Reserve Now'
              ) : (
                'Continue to Payment'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Reservation;
