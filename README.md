![Platform](https://img.shields.io/badge/platform-web-blue.svg)
![Languages](https://img.shields.io/badge/languages-js-brightgreen.svg)

# Tink Link web payment example

This is an example app implementing payments initialisation using Tink Link. This project was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app).

## Installation

Running this example application requires `CLIENT_ID` and `CLIENT_SECRET`, retrievable in the [Tink Console](https://console.tink.com) after signing up for a developer account.

## Running the app locally

1. Install dependencies

```
yarn
```

2. Set your client identifier and client secret as environment variables

```
export REACT_APP_TINK_LINK_PAYMENT_CLIENT_ID='<YOUR_CLIENT_ID>'
export REACT_APP_TINK_LINK_PAYMENT_CLIENT_SECRET='<YOUR_CLIENT_SECRET>'
```

3. Run client and server in terminal separately

```
yarn start:client
yarn start:server
```

The client app is available at `http://localhost:3000`. The server is running at `http://localhost:8080`.

## Resources

For more information about initiate payments with Tink Link please visit [our documentation page](https://docs.tink.com/resources/payments/start-payment).
