import { FormEvent } from 'react';
import { toast } from 'sonner';
import { PaymentFormData, PaymentMethod, VerificationMethod } from './types';

interface UsePaymentSubmissionProps {
  formData: PaymentFormData;
  paymentMethod: PaymentMethod;
  otpValue: string;
  setErrorMessage: (message: string | null) => void;
  setShowCardDetails: (show: boolean) => void;
  setShowVerificationDialog: (show: boolean) => void;
  setShowOtpDialog: (show: boolean) => void;
  simulatePaymentProcessing: (shouldSucceed?: boolean) => void;
}

export const usePaymentSubmission = ({
  formData,
  paymentMethod,
  otpValue,
  setErrorMessage,
  setShowCardDetails,
  setShowVerificationDialog,
  setShowOtpDialog,
  simulatePaymentProcessing
}: UsePaymentSubmissionProps) => {
  const handleSubmitCardDetails = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.nameOnCard) {
      setErrorMessage('Please fill in all card details');
      return;
    }
    
    if (formData.cardNumber.length < 15 || formData.cardNumber.length > 16) {
      setErrorMessage('Please enter a valid card number');
      return;
    }
    
    if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      setErrorMessage('Please enter a valid CVV');
      return;
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(formData.expiryDate)) {
      setErrorMessage('Please enter a valid expiry date (MM/YY)');
      return;
    }

    if (!formData.phone) {
      setErrorMessage('Please enter your phone number for verification');
      return;
    }
    
    setErrorMessage(null);
    setShowCardDetails(false);
    setShowVerificationDialog(true);
  };

  const handleVerificationMethodSelect = (method: VerificationMethod) => {
    toast.info(`Verification code ${method === 'sms' ? 'sent via SMS' : 'will be sent via phone call'} to ${formData.phone}`);
    setShowVerificationDialog(false);
    setShowOtpDialog(true);
  };

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (otpValue.length < 6) {
      setErrorMessage('Please enter the complete verification code');
      return;
    }
    setErrorMessage(null);
    const shouldSucceed = Math.random() > 0.1;
    simulatePaymentProcessing(shouldSucceed);
  };

  const handleExternalPaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    // Open PayPal in a new window
    const paypalWindow = window.open('https://www.paypal.com/signin', '_blank', 'width=500,height=600');
    
    // Monitor for window close
    const checkWindow = setInterval(() => {
      if (paypalWindow?.closed) {
        clearInterval(checkWindow);
        
        // Mock successful payment after PayPal window is closed
        toast.info('Processing payment with PayPal...');
        
        setTimeout(() => {
          // Show payment confirmation toast
          toast.info('Payment confirmed! Finalizing your purchase...');
          
          setTimeout(() => {
            const shouldSucceed = Math.random() > 0.1;
            simulatePaymentProcessing(shouldSucceed);
          }, 1500);
        }, 1000);
      }
    }, 500);
  };

  const handleGooglePaySubmit = () => {
    setErrorMessage(null);
    
    // Open Google Pay in a new window
    const googlePayWindow = window.open('https://pay.google.com/gp/w/home', '_blank', 'width=500,height=600');
    
    // Monitor for window close
    const checkWindow = setInterval(() => {
      if (googlePayWindow?.closed) {
        clearInterval(checkWindow);
        
        // Mock successful payment after Google Pay window is closed
        toast.info('Processing payment with Google Pay...');
        
        setTimeout(() => {
          // Show payment confirmation toast
          toast.info('Payment confirmed! Finalizing your purchase...');
          
          setTimeout(() => {
            const shouldSucceed = Math.random() > 0.1;
            simulatePaymentProcessing(shouldSucceed);
          }, 1500);
        }, 1000);
      }
    }, 500);
  };

  return {
    handleSubmitCardDetails,
    handleVerificationMethodSelect,
    handleOtpSubmit,
    handleExternalPaymentSubmit,
    handleGooglePaySubmit
  };
};
