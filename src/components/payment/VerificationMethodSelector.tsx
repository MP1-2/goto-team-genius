
import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, Phone } from 'lucide-react';
import ErrorAlert from './ErrorAlert';

type VerificationMethod = 'sms' | 'call';

interface VerificationMethodSelectorProps {
  phoneNumber: string;
  errorMessage: string | null;
  onMethodSelect: (method: VerificationMethod) => void;
  onBack: () => void;
}

const VerificationMethodSelector: React.FC<VerificationMethodSelectorProps> = ({
  phoneNumber,
  errorMessage,
  onMethodSelect,
  onBack
}) => {
  return (
    <div className="space-y-4">
      <ErrorAlert message={errorMessage} />
      
      <div className="grid grid-cols-1 gap-4">
        <Button 
          onClick={() => onMethodSelect('sms')}
          className="flex justify-start items-center h-auto py-3 px-4"
          variant="outline"
        >
          <Smartphone className="h-5 w-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">Receive SMS</div>
            <div className="text-sm text-muted-foreground">
              We'll send a code to {phoneNumber || "+1 (***) ***-**67"}
            </div>
          </div>
        </Button>
        
        <Button 
          onClick={() => onMethodSelect('call')}
          className="flex justify-start items-center h-auto py-3 px-4"
          variant="outline"
        >
          <Phone className="h-5 w-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">Receive Phone Call</div>
            <div className="text-sm text-muted-foreground">
              We'll call you with a code at {phoneNumber || "+1 (***) ***-**67"}
            </div>
          </div>
        </Button>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full mt-4" 
        onClick={onBack}
      >
        Back
      </Button>
    </div>
  );
};

export default VerificationMethodSelector;
