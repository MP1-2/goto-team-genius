
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Import components and hooks
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentSummary from './PaymentSummary';
import PaymentDialogs from './PaymentDialogs';
import { usePaymentFlow } from '@/hooks/payment/usePaymentFlow';
import { mockGoogleAccounts } from '@/utils/mockPaymentData';

interface PaymentScreenProps {
  teamName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ teamName, onSuccess, onCancel }) => {
  const {
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
  } = usePaymentFlow({ onSuccess });

  return (
    <>
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl">Payment</CardTitle>
          <CardDescription>
            Complete payment to reserve "{teamName}"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PaymentMethodSelector 
            selectedMethod={paymentMethod} 
            onMethodChange={handlePaymentMethodChange} 
          />
          <PaymentSummary teamName={teamName} amount="$9.99" />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={handleProceed}
            disabled={paymentStatus === 'processing'}
          >
            {paymentStatus === 'processing' ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <>
                Proceed with {getPaymentMethodName(paymentMethod)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onCancel}
            disabled={paymentStatus === 'processing'}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>

      <PaymentDialogs
        // Dialog state
        showCardDetails={showCardDetails}
        showExternalPayment={showExternalPayment}
        showVerificationDialog={showVerificationDialog}
        showOtpDialog={showOtpDialog}
        showGooglePayDialog={showGooglePayDialog}
        
        // Dialog setters
        setShowCardDetails={setShowCardDetails}
        setShowExternalPayment={setShowExternalPayment}
        setShowVerificationDialog={setShowVerificationDialog}
        setShowOtpDialog={setShowOtpDialog}
        setShowGooglePayDialog={setShowGooglePayDialog}
        
        // Payment state
        paymentMethod={paymentMethod}
        paymentStatus={paymentStatus}
        verificationMethod={verificationMethod}
        otpValue={otpValue}
        selectedGoogleAccount={selectedGoogleAccount}
        selectedCard={selectedCard}
        errorMessage={errorMessage}
        formData={formData}
        
        // Google accounts data
        googleAccounts={mockGoogleAccounts}
        
        // Handlers
        setOtpValue={setOtpValue}
        setSelectedGoogleAccount={setSelectedGoogleAccount}
        setSelectedCard={setSelectedCard}
        onInputChange={handleInputChange}
        getPaymentMethodName={getPaymentMethodName}
        clearError={clearError}
        
        // Form submission handlers
        onSubmitCardDetails={handleSubmitCardDetails}
        onVerificationMethodSelect={handleVerificationMethodSelect}
        onOtpSubmit={handleOtpSubmit}
        onExternalPaymentSubmit={handleExternalPaymentSubmit}
        onGooglePaySubmit={handleGooglePaySubmit}
        
        // Navigation handlers
        onCancelCardDetails={cancelCardDetails}
        onCancelExternalPayment={cancelExternalPayment}
        onBackToVerification={handleBackToVerification}
        onBackToCardDetails={handleBackToCardDetails}
      />
    </>
  );
};

export default PaymentScreen;
