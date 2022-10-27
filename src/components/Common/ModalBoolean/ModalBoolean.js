import React from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

import "./ModalBoolean.scss";

export function ModalBoolean(props) {
  const {
    show,
    size,
    title,
    children,
    onRefetch,
    onClose,
    deleteFunction,
    data,
  } = props;

  const onCancel = () => {
    onClose();
  };

  const onConfirm = async () => {
    try {
      await deleteFunction(data.id);
      onRefetch();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal className="modal-boolean" open={show} onClose={onClose} size={size}>
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={onCancel}>
          <Icon name="remove" /> No eliminar
        </Button>
        <Button color="red" onClick={onConfirm}>
          <Icon name="checkmark" /> Si, deseo eliminar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

ModalBoolean.defaultProps = {
  size: "tiny",
};
