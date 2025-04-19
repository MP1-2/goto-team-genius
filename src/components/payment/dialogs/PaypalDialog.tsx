
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PaypalForm from '../PaypalForm';
import { PaymentMethod, PaymentStatus } from '@/hooks/payment/types';

interface PaypalDialogProps {
  showExternalPayment: boolean;
  setShowExternalPayment: (show: boolean) => void;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  errorMessage: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  getPaymentMethodName: (method: PaymentMethod) => string;
}

const PaypalDialog: React.FC<PaypalDialogProps> = ({
  showExternalPayment,
  setShowExternalPayment,
  paymentMethod,
  paymentStatus,
  errorMessage,
  onSubmit,
  onCancel,
  getPaymentMethodName
}) => {
  return (
    <Dialog open={showExternalPayment} onOpenChange={setShowExternalPayment}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getPaymentMethodName(paymentMethod)} Payment</DialogTitle>
          <DialogDescription>
            Complete your {getPaymentMethodName(paymentMethod)} payment
          </DialogDescription>
        </DialogHeader>
        <PaypalForm
          errorMessage={errorMessage}
          paymentStatus={paymentStatus}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PaypalDialog;
