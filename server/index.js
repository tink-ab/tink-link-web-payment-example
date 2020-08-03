const api = require('./api');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());

if (!process.env.REACT_APP_TINK_LINK_PAYMENT_CLIENT_ID) {
  throw Error('Environment variable `REACT_APP_TINK_LINK_PAYMENT_CLIENT_ID` is not set.');
}

if (!process.env.TINK_LINK_PAYMENT_CLIENT_SECRET) {
  throw Error('Environment variable `TINK_LINK_PAYMENT_CLIENT_SECRET` is not set.');
}

app.post('/payment-request/:market/:currency/:amount', async (req, res) => {
  const { market, currency, amount } = req.params;

  const token = await api.getAccessToken();
  const paymentRequest = await api.createPaymentRequest(token, market, currency, amount);

  return res.json({ data: paymentRequest, token });
});

app.post('/payment-confirmation/:requestId', async (req, res) => {
  const { requestId } = req.params;
  const token = await api.getAccessToken();

  const transferStatus = await api.getTransferStatus(token, requestId);
  return res.json({ data: transferStatus });
});

app.listen(port, () => console.log(`Example app listening on port ${port}.`));
