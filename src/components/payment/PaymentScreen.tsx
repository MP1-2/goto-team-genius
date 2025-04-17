
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Import the refactored components
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentSummary from './PaymentSummary';
import CreditCardForm from './CreditCardForm';
import VerificationMethodSelector from './VerificationMethodSelector';
import OtpVerification from './OtpVerification';
import GooglePayForm from './GooglePayForm';
import PaypalForm from './PaypalForm';

type PaymentMethod = 'credit_card' | 'paypal' | 'google_pay';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';
type VerificationMethod = 'sms' | 'call';

interface PaymentScreenProps {
  teamName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ teamName, onSuccess, onCancel }) => {
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

  // Mock data for Google accounts
  const googleAccounts = [
    {
      email: 'tmna2002@gmail.com',
      name: 'Nhat Anh Tran Minh',
      cards: [
        { type: 'Mastercard', lastFour: '0000' },
        { type: 'Visa', lastFour: '4242' }
      ]
    },
    {
      email: 'user@example.com',
      name: 'Example User',
      cards: [
        { type: 'Visa', lastFour: '1234' }
      ]
    }
  ];

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
    
    // Randomly decide if payment should succeed (90% success rate for demo)
    const shouldSucceed = Math.random() > 0.1;
    simulatePaymentProcessing(shouldSucceed);
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
            onInputChange={handleInputChange}
            onSubmit={handleSubmitCardDetails}
            onCancel={() => setShowCardDetails(false)}
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
            onMethodSelect={handleVerificationMethodSelect}
            onBack={() => {
              setShowVerificationDialog(false);
              setShowCardDetails(true);
            }}
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
            onSubmit={handleOtpSubmit}
            onBack={() => {
              setShowOtpDialog(false);
              setShowVerificationDialog(true);
              // Reset OTP value when going back
              setOtpValue('');
            }}
          />
        </DialogContent>
      </Dialog>
      
      {/* Google Pay Dialog */}
      <Dialog open={showGooglePayDialog} onOpenChange={setShowGooglePayDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              <img 
                src="/lovable-uploads/519f0b55-8035-453a-a94e-34f07575e103.png" 
                alt="Google Pay" 
                className="h-8" 
              />
            </div>
            <DialogTitle className="text-center">Quét QR & Thanh toán bằng ứng dụng</DialogTitle>
          </DialogHeader>
          <GooglePayForm
            googleAccounts={googleAccounts}
            selectedGoogleAccount={selectedGoogleAccount}
            selectedCard={selectedCard}
            errorMessage={errorMessage}
            paymentStatus={paymentStatus}
            setSelectedGoogleAccount={setSelectedGoogleAccount}
            setSelectedCard={setSelectedCard}
            onSubmit={handleGooglePaySubmit}
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
            formData={formData}
            errorMessage={errorMessage}
            paymentStatus={paymentStatus}
            onInputChange={handleInputChange}
            onSubmit={handleExternalPaymentSubmit}
            onCancel={() => setShowExternalPayment(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentScreen;
