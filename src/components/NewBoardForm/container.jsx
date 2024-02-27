import { useReducer, useState } from "react";
import {
  useAddBoardMutation,
  useGetBoardsQuery,
} from "../../redux/services/boards";
import { useAddColumnMutation } from "../../redux/services/columns";
import { NewBoardFormComponent } from "./component";

const initialState = {
  boardName: "",
  columnNames: [""],
};

const boardReducer = (state, action) => {
  switch (action.type) {
    case "setBoardName":
      return {
        ...state,
        boardName: action.payload,
      };
    case "setNewColumn":
      return {
        ...state,
        columnNames: [...state.columnNames, ""],
      };
    case "setColumnName": {
      const { index, value } = action.payload;
      const updatedColumnNames = [...state.columnNames];
      updatedColumnNames[index] = value;
      return {
        ...state,
        columnNames: updatedColumnNames,
      };
    }
    case "deleteColumn": {
      const index = action.payload;
      const updatedColumnNames = state.columnNames.filter(
        (columnName, i) => i !== index
      );
      return {
        ...state,
        columnNames: updatedColumnNames,
      };
    }
    default:
      return state;
  }
};

export const NewBoardFormContainer = ({ onSubmit }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const [nameError, setNameError] = useState(null);
  const { data: boards } = useGetBoardsQuery();
  const [addBoard] = useAddBoardMutation();
  const [addColumn] = useAddColumnMutation();

  const boardName = state.boardName;
  const columnNames = state.columnNames;

  const handleSetBoardName = (event) => {
    dispatch({ type: "setBoardName", payload: event.target.value });
  };

  const handleSetNewColumn = () => dispatch({ type: "setNewColumn" });

  const handleSetColumnName = (event, index) => {
    dispatch({
      type: "setColumnName",
      payload: { index, value: event.target.value },
    });
  };

  const handleDeleteColumn = (index) =>
    dispatch({ type: "deleteColumn", payload: index });

  const validateNames = () => {
    const boardExists = boards.some(
      (board) => board.name.toLowerCase() === boardName.toLowerCase()
    );

    if (boardExists) {
      setNameError(
        `Board with name «${boardName.toLowerCase()}» already exist`
      );
      return false;
    }

    if (!boardName.trim()) {
      setNameError("Board cannot be without name");
      return false;
    }

    const duplicateNames =
      columnNames.length !==
      new Set(columnNames.map((name) => name.toLowerCase())).size;

    if (duplicateNames) {
      setNameError("Columns cannot have the same name");
      return false;
    }

    const emptyNames = columnNames.some((name) => !name.trim());

    if (emptyNames) {
      setNameError("Column cannot have an empty name");
      return false;
    }

    setNameError(null);
    return true;
  };

  const handleCreateNewBoard = async () => {
    const isValid = validateNames();
    if (!isValid) return;

    const newBoard = {
      name: boardName,
      columns: [],
    };

    const boardResult = await addBoard(newBoard);

    const boardId = boardResult.data.id;

    let createdColumns = [];

    for (const columnName of columnNames) {
      const newColumn = await addColumn({
        boardId: boardId,
        newColumn: {
          name: columnName,
          cards: [],
        },
      });
      createdColumns = [...createdColumns, newColumn.data];
    }
    onSubmit();
    return createdColumns;
  };

  return (
    <NewBoardFormComponent
      nameError={nameError}
      boardName={boardName}
      columnNames={columnNames}
      handleSetBoardName={handleSetBoardName}
      handleSetColumnName={handleSetColumnName}
      handleDeleteColumn={handleDeleteColumn}
      handleSetNewColumn={handleSetNewColumn}
      handleCreateNewBoard={handleCreateNewBoard}
    />
  );
};
