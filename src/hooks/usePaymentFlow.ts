
import { useState } from 'react';
import { toast } from 'sonner';

export type PaymentMethod = 'credit_card' | 'paypal' | 'google_pay';
export type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';
export type VerificationMethod = 'sms' | 'call';

interface UsePaymentFlowProps {
  onSuccess: () => void;
}

export const usePaymentFlow = ({ onSuccess }: UsePaymentFlowProps) => {
  // State management
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showExternalPayment, setShowExternalPayment] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [showGooglePayDialog, setShowGooglePayDialog] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>('sms');
  const [otpValue, setOtpValue] = useState('');
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState(0);
  const [selectedCard, setSelectedCard] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    email: '',
    phone: '',
    accountId: '' // For PayPal
  });

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Clear error function to be passed to forms
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
      // For PayPal
      setShowExternalPayment(true);
    }
  };

  const simulatePaymentProcessing = (shouldSucceed: boolean = true) => {
    setPaymentStatus('processing');
    setErrorMessage(null);
    
    // Simulate payment processing
    setTimeout(() => {
      if (shouldSucceed) {
        setPaymentStatus('success');
        
        // Simulate redirect back from external provider or process completion
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

  const getErrorMessageForMethod = (method: PaymentMethod): string => {
    switch (method) {
      case 'credit_card':
        return 'Card declined. Please check your card details or try another card.';
      case 'paypal':
        return 'PayPal transaction failed. Please ensure your account has sufficient funds.';
      case 'google_pay':
        return 'Google Pay transaction failed. Please try again or use a different payment method.';
      default:
        return 'Payment failed. Please try again.';
    }
  };

  const handleSubmitCardDetails = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.nameOnCard) {
      setErrorMessage('Please fill in all card details');
      return;
    }
    
    // Card number validation (simplified)
    if (formData.cardNumber.length < 15 || formData.cardNumber.length > 16) {
      setErrorMessage('Please enter a valid card number');
      return;
    }
    
    // CVV validation
    if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      setErrorMessage('Please enter a valid CVV');
      return;
    }

    // Expiry date validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(formData.expiryDate)) {
      setErrorMessage('Please enter a valid expiry date (MM/YY)');
      return;
    }

    // Phone number validation for verification
    if (!formData.phone) {
      setErrorMessage('Please enter your phone number for verification');
      return;
    }
    
    // Reset any previous errors
    setErrorMessage(null);
    
    // Move to verification instead of direct payment
    setShowCardDetails(false);
    setShowVerificationDialog(true);
  };

  const handleVerificationMethodSelect = (method: VerificationMethod) => {
    setVerificationMethod(method);
    
    // Reset OTP value when going to OTP screen
    setOtpValue('');
    
    // Simulate sending verification code
    toast.info(`Verification code ${method === 'sms' ? 'sent via SMS' : 'will be sent via phone call'} to ${formData.phone}`);
    
    // Move to OTP input
    setShowVerificationDialog(false);
    setShowOtpDialog(true);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpValue.length < 6) {
      setErrorMessage('Please enter the complete verification code');
      return;
    }
    
    // Reset any previous errors
    setErrorMessage(null);
    
    // Randomly decide if payment should succeed (90% success rate for demo)
    const shouldSucceed = Math.random() > 0.1;
    simulatePaymentProcessing(shouldSucceed);
  };

  const handleExternalPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      setErrorMessage('Please enter your email address');
      return;
    }
    
    if (paymentMethod === 'paypal' && !formData.accountId) {
      setErrorMessage('Please enter your PayPal email or phone');
      return;
    }
    
    // Reset any previous errors
    setErrorMessage(null);
    
    // Show PayPal login simulation
    toast.info('Redirecting to PayPal login page...');
    
    // Simulate PayPal login and confirmation process
    setTimeout(() => {
      toast.info('Processing payment with PayPal...');
      
      // Randomly decide if payment should succeed (90% success rate for demo)
      const shouldSucceed = Math.random() > 0.1;
      simulatePaymentProcessing(shouldSucceed);
    }, 1500);
  };

  const handleGooglePaySubmit = () => {
    // Reset any previous errors
    setErrorMessage(null);
    
    // Randomly decide if payment should succeed (90% success rate for demo)
    const shouldSucceed = Math.random() > 0.1;
    simulatePaymentProcessing(shouldSucceed);
  };

  const getPaymentMethodName = (method: PaymentMethod): string => {
    switch (method) {
      case 'credit_card': return 'Credit Card';
      case 'paypal': return 'PayPal';
      case 'google_pay': return 'Google Pay';
      default: return '';
    }
  };

  const cancelCardDetails = () => {
    setShowCardDetails(false);
  };

  const cancelExternalPayment = () => {
    setShowExternalPayment(false);
  };

  const handleBackToVerification = () => {
    setShowOtpDialog(false);
    setShowVerificationDialog(true);
    // Reset OTP value when going back
    setOtpValue('');
  };

  const handleBackToCardDetails = () => {
    setShowVerificationDialog(false);
    setShowCardDetails(true);
  };

  return {
    // State
    paymentMethod,
    paymentStatus,
    showCardDetails,
    showExternalPayment,
    showVerificationDialog,
    showOtpDialog,
    showGooglePayDialog,
    verificationMethod,
    otpValue,
    selectedGoogleAccount,
    selectedCard,
    errorMessage,
    formData,

    // Setters
    setOtpValue,
    setSelectedGoogleAccount,
    setSelectedCard,
    setShowCardDetails,
    setShowExternalPayment,
    setShowVerificationDialog,
    setShowOtpDialog,
    setShowGooglePayDialog,

    // Handlers
    handleInputChange,
    clearError,
    handlePaymentMethodChange,
    handleProceed,
    handleSubmitCardDetails,
    handleVerificationMethodSelect,
    handleOtpSubmit,
    handleExternalPaymentSubmit,
    handleGooglePaySubmit,
    getPaymentMethodName,
    cancelCardDetails,
    cancelExternalPayment,
    handleBackToVerification,
    handleBackToCardDetails
  };
};
