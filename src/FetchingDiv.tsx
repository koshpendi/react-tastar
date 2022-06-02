import React, { FC, ReactNode } from 'react';

export const FetchingDiv: FC<{ isLoading: boolean; spinner?: ReactNode }> = ({
  children,
  spinner,
  isLoading,
}) => {
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
              background: 'rgb(255 255 255 / 80%)',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            {spinner || 'loading...'}
          </div>
        )}
      </div>
    </>
  );
};
