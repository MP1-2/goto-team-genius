
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
    setFormData: state.setFormData,
    formData: state.formData,
    errorMessage: state.errorMessage,
    onSuccess
  });
  
  const submission = usePaymentSubmission({
    formData: state.formData,
    paymentMethod: state.paymentMethod,
    otpValue: state.otpValue,
    setErrorMessage: state.setErrorMessage,
    setShowCardDetails: state.setShowCardDetails,
    setShowVerificationDialog: state.setShowVerificationDialog,
    setShowOtpDialog: state.setShowOtpDialog,
    simulatePaymentProcessing: handlers.simulatePaymentProcessing
  });

  const getPaymentMethodName = (method: string): string => {
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
    
    // Navigation handlers
    cancelCardDetails: handlers.cancelCardDetails || (() => state.setShowCardDetails(false)),
    cancelExternalPayment: handlers.cancelExternalPayment || (() => state.setShowExternalPayment(false)),
    handleBackToVerification: handlers.handleBackToVerification || (() => {
      state.setShowOtpDialog(false);
      state.setShowVerificationDialog(true);
    }),
    handleBackToCardDetails: handlers.handleBackToCardDetails || (() => {
      state.setShowVerificationDialog(false);
      state.setShowCardDetails(true);
    }),
    
    // Utilities
    getPaymentMethodName
  };
};

export * from './types';
