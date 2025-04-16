import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import PaymentScreen from '@/components/payment/PaymentScreen';

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
  const [showPayment, setShowPayment] = useState(false);
  const [purchasedNames] = useState(MOCK_PURCHASED_NAMES);

  const handleReserve = () => {
    if (!isSubscribed) {
      // Show payment screen
      setShowPayment(true);
      return;
    }

    // Process reservation
    setIsLoading(true);
    toast.success('Processing reservation...');
    
    setTimeout(() => {
      setIsReserved(true);
      setIsLoading(false);
    }, 1500);
  };

  const handlePaymentSuccess = () => {
    toast.success('Payment successful!');
    setShowPayment(false);
    setIsLoading(true);
    
    // Process reservation after successful payment
    setTimeout(() => {
      setIsReserved(true);
      setIsLoading(false);
    }, 1500);
  };

  const handlePaymentCancel = () => {
    toast.error('Payment cancelled');
    setShowPayment(false);
  };

  const handleCreateLogo = () => {
    navigate('/logo', { state: { teamName } });
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background">
        <div className="flex items-center border-b px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold">{teamName} Reservation</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        {showPayment ? (
          <PaymentScreen 
            teamName={teamName}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        ) : !isReserved ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 pt-8 text-center animate-fade-in">
            <div className="rounded-full bg-secondary/20 p-6">
              <CheckCircle className="h-12 w-12 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold">Reservation Complete!</h2>
            <p className="text-muted-foreground">
              You've successfully reserved the team name:
            </p>
            <div className="my-4 rounded-lg border bg-card p-4 text-xl font-semibold">
              {teamName}
            </div>
            <p className="text-sm text-muted-foreground">
              Your reservation is valid for 12 months and can be renewed.
            </p>
            <div className="mt-6 space-y-3">
              <Button
                className="w-full"
                onClick={() => navigate('/home')}
              >
                Return to Home
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCreateLogo}
              >
                Create Logo for this Name
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservation;
