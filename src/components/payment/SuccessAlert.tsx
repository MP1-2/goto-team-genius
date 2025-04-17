
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

interface SuccessAlertProps {
  message: string;
  paymentMethod?: string;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, paymentMethod }) => {
  return (
    <Alert className="bg-green-50 border-green-200">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-600">Payment Successful</AlertTitle>
      <AlertDescription className="text-green-600">
        {message || `Your ${paymentMethod || ''} payment has been processed successfully.`}
      </AlertDescription>
    </Alert>
  );
};

export default SuccessAlert;
