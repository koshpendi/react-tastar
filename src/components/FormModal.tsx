import React, { useEffect } from 'react';
import { FC } from 'react';
import { Modal, ModalProps, ModalHeaderProps, Button } from 'react-bootstrap';
import { LoadingButton } from './LoadingButton';

let form_id = '';

type Props = {
  title: string;
  submitTitle: string;
  formId: string;
  isLoading: boolean;
  headerProps?: ModalHeaderProps;
  closeTitle?: string;
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
        <LoadingButton
          form={form_id}
          type="submit"
          isLoading={isLoading}
        >
          {submitTitle}
        </LoadingButton>
      </Modal.Footer>
    </Modal>
  );
};

export const FormModal = Object.assign(_Modal, {
  Form,
});
