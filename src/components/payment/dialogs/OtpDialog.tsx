
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import OtpVerification from '../OtpVerification';
import { PaymentStatus, VerificationMethod } from '@/hooks/payment/types';

interface OtpDialogProps {
  showOtpDialog: boolean;
  setShowOtpDialog: (show: boolean) => void;
  phoneNumber: string;
  verificationMethod: VerificationMethod;
  otpValue: string;
  setOtpValue: (value: string) => void;
  errorMessage: string | null;
  paymentStatus: PaymentStatus;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const OtpDialog: React.FC<OtpDialogProps> = ({
  showOtpDialog,
  setShowOtpDialog,
  phoneNumber,
  verificationMethod,
  otpValue,
  setOtpValue,
  errorMessage,
  paymentStatus,
  onSubmit,
  onBack
}) => {
  return (
    <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Verification Code</DialogTitle>
          <DialogDescription>
            {verificationMethod === 'sms' 
              ? `We've sent a 6-digit code to ${phoneNumber} via SMS`
              : `You'll receive a 6-digit code via phone call at ${phoneNumber}`
            }
          </DialogDescription>
        </DialogHeader>
        <OtpVerification
          phoneNumber={phoneNumber}
          verificationMethod={verificationMethod}
          otpValue={otpValue}
          setOtpValue={setOtpValue}
          errorMessage={errorMessage}
          paymentStatus={paymentStatus}
          onSubmit={onSubmit}
          onBack={onBack}
        />
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
