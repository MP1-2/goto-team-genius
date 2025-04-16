
import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle,
  ArrowRight,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

interface PaymentScreenProps {
  teamName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

type PaymentMethod = 'credit_card' | 'paypal' | 'stripe' | 'venmo';

type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

const PaymentScreen: React.FC<PaymentScreenProps> = ({ teamName, onSuccess, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showExternalPayment, setShowExternalPayment] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    email: '',
    // For PayPal, Stripe, Venmo
    accountId: ''
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    } else {
      // For other payment methods, show external payment dialog
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
          onSuccess();
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
      case 'stripe':
        return 'Payment processing error. Please try again or use a different payment method.';
      case 'venmo':
        return 'Unable to complete Venmo transaction. Please verify your account information.';
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
    
    if (paymentMethod === 'venmo' && !formData.accountId) {
      setErrorMessage('Please enter your Venmo username');
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

  const getPaymentMethodName = (method: PaymentMethod): string => {
    switch (method) {
      case 'credit_card': return 'Credit Card';
      case 'paypal': return 'PayPal';
      case 'stripe': return 'Stripe';
      case 'venmo': return 'Venmo';
      default: return '';
    }
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'credit_card': return <CreditCard className="h-5 w-5" />;
      case 'paypal': return <DollarSign className="h-5 w-5" />;
      case 'stripe': return <DollarSign className="h-5 w-5" />;
      case 'venmo': return <DollarSign className="h-5 w-5" />;
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
                  <RadioGroupItem value="stripe" id="stripe" />
                  <label htmlFor="stripe" className="flex items-center cursor-pointer">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Stripe</span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="venmo" id="venmo" />
                  <label htmlFor="venmo" className="flex items-center cursor-pointer">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Venmo</span>
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
            
            <div className="flex flex-col gap-2 pt-4">
              <Button type="submit" disabled={paymentStatus === 'processing' || paymentStatus === 'success'}>
                {paymentStatus === 'processing' ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : paymentStatus === 'success' ? (
                  <>
                    Payment Successful
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Pay $9.99
                    <CheckCircle className="ml-2 h-4 w-4" />
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
      
      {/* External Payment Dialog (PayPal, Stripe, Venmo) */}
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
            
            {paymentMethod === 'venmo' && (
              <div className="space-y-2">
                <label htmlFor="accountId" className="text-sm font-medium">Venmo Username</label>
                <Input 
                  id="accountId" 
                  name="accountId"
                  placeholder="@username" 
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
            
            {paymentMethod === 'stripe' && paymentStatus === 'idle' && (
              <Alert>
                <AlertTitle>Stripe Payment</AlertTitle>
                <AlertDescription>
                  You'll be redirected to Stripe's secure payment page after clicking "Continue".
                </AlertDescription>
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
                    {paymentMethod === 'stripe' ? 'Continue to Stripe' : `Pay with ${getPaymentMethodName(paymentMethod)}`}
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
