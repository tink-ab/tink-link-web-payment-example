import React from 'react';

import Header from './Header';
import ProductImage from './ProductImage';
import { createPaymentRequest, createTinkLinkURL } from '../api';

type Payment = {
  market: string;
  currency: string;
  amount: number;
};

type ProductItem = {
  name: string;
  model: string;
  price: Payment;
};

const Product: ProductItem = {
  model: 'Sculptural artwork',
  name: 'Landscape',
  price: {
    market: 'SE',
    currency: 'SEK',
    amount: 450,
  },
};

const Demostore: React.FC = () => {
  const {
    name,
    model,
    price: { market, currency, amount },
  } = Product;

  const getPaymentRequest = async () => {
    const paymentResponse = await createPaymentRequest(market, currency, amount);
    const payementRequestId = paymentResponse.id;
    /* We redirect from our application to tink.link.com, once the flow is
       completed on, we will get redirected back to the redirect_uri
       that we have specified. */
    window.location.href = createTinkLinkURL(payementRequestId);
  };

  return (
    <div className="App">
      <Header />
      <div className="content mb-234">
        <h1 className="text-2xl">Payments demo</h1>
        <div className="paper display-flex flex-column">
          <div className="display-flex">
            <div className="h-68 w-68 bg-londan-square rounded-15 display-flex mb-54"></div>
            <div className="bg-londan-square mt-30 w-150 ml-20 h-10 rounded-15"></div>
          </div>
          <div className="display-flex mb-77">
            <ProductImage />
            <div className="bg-white ml-58 display-flex flex-column justify-center w-588">
              <span className="text-20 tracking-normal leading-28 color-grey font-semibold">
                {model}
              </span>
              <p className="text-64 color-black font-semibold tracking-normal mb-56">{name}</p>
              <span className="text-32 leading-40 color-black font-semibold tracking-normal">
                {amount} kr
              </span>
              <button className="button mt-21" onClick={() => getPaymentRequest()}>
                Buy now
              </button>
            </div>
          </div>
          <div className="bg-londan-square mt-30 w-350 ml-6 h-10 rounded-15"></div>
          <div className="display-flex mt-30 mb-30">
            <div className="display-flex flex-column mb-128">
              <div className="bg-londan-square h-200 w-200 rounded-15 mr-22"></div>
              <div className="bg-londan-square mt-22 w-150 h-10 rounded-15"></div>
              <div className="bg-londan-square mt-12 w-68 h-10 rounded-15"></div>
            </div>
            <div className="display-flex flex-column mb-128">
              <div className="bg-londan-square h-200 w-200 rounded-15 mr-22"></div>
              <div className="bg-londan-square mt-22 w-150 h-10 rounded-15"></div>
              <div className="bg-londan-square mt-12 w-68 h-10 rounded-15"></div>
            </div>
            <div className="display-flex flex-column mb-128">
              <div className="bg-londan-square h-200 w-200 rounded-15 mr-22"></div>
              <div className="bg-londan-square mt-22 w-150 h-10 rounded-15"></div>
              <div className="bg-londan-square mt-12 w-68 h-10 rounded-15"></div>
            </div>
            <div className="display-flex flex-column mb-128">
              <div className="bg-londan-square h-200 w-200 rounded-15 mr-22"></div>
              <div className="bg-londan-square mt-22 w-150 h-10 rounded-15"></div>
              <div className="bg-londan-square mt-12 w-68 h-10 rounded-15"></div>
            </div>
          </div>
        </div>
        <div className="gradient"></div>
      </div>
    </div>
  );
};

export default Demostore;
