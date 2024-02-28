import { useEffect, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { CardComponent } from "../Card/component";
import { NewCardButton } from "../NewCardButton/component";
import { useGetCardsQuery } from "../../redux/services/cards";

export const Column = ({ columnName, columnId, boardId }) => {
  const { data: cards, isLoading, isFetching } = useGetCardsQuery(columnId);
  const [dataCards, setDataCards] = useState(cards);
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: columnId });

  useEffect(() => {
    if (!isFetching && cards) {
      setDataCards(cards);
    }
  }, [cards, isFetching]);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
    keyboardCodes: {
      start: ["Space"],
      cancel: ["Escape"],
      end: ["Space"],
    },
  });

  const sensors = useSensors(keyboardSensor, pointerSensor, touchSensor);

  if (isLoading || isFetching) {
    return <Skeleton variant="rectangular" />;
  }

  const style = {
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
  };

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) {
      return;
    }

    setDataCards((cards) => {
      const oldIndex = cards.findIndex((card) => card.id === active.id);
      const newIndex = cards.findIndex((card) => card.id === over.id);
      return arrayMove(cards, oldIndex, newIndex);
    });
  };

  return (
    <Paper ref={setNodeRef} style={style}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 2,
          paddingTop: 2,
        }}>
        <Typography
          variant="h6"
          sx={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}>
          {columnName}
        </Typography>
        <IconButton {...attributes} {...listeners} disableRipple>
          <DragIndicatorIcon />
        </IconButton>
      </Box>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={onDragEnd}>
        <SortableContext items={cards} strategy={verticalListSortingStrategy}>
          {dataCards &&
            dataCards.map((card) => (
              <CardComponent
                key={card.id}
                cardName={card.name}
                boardId={boardId}
                columnId={columnId}
                cardId={card.id}
              />
            ))}
        </SortableContext>
      </DndContext>
      <NewCardButton columnId={columnId} />
    </Paper>
  );
};
