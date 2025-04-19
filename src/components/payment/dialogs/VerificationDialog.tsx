
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import VerificationMethodSelector from '../VerificationMethodSelector';

interface VerificationDialogProps {
  showVerificationDialog: boolean;
  setShowVerificationDialog: (show: boolean) => void;
  phoneNumber: string;
  errorMessage: string | null;
  onMethodSelect: (method: 'sms' | 'call') => void;
  onBack: () => void;
}

const VerificationDialog: React.FC<VerificationDialogProps> = ({
  showVerificationDialog,
  setShowVerificationDialog,
  phoneNumber,
  errorMessage,
  onMethodSelect,
  onBack
}) => {
  return (
    <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose Verification Method</DialogTitle>
          <DialogDescription>
            To verify your payment, choose how you'd like to receive the verification code
          </DialogDescription>
        </DialogHeader>
        <VerificationMethodSelector
          phoneNumber={phoneNumber}
          errorMessage={errorMessage}
          onMethodSelect={onMethodSelect}
          onBack={onBack}
        />
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
