import { useState } from "react";
import { useDeleteBoardMutation } from "../../redux/services/boards";
import { useDeleteCardMutation } from "../../redux/services/cards";
import { DeleteAlertComponent } from "./component";

export const DeleteAlertContainer = ({ boardId, cardId, entity }) => {
  const [open, setOpen] = useState(false);
  const [deleteBoard] = useDeleteBoardMutation();
  const [deleteCard] = useDeleteCardMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (entity === "board") {
      deleteBoard(boardId);
    } else if (entity === "card") {
      deleteCard(cardId);
    }
    handleClose();
  };

  return (
    <DeleteAlertComponent
      open={open}
      entity={entity}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      handleDelete={handleDelete}
    />
  );
};
