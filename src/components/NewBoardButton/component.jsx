import { useState } from "react";
import { ButtonComponent } from "../Button/component";
import { ModalComponent } from "../Modal/component";
import { NewBoardFormContainer } from "../NewBoardForm/container";

export const NewBoardButton = () => {
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
        text="create new board"
        startIcon={true}
        paddingLeft={2.5}
      />
      <ModalComponent open={open} title="Add new board" onClose={handleClose}>
        <NewBoardFormContainer onSubmit={handleSubmit} />
      </ModalComponent>
    </>
  );
};
