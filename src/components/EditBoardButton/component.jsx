import { useState } from "react";
import { ButtonComponent } from "../Button/component";
import { ModalComponent } from "../Modal/component";
import { EditBoardFormContainer } from "../EditBoardForm/container";

export const EditBoardButton = ({ boardId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    handleClose();
  };

  return (
    <>
      <ButtonComponent type="add" onClick={handleOpen} text="Edit Board" />
      <ModalComponent open={open} title="Edit Board" onClose={handleClose}>
        <EditBoardFormContainer boardId={boardId} onSubmit={handleSubmit} />
      </ModalComponent>
    </>
  );
};
