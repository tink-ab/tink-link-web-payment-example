import React, { useState, useEffect } from 'react';

import Header from "./Header";
import { PrettyCode } from "./PrettyCode";
import { getPaymentConfirmation, PaymentRequestCreatedTransfers} from "../api";

type ConfirmPaymentProps = {
  requestId: string;
}

export const ConfirmPayment: React.FC<ConfirmPaymentProps> = ({ requestId}) => {
  const [paymentConfirmation, setPaymentConfirmation] = useState<PaymentRequestCreatedTransfers[] | undefined>(
    undefined
  );

  useEffect(() => {
    const getConfirmation= async (requestId: string) =>{
      const transferStatus = await getPaymentConfirmation(requestId);
      setPaymentConfirmation(transferStatus.paymentRequestCreatedTransfers);
    }
    getConfirmation(requestId);
  }, [requestId])


  return(
    <>
      <Header/>
      <div className="content">
        <div className="header-1">Payments Demo</div>
        <div className="paper">
          <div className="display-flex">
            <div className="ml-16">
              <div className="heading-2">
                Payment status
              </div>
              {!paymentConfirmation && <div>Fetching payment status ...</div>}
              {paymentConfirmation &&
                paymentConfirmation.map(status => (
                  <div key={status.id}>
                    <PrettyCode
                      code={JSON.stringify(status, null, 2)}
                      className="mb-10"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="walking-coin ma-auto mt-120 mb-80"></div>
      </div>
    </>);

}

