import React, { FC, ReactNode } from 'react';
import { Spinner } from 'react-bootstrap';

type Props = {
  isLoading: boolean;
  backgroundColor?: string;
  spinner?: ReactNode;
};

export const AbsoulteSpinner: FC<Props> = ({ children, spinner, isLoading, backgroundColor }) => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        {children}
        {isLoading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              backgroundColor: `${backgroundColor || '#ecececc2'}`,
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            {spinner || <Spinner animation="border" />}
          </div>
        )}
      </div>
    </>
  );
};
