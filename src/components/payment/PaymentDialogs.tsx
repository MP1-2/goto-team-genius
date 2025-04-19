import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreditCardForm from './CreditCardForm';
import VerificationMethodSelector from './VerificationMethodSelector';
import OtpVerification from './OtpVerification';
import GooglePayForm from './GooglePayForm';
import PaypalForm from './PaypalForm';
import { PaymentMethod, PaymentStatus, VerificationMethod } from '@/hooks/payment/types';

interface GoogleAccount {
  email: string;
  name: string;
  cards: Array<{
    type: string;
    lastFour: string;
  }>;
}

interface PaymentDialogsProps {
  // Dialog state
  showCardDetails: boolean;
  showExternalPayment: boolean;
  showVerificationDialog: boolean;
  showOtpDialog: boolean;
  showGooglePayDialog: boolean;
  
  // Dialog setters
  setShowCardDetails: (value: boolean) => void;
  setShowExternalPayment: (value: boolean) => void;
  setShowVerificationDialog: (value: boolean) => void;
  setShowOtpDialog: (value: boolean) => void;
  setShowGooglePayDialog: (value: boolean) => void;
  
  // Payment state
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  verificationMethod: VerificationMethod;
  otpValue: string;
  selectedGoogleAccount: number;
  selectedCard: number;
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
  
  // Google accounts data
  googleAccounts: GoogleAccount[];
  
  // Handlers
  setOtpValue: (value: string) => void;
  setSelectedGoogleAccount: (index: number) => void;
  setSelectedCard: (index: number) => void;
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
  // Dialog state
  showCardDetails,
  showExternalPayment,
  showVerificationDialog,
  showOtpDialog,
  showGooglePayDialog,
  
  // Dialog setters
  setShowCardDetails,
  setShowExternalPayment,
  setShowVerificationDialog,
  setShowOtpDialog,
  setShowGooglePayDialog,
  
  // Payment state
  paymentMethod,
  paymentStatus,
  verificationMethod,
  otpValue,
  selectedGoogleAccount,
  selectedCard,
  errorMessage,
  formData,
  
  // Google accounts data
  googleAccounts,
  
  // Handlers
  setOtpValue,
  setSelectedGoogleAccount,
  setSelectedCard,
  onInputChange,
  getPaymentMethodName,
  clearError,
  
  // Form submission handlers
  onSubmitCardDetails,
  onVerificationMethodSelect,
  onOtpSubmit,
  onExternalPaymentSubmit,
  onGooglePaySubmit,
  
  // Navigation handlers
  onCancelCardDetails,
  onCancelExternalPayment,
  onBackToVerification,
  onBackToCardDetails
}) => {
  return (
    <>
      {/* Credit Card Details Dialog */}
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

      {/* Verification Method Dialog */}
      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Verification Method</DialogTitle>
            <DialogDescription>
              To verify your payment, choose how you'd like to receive the verification code
            </DialogDescription>
          </DialogHeader>
          <VerificationMethodSelector
            phoneNumber={formData.phone}
            errorMessage={errorMessage}
            onMethodSelect={onVerificationMethodSelect}
            onBack={onBackToCardDetails}
          />
        </DialogContent>
      </Dialog>
      
      {/* OTP Input Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Verification Code</DialogTitle>
            <DialogDescription>
              {verificationMethod === 'sms' 
                ? `We've sent a 6-digit code to ${formData.phone || "+1 (***) ***-**67"} via SMS`
                : `You'll receive a 6-digit code via phone call at ${formData.phone || "+1 (***) ***-**67"}`
              }
            </DialogDescription>
          </DialogHeader>
          <OtpVerification
            phoneNumber={formData.phone}
            verificationMethod={verificationMethod}
            otpValue={otpValue}
            setOtpValue={setOtpValue}
            errorMessage={errorMessage}
            paymentStatus={paymentStatus}
            onSubmit={onOtpSubmit}
            onBack={onBackToVerification}
          />
        </DialogContent>
      </Dialog>
      
      {/* Google Pay Dialog */}
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
            onSubmit={onGooglePaySubmit}
          />
        </DialogContent>
      </Dialog>
      
      {/* External Payment Dialog (PayPal) */}
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
            onSubmit={onExternalPaymentSubmit}
            onCancel={onCancelExternalPayment}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentDialogs;
