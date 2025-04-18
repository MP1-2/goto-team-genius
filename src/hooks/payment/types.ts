
export type PaymentMethod = 'credit_card' | 'paypal' | 'google_pay';
export type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';
export type VerificationMethod = 'sms' | 'call';

export interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  email: string;
  phone: string;
  accountId: string;
}

export interface UsePaymentFlowProps {
  onSuccess: () => void;
}
