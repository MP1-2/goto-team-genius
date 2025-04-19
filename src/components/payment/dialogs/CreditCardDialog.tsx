
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreditCardForm from '../CreditCardForm';
import { PaymentStatus } from '@/hooks/payment/types';

interface CreditCardDialogProps {
  showCardDetails: boolean;
  setShowCardDetails: (show: boolean) => void;
  formData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
    phone: string;
  };
  errorMessage: string | null;
  paymentStatus: PaymentStatus;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitCardDetails: (e: React.FormEvent) => void;
  onCancelCardDetails: () => void;
  clearError: () => void;
}

const CreditCardDialog: React.FC<CreditCardDialogProps> = ({
  showCardDetails,
  setShowCardDetails,
  formData,
  errorMessage,
  paymentStatus,
  onInputChange,
  onSubmitCardDetails,
  onCancelCardDetails,
  clearError
}) => {
  return (
    <Dialog open={showCardDetails} onOpenChange={setShowCardDetails}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Card Details</DialogTitle>
          <DialogDescription>
            Your payment information is secure and encrypted
          </DialogDescription>
        </DialogHeader>
        <CreditCardForm
          formData={formData}
          errorMessage={errorMessage}
          isProcessing={paymentStatus === 'processing'}
          onInputChange={onInputChange}
          onSubmit={onSubmitCardDetails}
          onCancel={onCancelCardDetails}
          clearError={clearError}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreditCardDialog;
