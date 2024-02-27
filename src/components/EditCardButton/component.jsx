import { useState } from "react";
import { ButtonComponent } from "../Button/component";
import { ModalComponent } from "../Modal/component";
import { EditCardFormContainer } from "../EditCardForm/container";

export const EditCardButton = ({ cardId, columnId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    handleClose();
  };

  return (
    <>
      <ButtonComponent type="add" onClick={handleOpen} text="Edit Card" />
      <ModalComponent open={open} title="Edit Card" onClose={handleClose}>
        <EditCardFormContainer
          cardId={cardId}
          columnId={columnId}
          onSubmit={handleSubmit}
        />
      </ModalComponent>
    </>
  );
};
