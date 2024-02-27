import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { ModalComponent } from "../Modal/component";
import { CardFormContainer } from "../CardForm/container";

export const CardComponent = ({ columnId, boardId, cardName, cardId }) => {
  const [openCardId, setOpenCardId] = useState(null);
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: cardId });

  const handleOpen = (cardId) => setOpenCardId(cardId);
  const handleClose = () => setOpenCardId(null);
  const handleSubmit = () => {
    handleClose();
  };

  const style = {
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
  };

  return (
    <Card
      sx={{ boxShadow: "none", touchAction: "none" }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}>
      <CardActionArea onClick={() => handleOpen(cardId)}>
        <CardContent>
          <Typography
            sx={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}>
            {cardName}
          </Typography>
        </CardContent>
      </CardActionArea>
      {openCardId === cardId && (
        <ModalComponent open={true} title={cardName} onClose={handleClose}>
          <CardFormContainer
            boardId={boardId}
            columnId={columnId}
            cardId={cardId}
            onSubmit={handleSubmit}
          />
        </ModalComponent>
      )}
    </Card>
  );
};
