import React, { useState, useEffect } from 'react';

import Header from './Header';
import { PrettyCode } from './PrettyCode';
import { getPaymentConfirmation, PaymentRequestCreatedTransfers } from '../api';

type ConfirmPaymentProps = {
  requestId: string;
};

export const ConfirmPayment: React.FC<ConfirmPaymentProps> = ({ requestId }) => {
  const [paymentConfirmation, setPaymentConfirmation] = useState<
    PaymentRequestCreatedTransfers[] | undefined
  >(undefined);

  useEffect(() => {
    const getConfirmation = async (requestId: string) => {
      const transferStatus = await getPaymentConfirmation(requestId);
      setPaymentConfirmation(transferStatus.paymentRequestCreatedTransfers);
    };
    getConfirmation(requestId);
  }, [requestId]);

  return (
    <>
      <Header />
      <div className="content">
        <h1 className="text-2xl">Payments Demo</h1>
        <div className="paper">
          <div className="display-flex">
            <div className="ml-16">
              <h2 className="text-xl">Payment status</h2>
              {!paymentConfirmation && <div>Fetching payment status ...</div>}
              {paymentConfirmation &&
                paymentConfirmation.map((status) => (
                  <div key={status.id}>
                    <PrettyCode code={JSON.stringify(status, null, 2)} className="mb-10" />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="walking-coin ma-auto mt-120 mb-80"></div>
      </div>
    </>
  );
};
