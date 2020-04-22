import React from 'react';
import { Error } from './Error';
import { ConfirmPayment } from './ConfirmPayment';

const TinkLinkCallback = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error');
  const paymentRequestId = urlParams.get('payment_request_id');

  if (error) {
    const errorMessage = urlParams.get('message') || undefined;

    return <Error error={error} errorMessage={errorMessage} />;
  }

  if (paymentRequestId) {
    return <ConfirmPayment requestId={paymentRequestId} />;
  }

  return null;
};

export default TinkLinkCallback;
