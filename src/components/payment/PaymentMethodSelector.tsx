
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, DollarSign } from 'lucide-react';

type PaymentMethod = 'credit_card' | 'paypal' | 'google_pay';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ 
  selectedMethod, 
  onMethodChange 
}) => {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 font-medium">Select payment method</h3>
      <RadioGroup 
        value={selectedMethod} 
        onValueChange={(value) => onMethodChange(value as PaymentMethod)}
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
  );
};

export default PaymentMethodSelector;
