const fetch = require('node-fetch');
require('dotenv').config()

const CLIENT_ID = process.env.REACT_APP_TINK_LINK_PAYMENT_CLIENT_ID;
const CLIENT_SECRET = process.env.TINK_LINK_PAYMENT_CLIENT_SECRET;
const API_URL = 'https://api.tink.com/';

const destinationAccount = {
  destinations: [
    {
      accountNumber: '33008808080808',
      type: 'se',
      reference: '3245928392092',
    },
  ],
  recipientName: 'Demo Store AB',
  sourceMessage: 'Payment for Sneaker 034',
  remittanceInformation: {
    type: "UNSTRUCTURED",
    value: "3245928392092"
  },
};

const log = function (...args) {
  args.forEach((arg) => {
    console.log(arg);
  });
  console.log('\n\n');
};

const getAccessToken = async () => {
  const scopes = 'payment:read,payment:write';
  const response = await fetch(`${API_URL}api/v1/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&scope=${scopes}`,
  });

  const clientTokenResponse = await response.json();

  if (response.status !== 200) {
    log('Failed to create access token', response);
    throw Error();
  }

  log('Client access token response', clientTokenResponse);

  return clientTokenResponse.access_token;
};

const createPaymentRequest = async (clientAccessToken, market, currency, amount) => {
  const PaymentRequest = {
    ...destinationAccount,
    currency: currency,
    amount: amount,
    market: market,
  };

  const response = await fetch(`${API_URL}api/v1/payments/requests`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${clientAccessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(PaymentRequest),
  });

  const paymentRequestResponse = await response.json();

  if (response.status !== 200) {
    log('Failed to create payment request', response);
    throw Error();
  }

  log('Payment request response', paymentRequestResponse);

  return paymentRequestResponse;
};

const getTransferStatus = async (clientAccessToken, requestId) => {
  const response = await fetch(`${API_URL}api/v1/payments/requests/${requestId}/transfers`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${clientAccessToken}`,
      'Content-Type': 'application/json;',
    },
  });

  const transferResponse = await response.json();

  if (response.status !== 200) {
    log('Failed to fetch transfer status', response);
    throw Error();
  }

  log('Fetch transfer status response', transferResponse);

  return transferResponse;
};

module.exports = {
  getAccessToken,
  createPaymentRequest,
  getTransferStatus,
};
