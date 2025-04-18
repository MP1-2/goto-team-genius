
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';

type VerificationMethod = 'sms' | 'call';

interface OtpVerificationProps {
  phoneNumber: string;
  verificationMethod: VerificationMethod;
  otpValue: string;
  setOtpValue: (value: string) => void;
  errorMessage: string | null;
  paymentStatus: 'idle' | 'processing' | 'success' | 'failed';
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  phoneNumber,
  verificationMethod,
  otpValue,
  setOtpValue,
  errorMessage,
  paymentStatus,
  onSubmit,
  onBack
}) => {
  const isDisabled = paymentStatus === 'processing' || paymentStatus === 'success';
  const isButtonDisabled = otpValue.length < 6 || isDisabled;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <ErrorAlert message={errorMessage} />
      
      <div className="flex justify-center py-4">
        <InputOTP
          maxLength={6}
          value={otpValue}
          onChange={setOtpValue}
          disabled={isDisabled}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, i) => (
                <InputOTPSlot key={i} {...slot} />
              ))}
            </InputOTPGroup>
          )}
        />
      </div>
      
      {paymentStatus === 'success' && (
        <SuccessAlert message="Your payment has been processed successfully." />
      )}
      
      <div className="flex flex-col gap-2 pt-2">
        <Button 
          type="submit" 
          disabled={isButtonDisabled}
          className="w-full"
        >
          {paymentStatus === 'processing' ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : paymentStatus === 'success' ? (
            <>
              Payment Successful
              <CheckCircle className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Verify & Pay $9.99
              <CheckCircle className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          disabled={isDisabled}
          className="w-full"
        >
          Back
        </Button>
        
        <div className="text-center pt-2">
          <Button 
            variant="link" 
            className="text-sm p-0 h-auto"
            disabled={isDisabled}
            type="button"
          >
            Didn't receive a code? Resend
          </Button>
        </div>
      </div>
    </form>
  );
};

export default OtpVerification;
