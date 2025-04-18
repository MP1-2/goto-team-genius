
import { ChangeEvent } from 'react';
import { toast } from 'sonner';
import { PaymentMethod, PaymentStatus, PaymentFormData } from './types';

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
  setFormData: (fn: (prev: PaymentFormData) => PaymentFormData) => void;
  formData: PaymentFormData;
  errorMessage: string | null;
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
  setFormData,
  errorMessage,
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

  const cancelCardDetails = () => {
    setShowCardDetails(false);
    setErrorMessage(null);
  };

  const cancelExternalPayment = () => {
    setShowExternalPayment(false);
    setErrorMessage(null);
  };

  const handleBackToVerification = () => {
    setShowOtpDialog(false);
    setShowVerificationDialog(true);
  };

  const handleBackToCardDetails = () => {
    setShowVerificationDialog(false);
    setShowCardDetails(true);
  };

  const getErrorMessageForMethod = (method: PaymentMethod): string => {
    switch (method) {
      case 'credit_card':
        return 'Card payment failed. Please check your card details and try again.';
      case 'paypal':
        return 'PayPal payment failed. Please try again or use a different payment method.';
      case 'google_pay':
        return 'Google Pay payment failed. Please try again or use a different payment method.';
      default:
        return 'Payment failed. Please try again.';
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
    cancelCardDetails,
    cancelExternalPayment,
    handleBackToVerification,
    handleBackToCardDetails,
    simulatePaymentProcessing
  };
};
