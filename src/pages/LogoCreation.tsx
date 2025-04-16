
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import LogoNameInput from '@/components/logo/LogoNameInput';
import LogoStyleSelector from '@/components/logo/LogoStyleSelector';
import LogoColorPicker from '@/components/logo/LogoColorPicker';
import LogoPreview from '@/components/logo/LogoPreview';

export type LogoStyle = 'Modern' | 'Vintage' | 'Cartoon';
export type LogoColor = 'blue' | 'red' | 'green' | 'purple' | 'orange' | 'black';

const LogoCreation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState(location.state?.teamName || '');
  const [style, setStyle] = useState<LogoStyle>('Modern');
  const [color, setColor] = useState<LogoColor>('blue');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logoGenerated, setLogoGenerated] = useState(false);
  
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
          <h1 className="ml-2 text-lg font-semibold">Logo Creation</h1>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <LogoNameInput 
                name={name} 
                setName={setName}
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
