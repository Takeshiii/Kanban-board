import { useEffect, useReducer, useState } from "react";
import {
  useGetCardQuery,
  useGetCardsQuery,
  useUpdateCardMutation,
} from "../../redux/services/cards";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../redux/services/tasks";
import { EditCardFormComponent } from "./component";

const initialState = {
  cardName: "",
  taskNames: [""],
};

const cardReducer = (state, action) => {
  switch (action.type) {
    case "setCardName":
      return {
        ...state,
        cardName: action.payload,
      };
    case "setTaskNames":
      return {
        ...state,
        taskNames: action.payload,
      };
    case "setNewTask":
      return {
        ...state,
        taskNames: [...state.taskNames, ""],
      };
    case "setTaskName": {
      const { index, value } = action.payload;
      const updatedTaskNames = [...state.taskNames];
      updatedTaskNames[index] = value;
      return {
        ...state,
        taskNames: updatedTaskNames,
      };
    }
    case "deleteTask": {
      const index = action.payload;
      const updatedTaskNames = state.taskNames.filter(
        (taskName, i) => i !== index
      );
      return {
        ...state,
        taskNames: updatedTaskNames,
      };
    }
    default:
      return state;
  }
};

export const EditCardFormContainer = ({ cardId, columnId, onSubmit }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState);
  const [nameError, setNameError] = useState(null);
  const { data: cards } = useGetCardsQuery(columnId);
  const { data: card } = useGetCardQuery(cardId);
  const { data: tasks } = useGetTasksQuery(cardId);
  const [updateCard] = useUpdateCardMutation();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const cardName = state.cardName;
  const taskNames = state.taskNames;

  useEffect(() => {
    if (card && tasks) {
      dispatch({ type: "setCardName", payload: card.name });
      dispatch({
        type: "setTaskNames",
        payload: tasks.map((task) => task.name),
      });
    }
  }, [card, tasks]);

  const handleSetCardName = (event) => {
    dispatch({ type: "setCardName", payload: event.target.value });
  };

  const handleSetTaskName = (event, index) => {
    dispatch({
      type: "setTaskName",
      payload: { index, value: event.target.value },
    });
  };

  const handleSetNewTask = () => dispatch({ type: "setNewTask" });

  const handleDeleteTask = (index) => {
    dispatch({ type: "deleteTask", payload: index });
  };

  const validateNames = () => {
    const cardExists = cards.some(
      (card) =>
        card.name.toLowerCase() === cardName.toLowerCase() && card.id !== cardId
    );

    if (cardExists) {
      setNameError(`Board with name «${cardName}» already exist`);
      return false;
    }

    if (!cardName.trim()) {
      setNameError("Card cannot be without name");
      return false;
    }

    const duplicateNames =
      taskNames.length !==
      new Set(taskNames.map((name) => name.toLowerCase())).size;

    if (duplicateNames) {
      setNameError("Tasks cannot have the same name");
      return false;
    }

    const emptyNames = taskNames.some((name) => !name.trim());

    if (emptyNames) {
      setNameError("Task cannot have an empty name");
      return false;
    }

    setNameError(null);
    return true;
  };

  const handleUpdateCard = async () => {
    const isValid = validateNames();
    if (!isValid) return;

    if (card.name !== cardName) {
      await updateCard({
        cardId,
        updateCard: { name: cardName },
      });
    }

    const currentTasks = [...tasks];

    await Promise.all(
      taskNames.map(async (newTaskName, index) => {
        const currentTaks = currentTasks[index];

        if (!currentTaks) {
          await addTask({
            cardId: cardId,
            newTask: {
              name: newTaskName,
            },
          });
        } else if (currentTaks.name !== newTaskName) {
          await updateTask({
            taskId: currentTaks.id,
            updateTask: {
              name: newTaskName,
            },
          });
        }
      })
    );

    const tasksToDelete = currentTasks.slice(taskNames.length);

    await Promise.all(
      tasksToDelete.map(async (task) => {
        await deleteTask(task.id);
      })
    );

    onSubmit();
  };

  return (
    <EditCardFormComponent
      cardId={cardId}
      nameError={nameError}
      cardName={cardName}
      taskNames={taskNames}
      handleSetCardName={handleSetCardName}
      handleSetTaskName={handleSetTaskName}
      handleDeleteTask={handleDeleteTask}
      handleSetNewTask={handleSetNewTask}
      handleUpdateCard={handleUpdateCard}
    />
  );
};
