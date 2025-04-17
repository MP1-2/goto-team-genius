
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentScreen from '@/components/payment/PaymentScreen';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if this payment is for a subscription extension or new reservation
  const subscriptionId = location.state?.subscriptionId;
  const teamName = location.state?.teamName || 'Team Name';
  const expiryDate = location.state?.expiryDate;
  const isExtension = !!subscriptionId;

  const handlePaymentSuccess = () => {
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
  };

  const handlePaymentCancel = () => {
    navigate(-1);
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
        <PaymentScreen 
          teamName={teamName}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      </div>
    </div>
  );
};

export default Payment;
