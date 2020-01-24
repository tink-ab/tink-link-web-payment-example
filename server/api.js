const fetch = require('node-fetch');

const CLIENT_ID = process.env.REACT_APP_TINK_LINK_PAYMENT_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_TINK_LINK_PAYMENT_CLIENT_SECRET;
const API_URL = 'https://api.tink.com/';

const testPaymentDetails = {
  destinations: [
    {
      accountNumber: '33008808080808',
      type: 'se',
      reference: '3245928392092',
    },
  ],
  recipientName: 'Demo Store AB',
  sourceMessage: 'Payment for Sneaker 034',
};

const log = function (...args) {
  args.forEach(arg => {
    console.log(arg);
  });
  console.log("\n\n");
};

const getAccessToken = async () => {
  const scopes = 'payment:read,payment:write';
  const res = await fetch(
    `${API_URL}api/v1/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&scope=${scopes}`
    }
  );

  const response = await res.json();
  log("Create client access token", response);

  return response.access_token;
}

const createPaymentRequest = async (clientAccessToken, market, currency, amount) => {

  const PaymentRequest = {
    ...testPaymentDetails,
    currency: currency,
    amount: amount,
    market: market
  };


  const response = await fetch(
    `${API_URL}api/v1/payments/requests`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${clientAccessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(PaymentRequest)
    }
  );

  const paymentResponse = await response.json();

  if (response.status !== 200) {
    throw Error(`Failed to create payment request: ${paymentResponse.errorMessage}`);
  }

  log("Payment response: ", paymentResponse);

  return paymentResponse;
}

const getTransferStatus = async (clientAccessToken, requestId) => {
  const response = await fetch(
    `${API_URL}api/v1/payments/requests/${requestId}/transfers`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${clientAccessToken}`,
        "Content-Type": "application/json;"
      },
    }
  );

  const transferRespons = await response.json();

  if (response.status !== 200) {
    throw Error(`Failed to create payment request: ${response.errorMessage}`);
  }

  log("Payment confirmation response: ", transferRespons);

  return transferRespons;
}




module.exports = {
  getAccessToken,
  createPaymentRequest,
  getTransferStatus
}
