import React, { useEffect } from 'react';
import { FC } from 'react';
import {
  Modal,
  ModalProps,
  ModalHeaderProps,
  Button,
  Spinner,
} from 'react-bootstrap';
import styled from 'styled-components';

let form_id = '';

type Props = {
  title: string;
  submitTitle: string;
  formId?: string;
  isLoading?: boolean;
  headerProps?: ModalHeaderProps;
  closeTitle?: string;
};

type SubmitBtnProps = Pick<Props, 'submitTitle' | 'isLoading'>;

const StyledBtn = styled(Button)<Pick<SubmitBtnProps, 'isLoading'>>`
  flex-grow: ${({ isLoading }) => (isLoading ? 0.03 : 0)};
  transition: flex-grow 0.1s ease-in-out;
`;

const SubmitBtn: FC<SubmitBtnProps> = ({ isLoading, submitTitle }) => {
  return (
    <StyledBtn
      form={form_id}
      type="submit"
      disabled={isLoading}
      isLoading={isLoading}
    >
      <div className="d-flex align-items-center justify-content-between">
        {submitTitle}
        {isLoading && <Spinner size="sm" animation="border" />}
      </div>
    </StyledBtn>
  );
};

export const Form: FC = ({ children }) => {
  return <form id={form_id}>{children}</form>;
};

const _Modal: FC<Props & ModalProps> = ({
  title,
  formId,
  closeTitle,
  submitTitle,
  headerProps,
  children,
  isLoading,
  ...modalProps
}) => {
  useEffect(() => {
    form_id = formId || 'form_modal';
  }, [formId]);

  return (
    <Modal {...modalProps}>
      <Modal.Header closeButton {...headerProps}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="outline-primary" onClick={modalProps.onHide}>
          {closeTitle || 'Cancel'}
        </Button>
        <SubmitBtn isLoading={isLoading} submitTitle={submitTitle} />
      </Modal.Footer>
    </Modal>
  );
};

export const FormModal = Object.assign(_Modal, {
  Form,
});
