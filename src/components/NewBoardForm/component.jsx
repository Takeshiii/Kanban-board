import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ButtonComponent } from "../Button/component";
import { InfoAlertComponent } from "../InfoAlert/component";

export const NewBoardFormComponent = ({
  nameError,
  boardName,
  handleSetBoardName,
  columnNames,
  handleSetColumnName,
  handleDeleteColumn,
  handleSetNewColumn,
  handleCreateNewBoard,
}) => {
  return (
    <Stack spacing={1}>
      {nameError && <InfoAlertComponent message={nameError} />}
      <Typography>Board</Typography>
      <OutlinedInput
        placeholder="Board name"
        value={boardName}
        onChange={handleSetBoardName}
      />
      <Typography>Columns</Typography>
      {columnNames.map((columnName, index) => (
        <Box key={index}>
          <OutlinedInput
            placeholder="Column name"
            value={columnName}
            onChange={(event) => handleSetColumnName(event, index)}
          />
          <ButtonComponent
            type="delete"
            onClick={() => handleDeleteColumn(index)}
          />
        </Box>
      ))}
      <ButtonComponent
        type="add"
        text="add new column"
        onClick={handleSetNewColumn}
        startIcon={true}
      />
      <ButtonComponent
        type="add"
        text="create new board"
        onClick={handleCreateNewBoard}
      />
    </Stack>
  );
};
