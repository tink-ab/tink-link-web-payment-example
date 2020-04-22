import React from 'react';
import Header from './Header';
import { PrettyCode } from './PrettyCode';

type ErrorProps = {
  error: string;
  errorMessage?: string;
};

export const Error = ({ error, errorMessage }: ErrorProps) => {
  return (
    <>
      <Header />
      <div className="content">
        <h1 className="text-2xl">Error</h1>
        <div className="paper">
          <div className="ml-16 mb-40">
            <h2 className="text-xl">Tink Link returned with an error</h2>
            <PrettyCode code={error} className="mt-20" />
            {errorMessage && (
              <>
                <div className="mt-20">and message</div>
                <PrettyCode code={errorMessage} className="mt-20" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
