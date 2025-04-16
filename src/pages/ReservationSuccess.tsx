
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, Home, Image, Copy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

const ReservationSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const teamName = location.state?.teamName || 'Team Name';
  const [openDialog, setOpenDialog] = useState(false);

  // Generate a unique code for the team name (in a real app, this would come from the backend)
  const generateUniqueCode = (name: string) => {
    // For demo purposes, generate a random code with teamName and timestamp
    const timestamp = Date.now().toString(36);
    const randomChars = Math.random().toString(36).substring(2, 8);
    return `${name.replace(/\s+/g, '')}${timestamp}${randomChars}`.toUpperCase();
  };

  const uniqueCode = React.useMemo(() => generateUniqueCode(teamName), [teamName]);
  
  // Mock platforms for demonstration
  const platforms = ['ESPN', 'Yahoo', 'Sleeper', 'NFL'];

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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');

    // Store the code in localStorage with the team name
    try {
      const storedCodes = JSON.parse(localStorage.getItem('teamCodes') || '{}');
      storedCodes[teamName] = {
        code,
        platforms,
        isUsed: false,
        reservedAt: new Date().toISOString()
      };
      localStorage.setItem('teamCodes', JSON.stringify(storedCodes));
    } catch (error) {
      console.error('Error saving team code:', error);
    }
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
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="w-full">
                Apply Name in your Fantasy Platform
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply "{teamName}" to Fantasy Platform</DialogTitle>
                <DialogDescription>
                  Copy the unique code below to apply this name to your fantasy platform.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <h4 className="mb-2 font-medium">Available Platforms:</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {platforms.map(platform => (
                    <div key={platform} className="text-sm px-3 py-1 rounded-md bg-secondary/50">
                      {platform}
                    </div>
                  ))}
                </div>
                
                <h4 className="mb-2 font-medium">Your Unique Code:</h4>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="font-mono text-sm">
                    {uniqueCode.substring(0, 2)}•••••••••••••
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCopyCode(uniqueCode)}
                    className="gap-1.5"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This code can only be used once. You can manage your codes in your profile.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          
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
