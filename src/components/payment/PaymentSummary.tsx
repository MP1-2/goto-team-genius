
import React from 'react';

interface PaymentSummaryProps {
  teamName: string;
  amount: string;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ teamName, amount }) => {
  return (
    <div className="rounded-lg bg-muted p-4">
      <h3 className="mb-2 font-medium">Payment Summary</h3>
      <div className="flex justify-between py-2">
        <span>Team Name Reservation</span>
        <span>{amount}</span>
      </div>
      <div className="flex justify-between py-2 font-bold">
        <span>Total</span>
        <span>{amount}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;
