export const TINK_LINK_URL = 'https://link.tink.com';

export type PaymentRequestResponse = {
  amount: number;
  currency: string;
  id: string;
  destinations: PaymentDestinationRequest[];
  market: string;
  recipientName: string;
  sourceMessage?: string;
};

export type PaymentDestinationRequest = {
  accountNumber: string;
  reference?: string;
  type: string;
};

export type PaymentRequestCreatedTransfers = {
  id: string;
  amount: number;
  created?: string;
  currency: string;
  destination: PaymentDestinationRequest;
  market: string;
  providerName: string;
  recipientName: string;
  sourceMessage?: string;
  status: string;
  statusMessage: string;
  updated?: string;
};

export const createPaymentRequest = async (
  market: string,
  currency: string,
  amount: number
): Promise<PaymentRequestResponse> => {
  const response = await fetch(`/payment-request/${market}/${currency}/${amount}`, {
    method: 'POST',
    body: JSON.stringify({ market: market, currency: currency, amount: amount }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const paymentResponse = await response.json();
  return paymentResponse.data;
};

export const createTinkLinkURL = (request_id: string) => {
  const params = [
    `client_id=${process.env.REACT_APP_TINK_LINK_PAYMENT_CLIENT_ID}`,
    'redirect_uri=http://localhost:3000/callback',
    'scope=user:read,credentials:read',
    'market=SE',
    'locale=en_US',
    `payment_request_id=${request_id}`,
    'test=true',
  ];

  return `${TINK_LINK_URL}/1.0/pay?${params.join('&')}`;
};

export const getPaymentConfirmation = async (requestId: string) => {
  const response = await fetch(`/payment-confirmation/${requestId}`, {
    method: 'POST',
    body: JSON.stringify({ request_id: requestId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const paymentConfirmationResponse = await response.json();
  return paymentConfirmationResponse.data;
};
