import { useReducer, useState } from "react";
import {
  useAddCardMutation,
  useGetCardsQuery,
} from "../../redux/services/cards";
import { useAddTaskMutation } from "../../redux/services/tasks";
import { NewCardFormComponent } from "./component";

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

export const NewCardFormContainer = ({ columnId, onSubmit }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState);
  const [nameError, setNameError] = useState(null);
  const { data: cards } = useGetCardsQuery(columnId);
  const [addCard] = useAddCardMutation();
  const [addTask] = useAddTaskMutation();

  const cardName = state.cardName;
  const taskNames = state.taskNames;

  const handleSetCardName = (event) => {
    dispatch({ type: "setCardName", payload: event.target.value });
  };

  const handleSetNewTask = () => dispatch({ type: "setNewTask" });

  const handleSetTaskName = (event, index) => {
    dispatch({
      type: "setTaskName",
      payload: { index, value: event.target.value },
    });
  };

  const handleDeleteTask = (index) =>
    dispatch({ type: "deleteTask", payload: index });

  const validateNames = () => {
    const cardExists = cards.some(
      (card) => card.name.toLowerCase() === cardName.toLowerCase()
    );

    if (cardExists) {
      setNameError(`Card with name «${cardName.toLowerCase()}» already exist`);
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

  const handleCreateNewCard = async () => {
    const isValid = validateNames();
    if (!isValid) return;

    const newCard = {
      name: cardName,
      tasks: [],
    };

    const cardResult = await addCard({ columnId, newCard });

    const cardId = cardResult.data.id;

    let createdTasks = [];

    for (const taskName of taskNames) {
      const newCard = await addTask({
        cardId: cardId,
        newTask: {
          name: taskName,
        },
      });
      createdTasks = [...createdTasks, newCard.data];
    }
    onSubmit();
    return createdTasks;
  };

  return (
    <NewCardFormComponent
      nameError={nameError}
      cardName={cardName}
      taskNames={taskNames}
      handleSetCardName={handleSetCardName}
      handleSetTaskName={handleSetTaskName}
      handleDeleteTask={handleDeleteTask}
      handleSetNewTask={handleSetNewTask}
      handleCreateNewCard={handleCreateNewCard}
    />
  );
};
