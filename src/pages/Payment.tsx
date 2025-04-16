
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
  const isExtension = !!subscriptionId;

  const handleCreditCardSubmit = (values: z.infer<typeof creditCardSchema>) => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Payment successful!');
      
      if (isExtension) {
        navigate('/profile', { state: { tab: 'subscriptions' } });
      } else {
        navigate('/logo', { state: { teamName } });
      }
    }, 2000);
  };

  const handlePayPalPayment = () => {
    // In a real implementation, you would redirect to PayPal here
    window.open('https://www.paypal.com', '_blank');
    toast('Redirecting to PayPal...');
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
    </div>
  );
};

export default Payment;
