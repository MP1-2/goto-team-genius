
import { useState } from 'react';
import { PaymentMethod, PaymentStatus, PaymentFormData, VerificationMethod } from './types';

export const usePaymentState = () => {
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
  
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    email: '',
    phone: '',
    accountId: ''
  });

  return {
    paymentMethod,
    setPaymentMethod,
    paymentStatus,
    setPaymentStatus,
    showCardDetails,
    setShowCardDetails,
    showExternalPayment,
    setShowExternalPayment,
    showVerificationDialog,
    setShowVerificationDialog,
    showOtpDialog,
    setShowOtpDialog,
    showGooglePayDialog,
    setShowGooglePayDialog,
    verificationMethod,
    setVerificationMethod,
    otpValue,
    setOtpValue,
    selectedGoogleAccount,
    setSelectedGoogleAccount,
    selectedCard,
    setSelectedCard,
    errorMessage,
    setErrorMessage,
    formData,
    setFormData
  };
};
