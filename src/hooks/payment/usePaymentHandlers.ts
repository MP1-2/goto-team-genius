
import { ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner';
import { PaymentMethod, PaymentStatus, VerificationMethod } from './types';

interface UsePaymentHandlersProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPaymentStatus: (status: PaymentStatus) => void;
  setShowCardDetails: (show: boolean) => void;
  setShowExternalPayment: (show: boolean) => void;
  setShowVerificationDialog: (show: boolean) => void;
  setShowOtpDialog: (show: boolean) => void;
  setShowGooglePayDialog: (show: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  onSuccess: () => void;
}

export const usePaymentHandlers = ({
  paymentMethod,
  setPaymentMethod,
  setPaymentStatus,
  setShowCardDetails,
  setShowExternalPayment,
  setShowVerificationDialog,
  setShowOtpDialog,
  setShowGooglePayDialog,
  setErrorMessage,
  onSuccess
}: UsePaymentHandlersProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const clearError = () => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
    setErrorMessage(null);
  };

  const handleProceed = () => {
    if (paymentMethod === 'credit_card') {
      setShowCardDetails(true);
    } else if (paymentMethod === 'google_pay') {
      setShowGooglePayDialog(true);
    } else {
      setShowExternalPayment(true);
    }
  };

  const simulatePaymentProcessing = (shouldSucceed: boolean = true) => {
    setPaymentStatus('processing');
    setErrorMessage(null);
    
    setTimeout(() => {
      if (shouldSucceed) {
        setPaymentStatus('success');
        
        setTimeout(() => {
          setShowCardDetails(false);
          setShowExternalPayment(false);
          setShowVerificationDialog(false);
          setShowOtpDialog(false);
          setShowGooglePayDialog(false);
          onSuccess();
          toast.success('Payment successful!');
        }, 1500);
      } else {
        setPaymentStatus('failed');
        setErrorMessage(getErrorMessageForMethod(paymentMethod));
      }
    }, 2000);
  };

  return {
    handleInputChange,
    clearError,
    handlePaymentMethodChange,
    handleProceed,
    simulatePaymentProcessing
  };
};
