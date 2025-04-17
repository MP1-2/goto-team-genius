
import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle,
  ArrowRight,
  DollarSign,
  AlertCircle,
  Smartphone,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface PaymentScreenProps {
  teamName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

type PaymentMethod = 'credit_card' | 'paypal' | 'google_pay';

type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

type VerificationMethod = 'sms' | 'call';

const PaymentScreen: React.FC<PaymentScreenProps> = ({ teamName, onSuccess, onCancel }) => {
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
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    email: '',
    phone: '',
    // For PayPal, Google Pay
    accountId: ''
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
    setErrorMessage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProceed = () => {
    if (paymentMethod === 'credit_card') {
      setShowCardDetails(true);
    } else if (paymentMethod === 'google_pay') {
      setShowGooglePayDialog(true);
    } else {
      // For PayPal, show external payment dialog
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
    
    // Move to verification instead of direct payment
    setShowCardDetails(false);
    setShowVerificationDialog(true);
  };

  const handleVerificationMethodSelect = (method: VerificationMethod) => {
    setVerificationMethod(method);
    
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
    
    // Randomly decide if payment should succeed (90% success rate for demo)
    const shouldSucceed = Math.random() > 0.1;
    simulatePaymentProcessing(shouldSucceed);
  };

  const handleGooglePaySubmit = () => {
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

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'credit_card': return <CreditCard className="h-5 w-5" />;
      case 'paypal': return <DollarSign className="h-5 w-5" />;
      case 'google_pay': return <img src="/lovable-uploads/519f0b55-8035-453a-a94e-34f07575e103.png" alt="Google Pay" className="h-5 w-5" />;
      default: return null;
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
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 font-medium">Select payment method</h3>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={(value) => handlePaymentMethodChange(value as PaymentMethod)}
              className="space-y-3"
            >
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <label htmlFor="credit_card" className="flex items-center cursor-pointer">
                    <CreditCard className="h-5 w-5 mr-2" />
                    <span>Credit Card</span>
                  </label>
                </div>
                <div className="text-sm text-muted-foreground">Visa, Mastercard, Amex</div>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <label htmlFor="paypal" className="flex items-center cursor-pointer">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>PayPal</span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="google_pay" id="google_pay" />
                  <label htmlFor="google_pay" className="flex items-center cursor-pointer">
                    <img 
                      src="/lovable-uploads/519f0b55-8035-453a-a94e-34f07575e103.png" 
                      alt="Google Pay" 
                      className="h-5 w-5 mr-2"
                    />
                    <span>Google Pay</span>
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-medium">Payment Summary</h3>
            <div className="flex justify-between py-2">
              <span>Team Name Reservation</span>
              <span>$9.99</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>$9.99</span>
            </div>
          </div>
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
          <form onSubmit={handleSubmitCardDetails} className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <label htmlFor="nameOnCard" className="text-sm font-medium">Name on Card</label>
              <Input 
                id="nameOnCard" 
                name="nameOnCard" 
                placeholder="John Doe" 
                value={formData.nameOnCard}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="cardNumber" className="text-sm font-medium">Card Number</label>
              <Input 
                id="cardNumber" 
                name="cardNumber" 
                placeholder="1234 5678 9012 3456" 
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="expiryDate" className="text-sm font-medium">Expiry Date</label>
                <Input 
                  id="expiryDate" 
                  name="expiryDate" 
                  placeholder="MM/YY" 
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="cvv" className="text-sm font-medium">CVV</label>
                <Input 
                  id="cvv" 
                  name="cvv" 
                  placeholder="123" 
                  value={formData.cvv}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number for Verification</label>
              <Input 
                id="phone" 
                name="phone" 
                placeholder="+1 (555) 123-4567" 
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex flex-col gap-2 pt-4">
              <Button type="submit" disabled={paymentStatus === 'processing'}>
                {paymentStatus === 'processing' ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowCardDetails(false)}
                disabled={paymentStatus === 'processing'}
              >
                Cancel
              </Button>
            </div>
          </form>
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
          <div className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 gap-4">
              <Button 
                onClick={() => handleVerificationMethodSelect('sms')}
                className="flex justify-start items-center h-auto py-3 px-4"
                variant="outline"
              >
                <Smartphone className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Receive SMS</div>
                  <div className="text-sm text-muted-foreground">
                    We'll send a code to {formData.phone || "+1 (***) ***-**67"}
                  </div>
                </div>
              </Button>
              
              <Button 
                onClick={() => handleVerificationMethodSelect('call')}
                className="flex justify-start items-center h-auto py-3 px-4"
                variant="outline"
              >
                <Phone className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Receive Phone Call</div>
                  <div className="text-sm text-muted-foreground">
                    We'll call you with a code at {formData.phone || "+1 (***) ***-**67"}
                  </div>
                </div>
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => {
                setShowVerificationDialog(false);
                setShowCardDetails(true);
              }}
            >
              Back
            </Button>
          </div>
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
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-center py-4">
              <InputOTP 
                maxLength={6}
                value={otpValue}
                onChange={setOtpValue}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} index={index} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
            
            {paymentStatus === 'success' && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-600">Payment Successful</AlertTitle>
                <AlertDescription className="text-green-600">
                  Your payment has been processed successfully.
                </AlertDescription>
              </Alert>
            )}
            
            {paymentStatus === 'failed' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Payment Failed</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                type="submit" 
                disabled={paymentStatus === 'processing' || paymentStatus === 'success' || otpValue.length < 6}
              >
                {paymentStatus === 'processing' ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : paymentStatus === 'success' ? (
                  <>
                    Payment Successful
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Verify & Pay $9.99
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowOtpDialog(false);
                  setShowVerificationDialog(true);
                }}
                disabled={paymentStatus === 'processing'}
              >
                Back
              </Button>
              
              <div className="text-center pt-2">
                <Button variant="link" className="text-sm p-0 h-auto">
                  Didn't receive a code? Resend
                </Button>
              </div>
            </div>
          </form>
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
          <div className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <div className="border-t border-b py-4">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                          <span className="text-lg">👤</span>
                        </div>
                        <div>
                          <p className="font-medium">{googleAccounts[selectedGoogleAccount].name}</p>
                          <p className="text-sm text-muted-foreground">{googleAccounts[selectedGoogleAccount].email}</p>
                        </div>
                      </div>
                      <div>
                        <ArrowRight className="h-4 w-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <div className="p-2">
                    {googleAccounts.map((account, index) => (
                      <div 
                        key={index}
                        className={`p-2 rounded hover:bg-muted cursor-pointer ${index === selectedGoogleAccount ? 'bg-muted' : ''}`}
                        onClick={() => {
                          setSelectedGoogleAccount(index);
                          setSelectedCard(0); // Reset selected card when changing account
                        }}
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                            <span className="text-lg">👤</span>
                          </div>
                          <div>
                            <p className="font-medium">{account.name}</p>
                            <p className="text-sm text-muted-foreground">{account.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="p-2 rounded hover:bg-muted cursor-pointer border-t mt-2 pt-3">
                      <p className="text-primary font-medium">Add another account</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-orange-100 rounded-md mr-3 flex items-center justify-center">
                          <span className="text-lg">💳</span>
                        </div>
                        <div>
                          <p className="font-medium">{googleAccounts[selectedGoogleAccount].cards[selectedCard].type} •••• {googleAccounts[selectedGoogleAccount].cards[selectedCard].lastFour}</p>
                        </div>
                      </div>
                      <div>
                        <ArrowRight className="h-4 w-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <div className="p-2">
                    {googleAccounts[selectedGoogleAccount].cards.map((card, index) => (
                      <div 
                        key={index}
                        className={`p-2 rounded hover:bg-muted cursor-pointer ${index === selectedCard ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedCard(index)}
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-orange-100 rounded-md mr-3 flex items-center justify-center">
                            <span className="text-lg">💳</span>
                          </div>
                          <div>
                            <p className="font-medium">{card.type} •••• {card.lastFour}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="p-2 rounded hover:bg-muted cursor-pointer border-t mt-2 pt-3">
                      <p className="text-primary font-medium">Add payment method</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              Your billing details will also be shared with the merchant
            </p>
            
            {paymentStatus === 'success' && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-600">Payment Successful</AlertTitle>
                <AlertDescription className="text-green-600">
                  Your Google Pay payment has been processed successfully.
                </AlertDescription>
              </Alert>
            )}
            
            {paymentStatus === 'failed' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Payment Failed</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-center pt-2">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 w-48"
                onClick={handleGooglePaySubmit}
                disabled={paymentStatus === 'processing' || paymentStatus === 'success'}
              >
                {paymentStatus === 'processing' ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : paymentStatus === 'success' ? (
                  <>
                    Payment Complete
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  'CONTINUE'
                )}
              </Button>
            </div>
          </div>
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
          <form onSubmit={handleExternalPaymentSubmit} className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Your Email</label>
              <Input 
                id="email" 
                name="email" 
                type="email"
                placeholder="your-email@example.com" 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            {paymentMethod === 'paypal' && (
              <div className="space-y-2">
                <label htmlFor="accountId" className="text-sm font-medium">PayPal Email or Phone</label>
                <Input 
                  id="accountId" 
                  name="accountId"
                  placeholder="your-paypal@example.com or phone" 
                  value={formData.accountId}
                  onChange={handleInputChange}
                />
              </div>
            )}
            
            {paymentStatus === 'success' && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-600">Payment Successful</AlertTitle>
                <AlertDescription className="text-green-600">
                  Your {getPaymentMethodName(paymentMethod)} payment has been processed successfully.
                </AlertDescription>
              </Alert>
            )}
            
            {paymentStatus === 'failed' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Payment Failed</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex flex-col gap-2 pt-4">
              <Button 
                type="submit" 
                disabled={paymentStatus === 'processing' || paymentStatus === 'success'}
              >
                {paymentStatus === 'processing' ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : paymentStatus === 'success' ? (
                  <>
                    Payment Successful
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    {`Pay with ${getPaymentMethodName(paymentMethod)}`}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowExternalPayment(false)}
                disabled={paymentStatus === 'processing'}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentScreen;
