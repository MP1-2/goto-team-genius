
import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle,
  ArrowRight,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface PaymentScreenProps {
  teamName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

type PaymentMethod = 'credit_card' | 'paypal' | 'stripe' | 'venmo';

const PaymentScreen: React.FC<PaymentScreenProps> = ({ teamName, onSuccess, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
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
      // For other payment methods, simulate redirect to external provider
      setIsProcessing(true);
      toast.success(`Redirecting to ${getPaymentMethodName(paymentMethod)}...`);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        onSuccess();
      }, 2000);
    }
  };

  const handleSubmitCardDetails = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.nameOnCard) {
      toast.error('Please fill in all card details');
      return;
    }
    
    // Simulate card processing
    setIsProcessing(true);
    toast.success('Processing payment...');
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowCardDetails(false);
      onSuccess();
    }, 2000);
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
            disabled={isProcessing}
          >
            {isProcessing ? (
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
            disabled={isProcessing}
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
            <div className="flex flex-col gap-2 pt-4">
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
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
                disabled={isProcessing}
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
