import React from 'react';
import { FC } from 'react';
import { Modal, ModalProps, ModalHeaderProps } from 'react-bootstrap';

type Props = {
  title: string;
  headerProps: ModalHeaderProps;
  closeTitle?: string;
  submitTitle?: string;
};

export const AddModal: FC<Props & ModalProps> = ({
  title,
  closeTitle,
  submitTitle,
  headerProps,
  children,
  ...modalProps
}) => {
  return (
    <Modal centered animation={false} {...modalProps}>
      <Modal.Header closeButton {...headerProps}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={modalProps.onHide}>
          {closeTitle || 'close'}
        </button>
        <button form="add-form" type="submit">
          {submitTitle || 'Add'}
        </button>
      </Modal.Footer>
    </Modal>
  );
};
