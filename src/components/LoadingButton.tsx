import React from 'react';
import { FC } from 'react';
import { Button, ButtonProps, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
  isLoading: boolean;
};

const StyledBtn = styled(Button)<Props>`
  flex-grow: ${({ isLoading }) => (isLoading ? 0.03 : 0)};
  transition: flex-grow 0.1s ease-in-out;
`;

export const LoadingButton: FC<Props & ButtonProps> = ({
  isLoading,
  children,
  ...btnProps
}) => {
  return (
    <StyledBtn {...btnProps} disabled={isLoading} isLoading={isLoading}>
      <div className="d-flex align-items-center justify-content-between">
        {children}
        {isLoading && <Spinner size="sm" animation="border" />}
      </div>
    </StyledBtn>
  );
};