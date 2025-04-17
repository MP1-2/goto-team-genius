import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import LogoNameInput from '@/components/logo/LogoNameInput';
import LogoStyleSelector from '@/components/logo/LogoStyleSelector';
import LogoColorPicker from '@/components/logo/LogoColorPicker';
import LogoPreview from '@/components/logo/LogoPreview';
import PurchasedNameSelector from '@/components/logo/PurchasedNameSelector';

export type LogoStyle = 'Modern' | 'Vintage' | 'Cartoon';
export type LogoColor = 'blue' | 'red' | 'green' | 'purple' | 'orange' | 'black';

// Mock data - in a real app this would come from an API
const MOCK_PURCHASED_NAMES = [
  { id: '1', name: 'Thunder Dragons', purchasedAt: '2025-03-15' },
  { id: '2', name: 'Lightning Eagles', purchasedAt: '2025-03-28' },
  { id: '3', name: 'Golden Knights', purchasedAt: '2025-04-05' },
];

const LogoCreation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedNameId, setSelectedNameId] = useState<string>('');
  const [name, setName] = useState('');
  const [style, setStyle] = useState<LogoStyle>('Modern');
  const [color, setColor] = useState<LogoColor>('blue');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logoGenerated, setLogoGenerated] = useState(false);
  const [purchasedNames, setPurchasedNames] = useState(MOCK_PURCHASED_NAMES);
  
  useEffect(() => {
    // Set initial name from location state or first purchased name
    if (location.state?.teamName) {
      setName(location.state.teamName);
      // Find the ID for this name if it exists
      const nameObj = purchasedNames.find(n => n.name === location.state.teamName);
      if (nameObj) setSelectedNameId(nameObj.id);
    } else if (purchasedNames.length > 0) {
      setSelectedNameId(purchasedNames[0].id);
      setName(purchasedNames[0].name);
    }
  }, [location.state?.teamName, purchasedNames]);

  const handleSelectPurchasedName = (id: string) => {
    const selectedName = purchasedNames.find(n => n.id === id);
    if (selectedName) {
      setSelectedNameId(id);
      setName(selectedName.name);
    }
  };
  
  const handleGenerateLogo = () => {
    if (!name.trim()) {
      toast.error('Please enter a name for your logo');
      return;
    }
    
    setIsGenerating(true);
    setLogoGenerated(false);
    toast.info('Generating your logo...', {
      description: 'This may take a few seconds'
    });
    
    // Simulate logo generation
    setTimeout(() => {
      setIsGenerating(false);
      setLogoGenerated(true);
      toast.success('Logo generated successfully!', {
        description: 'Your logo is ready to download'
      });
    }, 2500);
  };
  
  const handleDownload = () => {
    // In a real implementation, this would create and download an image file
    toast.success('Logo downloaded successfully!', {
      description: 'Your logo has been saved to your device'
    });
  };

  const handleRegenerate = () => {
    handleGenerateLogo();
  };

  // Check if there are no purchased names
  if (purchasedNames.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-6">
        <div className="sticky top-0 z-10 bg-background">
          <div className="flex items-center border-b px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="ml-2 text-lg font-semibold">Logo Creation</h1>
          </div>
        </div>
        
        <div className="px-6 py-16 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Reserved Team Names</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              You need to reserve a team name before creating a logo. 
              Go to the search page to find and reserve a name first.
            </p>
          </div>
          <Button 
            onClick={() => navigate('/search')}
            className="mt-4"
          >
            Find and Reserve a Name
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background">
        <div className="flex items-center border-b px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/portal')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold">Logo Creation</h1>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <PurchasedNameSelector 
                purchasedNames={purchasedNames} 
                selectedNameId={selectedNameId}
                onSelect={handleSelectPurchasedName}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LogoStyleSelector 
                  selectedStyle={style} 
                  onSelectStyle={setStyle} 
                />
                
                <LogoColorPicker 
                  selectedColor={color}
                  onSelectColor={setColor}
                />
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleGenerateLogo}
                  disabled={isGenerating || !name.trim()}
                  className="w-full md:w-auto"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : logoGenerated ? (
                    'Generate New Logo'
                  ) : (
                    'Generate Logo'
                  )}
                </Button>
              </div>
              
              <LogoPreview 
                teamName={name}
                color={color}
                style={style}
                isLoading={isGenerating}
                isGenerated={logoGenerated}
              />
              
              {logoGenerated && (
                <div className="flex flex-col md:flex-row justify-center gap-3 mt-4">
                  <Button 
                    onClick={handleRegenerate}
                    variant="outline"
                    className="w-full md:w-auto"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                  
                  <Button 
                    onClick={handleDownload}
                    className="w-full md:w-auto"
                    variant="secondary"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Logo
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogoCreation;
