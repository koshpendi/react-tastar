import React, { useEffect } from 'react';
import { FC } from 'react';
import {
  Modal,
  ModalProps,
  ModalHeaderProps,
  Button,
  Spinner,
} from 'react-bootstrap';

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

const SubmitBtn: FC<SubmitBtnProps> = ({ isLoading, submitTitle }) => {
  return (
    <Button form={form_id} type="submit" disabled={isLoading}>
      <div>
        {isLoading && <Spinner size="sm" animation="border" className="me-2" />}
        {submitTitle}
      </div>
    </Button>
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
  Form: Form,
});
