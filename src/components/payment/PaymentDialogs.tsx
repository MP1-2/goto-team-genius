
import React from 'react';
import { PaymentMethod, PaymentStatus, VerificationMethod } from '@/hooks/payment/types';
import CreditCardDialog from './dialogs/CreditCardDialog';
import GooglePayDialog from './dialogs/GooglePayDialog';
import PaypalDialog from './dialogs/PaypalDialog';
import VerificationDialog from './dialogs/VerificationDialog';
import OtpDialog from './dialogs/OtpDialog';

interface PaymentDialogsProps {
  // Dialog state
  showCardDetails: boolean;
  showExternalPayment: boolean;
  showVerificationDialog: boolean;
  showOtpDialog: boolean;
  showGooglePayDialog: boolean;
  
  // Dialog setters
  setShowCardDetails: (show: boolean) => void;
  setShowExternalPayment: (show: boolean) => void;
  setShowVerificationDialog: (show: boolean) => void;
  setShowOtpDialog: (show: boolean) => void;
  setShowGooglePayDialog: (show: boolean) => void;
  
  // Payment state
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  verificationMethod: VerificationMethod;
  otpValue: string;
  errorMessage: string | null;
  formData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
    email: string;
    phone: string;
    accountId: string;
  };
  
  // States for Google Pay and card selection
  selectedGoogleAccount?: number;
  selectedCard?: number;
  googleAccounts?: Array<any>;
  
  // Handlers
  setOtpValue: (value: string) => void;
  setSelectedGoogleAccount?: (index: number) => void;
  setSelectedCard?: (index: number) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getPaymentMethodName: (method: PaymentMethod) => string;
  clearError: () => void;
  
  // Form submission handlers
  onSubmitCardDetails: (e: React.FormEvent) => void;
  onVerificationMethodSelect: (method: VerificationMethod) => void;
  onOtpSubmit: (e: React.FormEvent) => void;
  onExternalPaymentSubmit: (e: React.FormEvent) => void;
  onGooglePaySubmit: () => void;
  
  // Navigation handlers
  onCancelCardDetails: () => void;
  onCancelExternalPayment: () => void;
  onBackToVerification: () => void;
  onBackToCardDetails: () => void;
}

const PaymentDialogs: React.FC<PaymentDialogsProps> = ({
  showCardDetails,
  showExternalPayment,
  showVerificationDialog,
  showOtpDialog,
  showGooglePayDialog,
  setShowCardDetails,
  setShowExternalPayment,
  setShowVerificationDialog,
  setShowOtpDialog,
  setShowGooglePayDialog,
  paymentMethod,
  paymentStatus,
  verificationMethod,
  otpValue,
  errorMessage,
  formData,
  // We don't use these props in this component directly, but they're passed from PaymentScreen
  // so we need to include them in the interface
  selectedGoogleAccount,
  selectedCard,
  googleAccounts,
  setOtpValue,
  setSelectedGoogleAccount,
  setSelectedCard,
  onInputChange,
  getPaymentMethodName,
  clearError,
  onSubmitCardDetails,
  onVerificationMethodSelect,
  onOtpSubmit,
  onExternalPaymentSubmit,
  onGooglePaySubmit,
  onCancelCardDetails,
  onCancelExternalPayment,
  onBackToVerification,
  onBackToCardDetails
}) => {
  return (
    <>
      <CreditCardDialog
        showCardDetails={showCardDetails}
        setShowCardDetails={setShowCardDetails}
        formData={formData}
        errorMessage={errorMessage}
        paymentStatus={paymentStatus}
        onInputChange={onInputChange}
        onSubmitCardDetails={onSubmitCardDetails}
        onCancelCardDetails={onCancelCardDetails}
        clearError={clearError}
      />
      
      <GooglePayDialog
        showGooglePayDialog={showGooglePayDialog}
        setShowGooglePayDialog={setShowGooglePayDialog}
        errorMessage={errorMessage}
        paymentStatus={paymentStatus}
        onSubmit={onGooglePaySubmit}
      />
      
      <PaypalDialog
        showExternalPayment={showExternalPayment}
        setShowExternalPayment={setShowExternalPayment}
        paymentMethod={paymentMethod}
        paymentStatus={paymentStatus}
        errorMessage={errorMessage}
        onSubmit={onExternalPaymentSubmit}
        onCancel={onCancelExternalPayment}
        getPaymentMethodName={getPaymentMethodName}
      />
      
      <VerificationDialog
        showVerificationDialog={showVerificationDialog}
        setShowVerificationDialog={setShowVerificationDialog}
        phoneNumber={formData.phone}
        errorMessage={errorMessage}
        onMethodSelect={onVerificationMethodSelect}
        onBack={onBackToCardDetails}
      />
      
      <OtpDialog
        showOtpDialog={showOtpDialog}
        setShowOtpDialog={setShowOtpDialog}
        phoneNumber={formData.phone}
        verificationMethod={verificationMethod}
        otpValue={otpValue}
        setOtpValue={setOtpValue}
        errorMessage={errorMessage}
        paymentStatus={paymentStatus}
        onSubmit={onOtpSubmit}
        onBack={onBackToVerification}
      />
    </>
  );
};

export default PaymentDialogs;
