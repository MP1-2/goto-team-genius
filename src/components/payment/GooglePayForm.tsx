
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';

interface GooglePayFormProps {
  errorMessage: string | null;
  paymentStatus: 'idle' | 'processing' | 'success' | 'failed';
  onSubmit: () => void;
}

const GooglePayForm: React.FC<GooglePayFormProps> = ({
  errorMessage,
  paymentStatus,
  onSubmit
}) => {
  return (
    <div className="space-y-4">
      <ErrorAlert message={errorMessage} />
      
      <div className="text-center">
        <img 
          src="https://www.gstatic.com/instantbuy/svg/dark_gpay.svg"
          alt="Google Pay"
          className="h-12 mx-auto mb-4"
        />
        <p className="text-sm text-muted-foreground mb-6">
          You will be redirected to Google Pay's secure payment page
        </p>
      </div>
      
      {paymentStatus === 'success' && (
        <SuccessAlert message="Your Google Pay payment has been processed successfully." paymentMethod="Google Pay" />
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
