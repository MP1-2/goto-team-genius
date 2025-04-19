
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import GooglePayForm from '../GooglePayForm';
import { PaymentStatus } from '@/hooks/payment/types';

interface GooglePayDialogProps {
  showGooglePayDialog: boolean;
  setShowGooglePayDialog: (show: boolean) => void;
  errorMessage: string | null;
  paymentStatus: PaymentStatus;
  onSubmit: () => void;
}

const GooglePayDialog: React.FC<GooglePayDialogProps> = ({
  showGooglePayDialog,
  setShowGooglePayDialog,
  errorMessage,
  paymentStatus,
  onSubmit
}) => {
  return (
    <Dialog open={showGooglePayDialog} onOpenChange={setShowGooglePayDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment with Google Pay</DialogTitle>
          <DialogDescription>
            Choose your account and payment method to complete the purchase
          </DialogDescription>
        </DialogHeader>
        <GooglePayForm
          errorMessage={errorMessage}
          paymentStatus={paymentStatus}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default GooglePayDialog;
