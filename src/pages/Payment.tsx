
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, DollarSign } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

const creditCardSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be at least 16 digits'),
  cardholderName: z.string().min(3, 'Cardholder name required'),
  expiryDate: z.string().min(5, 'Expiry date required'),
  cvv: z.string().min(3, 'CVV required'),
});

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('creditCard');
  
  // PayPal flow states
  const [showPayPalLogin, setShowPayPalLogin] = useState(false);
  const [showPayPalSummary, setShowPayPalSummary] = useState(false);
  const [payPalEmail, setPayPalEmail] = useState('');
  const [payPalPassword, setPayPalPassword] = useState('');
  const [payPalProcessing, setPayPalProcessing] = useState(false);
  const [payPalSuccess, setPayPalSuccess] = useState(false);

  const form = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
    },
  });

  // Determine if this payment is for a subscription extension or new reservation
  const subscriptionId = location.state?.subscriptionId;
  const teamName = location.state?.teamName || 'Team Name';
  const expiryDate = location.state?.expiryDate;
  const isExtension = !!subscriptionId;

  const handleCreditCardSubmit = (values: z.infer<typeof creditCardSchema>) => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Payment successful!');
      
      if (isExtension) {
        // Calculate new expiry date (1 year from now)
        const newExpiryDate = new Date();
        newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
        
        navigate('/subscription-extended-success', { 
          state: { 
            teamName, 
            expiryDate: newExpiryDate.toISOString().split('T')[0]
          } 
        });
      } else {
        // Redirect to the reservation success page
        navigate('/reservation-success', { state: { teamName } });
      }
    }, 2000);
  };

  // Start the PayPal flow
  const handlePayPalPayment = () => {
    setShowPayPalLogin(true);
  };

  // Handle PayPal login
  const handlePayPalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!payPalEmail) {
      toast.error('Please enter your PayPal email or phone');
      return;
    }
    
    if (!payPalPassword) {
      toast.error('Please enter your PayPal password');
      return;
    }
    
    // Mock login process
    setPayPalProcessing(true);
    
    setTimeout(() => {
      setPayPalProcessing(false);
      setShowPayPalLogin(false);
      setShowPayPalSummary(true);
    }, 1500);
  };

  // Complete PayPal payment
  const handlePayPalComplete = () => {
    setPayPalProcessing(true);
    
    // Mock payment processing
    setTimeout(() => {
      setPayPalProcessing(false);
      setPayPalSuccess(true);
      
      // Show success message
      setTimeout(() => {
        setShowPayPalSummary(false);
        toast.success('PayPal payment successful!');
        
        // Navigate to appropriate success page
        if (isExtension) {
          const newExpiryDate = new Date();
          newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
          
          navigate('/subscription-extended-success', { 
            state: { 
              teamName, 
              expiryDate: newExpiryDate.toISOString().split('T')[0]
            } 
          });
        } else {
          navigate('/reservation-success', { state: { teamName } });
        }
      }, 1500);
    }, 2000);
  };

  const handleVenmoPayment = () => {
    // In a real implementation, you would redirect to Venmo here
    window.open('https://www.venmo.com', '_blank');
    toast('Redirecting to Venmo...');
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background">
        <div className="flex items-center border-b px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold">Payment</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="mb-6 rounded-lg bg-muted p-4">
          <h2 className="mb-2 font-semibold">Order Summary</h2>
          <div className="flex justify-between text-sm">
            <span>{isExtension ? 'Subscription Extension' : 'Team Name Reservation'}</span>
            <span className="font-medium">{teamName}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>Total</span>
            <span className="text-lg font-bold">$9.99/month</span>
          </div>
        </div>

        <Tabs defaultValue="creditCard" onValueChange={setSelectedMethod}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="creditCard">Credit Card</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
            <TabsTrigger value="venmo">Venmo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="creditCard" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Credit Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form 
                    onSubmit={form.handleSubmit(handleCreditCardSubmit)} 
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="1234 5678 9012 3456" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cardholderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cardholder Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="MM/YY" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123" 
                                type="password"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        'Pay $9.99/month'
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="paypal" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  PayPal
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6 text-muted-foreground">
                  You'll be redirected to PayPal to complete your payment.
                </p>
                <Button 
                  onClick={handlePayPalPayment}
                  className="w-full"
                >
                  Continue to PayPal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="venmo" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Venmo
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6 text-muted-foreground">
                  You'll be redirected to Venmo to complete your payment.
                </p>
                <Button 
                  onClick={handleVenmoPayment}
                  className="w-full"
                >
                  Continue to Venmo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* PayPal Login Dialog */}
      <Dialog open={showPayPalLogin} onOpenChange={setShowPayPalLogin}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              <img 
                src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" 
                alt="PayPal Logo" 
                className="h-12" 
              />
            </div>
            <DialogTitle>Log in to PayPal</DialogTitle>
            <DialogDescription>
              Enter your email or mobile number to get started
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePayPalLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="paypal-email" className="text-sm font-medium">
                Email or mobile number
              </label>
              <Input
                id="paypal-email"
                placeholder="Email or phone"
                value={payPalEmail}
                onChange={(e) => setPayPalEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="paypal-password" className="text-sm font-medium">
                  Password
                </label>
                <Button variant="link" size="sm" className="text-xs px-0 h-auto">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="paypal-password"
                type="password"
                placeholder="Password"
                value={payPalPassword}
                onChange={(e) => setPayPalPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#0070ba] hover:bg-[#005ea6]"
              disabled={payPalProcessing}
            >
              {payPalProcessing ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                'Log In'
              )}
            </Button>
            <div className="text-center">
              <span className="text-sm text-gray-500">or</span>
            </div>
            <Button 
              type="button"
              variant="outline" 
              className="w-full"
            >
              Sign Up
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* PayPal Payment Summary Dialog */}
      <Dialog open={showPayPalSummary} onOpenChange={setShowPayPalSummary}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              <img 
                src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" 
                alt="PayPal Logo" 
                className="h-12" 
              />
            </div>
            <DialogTitle>Payment Summary</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Hi, {payPalEmail.split('@')[0] || 'User'}!</p>
                  <h3 className="text-lg font-bold mt-2">Pay with</h3>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">$9.99 USD</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroup defaultValue="balance" className="flex flex-col space-y-3 w-full">
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <RadioGroupItem value="balance" id="balance" />
                      <label htmlFor="balance" className="flex flex-1 justify-between items-center cursor-pointer">
                        <div className="flex items-center">
                          <img 
                            src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" 
                            alt="PayPal" 
                            className="h-6 mr-2" 
                          />
                          <span>PayPal Balance</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <RadioGroupItem value="card" id="card" />
                      <label htmlFor="card" className="flex flex-1 justify-between items-center cursor-pointer">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2" />
                          <span>Credit Card (****1234)</span>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  variant="link" 
                  className="flex items-center text-sm text-blue-600 p-0 h-auto"
                >
                  + Add a payment method
                </Button>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span>Team Name Reservation</span>
              <span className="font-medium">{teamName}</span>
            </div>

            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold">$9.99 USD</span>
            </div>

            <div className="rounded-md bg-blue-50 border border-blue-100 p-3 text-center">
              <p className="text-sm text-blue-700">
                PayPal is the safer, easier way to pay
              </p>
              <p className="text-xs text-blue-600 mt-1">
                No matter where you shop, we keep your financial information secure
              </p>
            </div>

            {payPalSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-600">Payment Successful</AlertTitle>
                <AlertDescription className="text-green-600">
                  Your payment has been processed successfully.
                </AlertDescription>
              </Alert>
            )}

            <div className="pt-2">
              <Button 
                onClick={handlePayPalComplete} 
                className="w-full bg-[#0070ba] hover:bg-[#005ea6]"
                disabled={payPalProcessing || payPalSuccess}
              >
                {payPalProcessing ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : payPalSuccess ? (
                  <>
                    Payment Complete
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  'Pay Now'
                )}
              </Button>
              
              <div className="text-center mt-3">
                <Button variant="link" className="text-xs" disabled={payPalProcessing || payPalSuccess}>
                  Cancel and return
                </Button>
              </div>
              
              <div className="text-center mt-4 text-xs text-gray-500">
                <p>Policies | Terms | Privacy | Feedback</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
