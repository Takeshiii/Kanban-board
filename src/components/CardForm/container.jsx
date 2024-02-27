import { useState } from "react";
import {
  useGetColumnsQuery,
  useUpdateColumnMutation,
} from "../../redux/services/columns";
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../redux/services/tasks";
import { CardFormComponent } from "./component";

export const CardFormContainer = ({ cardId, boardId, columnId, onSubmit }) => {
  const [selectedColumn, setSelectedColumn] = useState(columnId);
  const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery(cardId);
  const { data: columns, isLoading: columnsLoading } =
    useGetColumnsQuery(boardId);
  const [updateTaskMutation] = useUpdateTaskMutation();
  const [updateColumnMutation] = useUpdateColumnMutation();

  const doneTasks = () => tasks.filter((task) => task.done).length;

  const handleCheckboxChange = (taskId, done) => {
    updateTaskMutation({
      taskId,
      updateTask: { done: !done },
    });
  };

  const handleChangeColumn = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleChange = async () => {
    const currentColumn = columns.find((column) =>
      column.cards.includes(cardId)
    );
    const newColumn = columns.find((column) => column.id === selectedColumn);

    const updatedCurrentColumn = {
      ...currentColumn,
      cards: currentColumn.cards.filter((id) => id !== cardId),
    };

    const updatedNewColumn = {
      ...newColumn,
      cards: [...newColumn.cards, cardId],
    };

    await Promise.all([
      updateColumnMutation({
        columnId: currentColumn.id,
        updateColumn: updatedCurrentColumn,
      }),
      updateColumnMutation({
        columnId: selectedColumn,
        updateColumn: updatedNewColumn,
      }),
    ]);

    onSubmit();
  };

  return (
    <CardFormComponent
      cardId={cardId}
      columnId={columnId}
      tasksLoading={tasksLoading}
      columnsLoading={columnsLoading}
      doneTasks={doneTasks}
      tasks={tasks}
      handleCheckboxChange={handleCheckboxChange}
      selectedColumn={selectedColumn}
      handleChangeColumn={handleChangeColumn}
      columns={columns}
      handleChange={handleChange}
    />
  );
};
