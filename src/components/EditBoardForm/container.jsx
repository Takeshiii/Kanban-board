import { useEffect, useReducer, useState } from "react";
import {
  useGetBoardQuery,
  useGetBoardsQuery,
  useUpdateBoardMutation,
} from "../../redux/services/boards";
import {
  useAddColumnMutation,
  useGetColumnsQuery,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} from "../../redux/services/columns";
import { EditBoardFormComponent } from "./component";

const initialState = {
  boardName: "",
  columnNames: [""],
};

const columnReducer = (state, action) => {
  switch (action.type) {
    case "setBoardName":
      return {
        ...state,
        boardName: action.payload,
      };
    case "setColumnNames":
      return {
        ...state,
        columnNames: action.payload,
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

export const EditBoardFormContainer = ({ boardId, onSubmit }) => {
  const [state, dispatch] = useReducer(columnReducer, initialState);
  const [nameError, setNameError] = useState(null);
  const { data: boards } = useGetBoardsQuery();
  const { data: board } = useGetBoardQuery(boardId);
  const { data: columns } = useGetColumnsQuery(boardId);
  const [updateBoard] = useUpdateBoardMutation();
  const [addColumn] = useAddColumnMutation();
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();

  const boardName = state.boardName;
  const columnNames = state.columnNames;

  useEffect(() => {
    if (board && columns) {
      dispatch({ type: "setBoardName", payload: board.name });
      dispatch({
        type: "setColumnNames",
        payload: columns.map((column) => column.name),
      });
    }
  }, [board, columns]);

  const handleSetBoardName = (event) => {
    dispatch({ type: "setBoardName", payload: event.target.value });
  };

  const handleSetColumnName = (event, index) => {
    dispatch({
      type: "setColumnName",
      payload: { index, value: event.target.value },
    });
  };

  const handleSetNewColumn = () => dispatch({ type: "setNewColumn" });

  const handleDeleteColumn = (index) => {
    dispatch({ type: "deleteColumn", payload: index });
  };

  const validateNames = () => {
    const boardExists = boards.some(
      (board) =>
        board.name.toLowerCase() === boardName.toLowerCase() &&
        board.id !== boardId
    );

    if (boardExists) {
      setNameError(`Board with name «${boardName}» already exist`);
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

  const handleChangeBoard = async () => {
    const isValid = validateNames();
    if (!isValid) return;

    if (board.name !== boardName) {
      await updateBoard({
        boardId,
        updateBoard: { name: boardName },
      });
    }

    const currentColumns = [...columns];

    await Promise.all(
      columnNames.map(async (newColumnName, index) => {
        const currentColumn = currentColumns[index];

        if (!currentColumn) {
          await addColumn({
            boardId: boardId,
            newColumn: {
              name: newColumnName,
              cards: [],
            },
          });
        } else if (currentColumn.name !== newColumnName) {
          await updateColumn({
            columnId: currentColumn.id,
            updateColumn: {
              name: newColumnName,
            },
          });
        }
      })
    );

    const columnsToDelete = currentColumns.slice(columnNames.length);

    await Promise.all(
      columnsToDelete.map(async (column) => {
        await deleteColumn(column.id);
      })
    );

    onSubmit();
  };

  return (
    <EditBoardFormComponent
      boardId={boardId}
      nameError={nameError}
      boardName={boardName}
      columnNames={columnNames}
      handleSetBoardName={handleSetBoardName}
      handleSetColumnName={handleSetColumnName}
      handleDeleteColumn={handleDeleteColumn}
      handleSetNewColumn={handleSetNewColumn}
      handleChangeBoard={handleChangeBoard}
    />
  );
};
