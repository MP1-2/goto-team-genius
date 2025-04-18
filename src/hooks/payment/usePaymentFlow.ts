
import { usePaymentState } from './usePaymentState';
import { usePaymentHandlers } from './usePaymentHandlers';
import { usePaymentSubmission } from './usePaymentSubmission';
import { UsePaymentFlowProps } from './types';

export const usePaymentFlow = ({ onSuccess }: UsePaymentFlowProps) => {
  const state = usePaymentState();
  
  const handlers = usePaymentHandlers({
    paymentMethod: state.paymentMethod,
    setPaymentMethod: state.setPaymentMethod,
    setPaymentStatus: state.setPaymentStatus,
    setShowCardDetails: state.setShowCardDetails,
    setShowExternalPayment: state.setShowExternalPayment,
    setShowVerificationDialog: state.setShowVerificationDialog,
    setShowOtpDialog: state.setShowOtpDialog,
    setShowGooglePayDialog: state.setShowGooglePayDialog,
    setErrorMessage: state.setErrorMessage,
    onSuccess
  });
  
  const submission = usePaymentSubmission({
    formData: state.formData,
    paymentMethod: state.paymentMethod,
    setErrorMessage: state.setErrorMessage,
    setShowCardDetails: state.setShowCardDetails,
    setShowVerificationDialog: state.setShowVerificationDialog,
    setShowOtpDialog: state.setShowOtpDialog,
    simulatePaymentProcessing: handlers.simulatePaymentProcessing
  });

  const getPaymentMethodName = (method: PaymentMethod): string => {
    switch (method) {
      case 'credit_card': return 'Credit Card';
      case 'paypal': return 'PayPal';
      case 'google_pay': return 'Google Pay';
      default: return '';
    }
  };

  return {
    // State
    ...state,
    
    // Handlers
    handleInputChange: handlers.handleInputChange,
    clearError: handlers.clearError,
    handlePaymentMethodChange: handlers.handlePaymentMethodChange,
    handleProceed: handlers.handleProceed,
    
    // Form submission handlers
    handleSubmitCardDetails: submission.handleSubmitCardDetails,
    handleVerificationMethodSelect: submission.handleVerificationMethodSelect,
    handleOtpSubmit: submission.handleOtpSubmit,
    handleExternalPaymentSubmit: submission.handleExternalPaymentSubmit,
    handleGooglePaySubmit: submission.handleGooglePaySubmit,
    
    // Utilities
    getPaymentMethodName
  };
};

export * from './types';
