import React, { FC, ReactNode } from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

type Props = {
  isLoading: boolean;
  spinner?: ReactNode;
};

const AbsoulteDIV = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #ffffffd4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: relative;
`;

export const AbsoulteSpinner: FC<Props> = ({
  children,
  spinner,
  isLoading
}) => {
  if (!isLoading) {
    return <div>{children}</div>;
  }

  return (
    <Wrapper>
      {children}
      <AbsoulteDIV>{spinner || <Spinner animation="border" />}</AbsoulteDIV>
    </Wrapper>
  );
};
