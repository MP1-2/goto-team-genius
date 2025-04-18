
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
    
    if (!formData.email) {
      setErrorMessage('Please enter your email address');
      return;
    }
    
    if (paymentMethod === 'paypal' && !formData.accountId) {
      setErrorMessage('Please enter your PayPal email or phone');
      return;
    }
    
    setErrorMessage(null);
    toast.info('Redirecting to PayPal login page...');
    
    setTimeout(() => {
      toast.info('Processing payment with PayPal...');
      const shouldSucceed = Math.random() > 0.1;
      simulatePaymentProcessing(shouldSucceed);
    }, 1500);
  };

  const handleGooglePaySubmit = () => {
    setErrorMessage(null);
    const shouldSucceed = Math.random() > 0.1;
    simulatePaymentProcessing(shouldSucceed);
  };

  return {
    handleSubmitCardDetails,
    handleVerificationMethodSelect,
    handleOtpSubmit,
    handleExternalPaymentSubmit,
    handleGooglePaySubmit
  };
};
