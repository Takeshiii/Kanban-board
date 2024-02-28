import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBoardQuery } from "../../redux/services/boards";
import { useGetColumnsQuery } from "../../redux/services/columns";
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
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { Column } from "../Column/component";
import { EditBoardButton } from "../EditBoardButton/component";

export const MainContent = () => {
  const { boardId } = useParams();
  const { data: board, isLoading, isFetching } = useGetBoardQuery(boardId);
  const { data: columns } = useGetColumnsQuery(boardId);
  const [columnsData, setColumnsData] = useState(columns);

  useEffect(() => {
    if (!isFetching && columns) {
      setColumnsData(columns);
    }
  }, [columns, isFetching]);

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

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) {
      return;
    }

    setColumnsData((columns) => {
      const oldIndex = columns.findIndex((column) => column.id === active.id);
      const newIndex = columns.findIndex((column) => column.id === over.id);
      return arrayMove(columns, oldIndex, newIndex);
    });
  };

  return (
    <>
      <Toolbar />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          paddingBottom: 1,
        }}>
        <Typography variant="h6" component="h1">
          {board.name}
        </Typography>
        <EditBoardButton boardId={board.id} />
      </Stack>
      <Grid container spacing={2}>
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={onDragEnd}>
          <SortableContext
            items={columns}
            strategy={horizontalListSortingStrategy}>
            {columnsData &&
              columnsData.map((column) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={column.id}>
                  <Column
                    columnName={column.name}
                    boardId={board.id}
                    columnId={column.id}
                  />
                </Grid>
              ))}
          </SortableContext>
        </DndContext>
      </Grid>
    </>
  );
};
