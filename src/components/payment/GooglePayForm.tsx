
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';

interface GoogleAccount {
  email: string;
  name: string;
  cards: Array<{
    type: string;
    lastFour: string;
  }>;
}

interface GooglePayFormProps {
  googleAccounts: GoogleAccount[];
  selectedGoogleAccount: number;
  selectedCard: number;
  errorMessage: string | null;
  paymentStatus: 'idle' | 'processing' | 'success' | 'failed';
  setSelectedGoogleAccount: (index: number) => void;
  setSelectedCard: (index: number) => void;
  onSubmit: () => void;
}

const GooglePayForm: React.FC<GooglePayFormProps> = ({
  googleAccounts,
  selectedGoogleAccount,
  selectedCard,
  errorMessage,
  paymentStatus,
  setSelectedGoogleAccount,
  setSelectedCard,
  onSubmit
}) => {
  return (
    <div className="space-y-4">
      <ErrorAlert message={errorMessage} />
      
      <div className="border-t border-b py-4">
        <Popover>
          <PopoverTrigger asChild>
            <div className="cursor-pointer mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <p className="font-medium">{googleAccounts[selectedGoogleAccount].name}</p>
                    <p className="text-sm text-muted-foreground">{googleAccounts[selectedGoogleAccount].email}</p>
                  </div>
                </div>
                <div>
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <div className="p-2">
              {googleAccounts.map((account, index) => (
                <div 
                  key={index}
                  className={`p-2 rounded hover:bg-muted cursor-pointer ${index === selectedGoogleAccount ? 'bg-muted' : ''}`}
                  onClick={() => {
                    setSelectedGoogleAccount(index);
                    setSelectedCard(0); // Reset selected card when changing account
                  }}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-muted-foreground">{account.email}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-2 rounded hover:bg-muted cursor-pointer border-t mt-2 pt-3">
                <p className="text-primary font-medium">Add another account</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <div className="cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-orange-100 rounded-md mr-3 flex items-center justify-center">
                    <span className="text-lg">💳</span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {googleAccounts[selectedGoogleAccount].cards[selectedCard].type} •••• 
                      {googleAccounts[selectedGoogleAccount].cards[selectedCard].lastFour}
                    </p>
                  </div>
                </div>
                <div>
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <div className="p-2">
              {googleAccounts[selectedGoogleAccount].cards.map((card, index) => (
                <div 
                  key={index}
                  className={`p-2 rounded hover:bg-muted cursor-pointer ${index === selectedCard ? 'bg-muted' : ''}`}
                  onClick={() => setSelectedCard(index)}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-orange-100 rounded-md mr-3 flex items-center justify-center">
                      <span className="text-lg">💳</span>
                    </div>
                    <div>
                      <p className="font-medium">{card.type} •••• {card.lastFour}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-2 rounded hover:bg-muted cursor-pointer border-t mt-2 pt-3">
                <p className="text-primary font-medium">Add payment method</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <p className="text-sm text-muted-foreground text-center">
        Your billing details will also be shared with the merchant
      </p>
      
      {paymentStatus === 'success' && (
        <SuccessAlert message="Your Google Pay payment has been processed successfully." />
      )}
      
      <div className="flex justify-center pt-2">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 w-48"
          onClick={onSubmit}
          disabled={paymentStatus === 'processing' || paymentStatus === 'success'}
        >
          {paymentStatus === 'processing' ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : paymentStatus === 'success' ? (
            <>
              Payment Complete
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            'CONTINUE'
          )}
        </Button>
      </div>
    </div>
  );
};

export default GooglePayForm;
