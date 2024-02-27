import { useState } from "react";
import { ButtonComponent } from "../Button/component";
import { ModalComponent } from "../Modal/component";
import { NewCardFormContainer } from "../NewCardForm/container";

export const NewCardButton = ({ columnId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    handleClose();
  };

  return (
    <>
      <ButtonComponent
        type="add"
        onClick={handleOpen}
        text="add card"
        startIcon={true}
        paddingLeft={2}
        width="100%"
      />
      <ModalComponent open={open} title="Add new card" onClose={handleClose}>
        <NewCardFormContainer columnId={columnId} onSubmit={handleSubmit} />
      </ModalComponent>
    </>
  );
};
