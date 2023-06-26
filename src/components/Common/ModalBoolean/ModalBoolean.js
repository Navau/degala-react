import React from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

import "./ModalBoolean.scss";

export function ModalBoolean(props) {
  const { show, size, title, children, onClose, actions } = props;

  const onCancel = () => {
    onClose();
  };

  return (
    <Modal
      className="modal-boolean"
      open={show}
      onClose={onClose}
      size={size}
      closeIcon
    >
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={actions?.cancel?.onClick || onCancel}>
          <Icon name={actions?.cancel?.iconName || "cancel"} />{" "}
          {actions?.cancel?.title || "No"}
        </Button>
        <Button color="red" onClick={actions?.ok?.onClick || onCancel}>
          <Icon name={actions?.ok?.iconName || "check"} />{" "}
          {actions?.ok?.title || "Si"}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

ModalBoolean.defaultProps = {
  size: "tiny",
};
