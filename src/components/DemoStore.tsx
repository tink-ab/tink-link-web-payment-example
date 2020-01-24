import * as React from 'react';

import Header from "./Header";
import ProductImage from "./ProductImage";
import {createPaymentRequest, getTinkLinkUrl} from "../api";

type Payment = {
  market: string,
  currency: string,
  amount: number
}

type ProductItem = {
  name: string;
  model: string;
  modelType: string;
  price: Payment;
}

const Product: ProductItem = {
  model: "Pumpbox Kicks",
  name: "Sneaker 034",
  modelType: "Runner boost",
  price:{
    market: "SE",
    currency: "SEK",
    amount: 900
  }
};

const Demostore: React.FC = () => {

  const {
    name,
    model,
    modelType,
    price: { market, currency, amount },
  } = Product;

  const getPaymentRequest = async () => {
    const paymentResponse = await createPaymentRequest(market, currency, amount);
    const payementRequestId = paymentResponse.id;

    window.location.href = getTinkLinkUrl(payementRequestId);
 }



  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="header-1">Payments demo</div>
        <div className="paper display-flex flex-column">
          <div className="display-flex">
          <div className="h-68 w-68 bg-londan-square rounded-15 display-flex mb-30"></div>
          <div className="bg-londan-square mt-30 w-150 ml-20 h-10 rounded-15"></div>
          </div>
          <div className="display-flex">
            <ProductImage/>
            <div className="bg-white ml-40 display-flex flex-column justify-center w-588">
              <span className="text-20 tracking-normal leading-28 lighGrey font-semibold">{model}</span>
              <p className="text-64 matt-black font-semibold tracking-normal">{name}</p>
              <span className="text-20 leading-28 matt-black tracking-normal">{modelType}</span>
              <span className="text-32 leading-40 matt-black mt-30 font-semibold tracking-normal">{amount} kr</span>
              <button
                className="button mt-24"
                onClick={() => getPaymentRequest()}
              >
                Buy now
                </button>
            </div>
          </div>
          <div className="bg-londan-square mt-30 w-350 ml-6 h-10 rounded-15"></div>
          <div className="display-flex mt-30 mb-30">
          <div className="display-flex flex-column">
            <div className="bg-londan-square h-200 w-200 rounded-15 mr-35"></div>
            <div className="bg-londan-square mt-30 w-150 ml-20 h-10 rounded-15"></div>
          </div>
            <div className="display-flex flex-column">
              <div className="bg-londan-square h-200 w-200 rounded-15 mr-35"></div>
              <div className="bg-londan-square mt-30 w-150 ml-20 h-10 rounded-15"></div>
            </div>
            <div className="display-flex flex-column">
              <div className="bg-londan-square h-200 w-200 rounded-15 mr-35"></div>
              <div className="bg-londan-square mt-30 w-150 ml-20 h-10 rounded-15"></div>
            </div>
            <div className="display-flex flex-column">
              <div className="bg-londan-square h-200 w-200 rounded-15 mr-35"></div>
              <div className="bg-londan-square mt-30 w-150 ml-20 h-10 rounded-15"></div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default Demostore;
