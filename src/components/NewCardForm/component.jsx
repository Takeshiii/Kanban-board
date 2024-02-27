import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ButtonComponent } from "../Button/component";
import { InfoAlertComponent } from "../InfoAlert/component";

export const NewCardFormComponent = ({
  nameError,
  cardName,
  handleSetCardName,
  taskNames,
  handleSetTaskName,
  handleDeleteTask,
  handleSetNewTask,
  handleCreateNewCard,
}) => {
  return (
    <Stack spacing={1}>
      {nameError && <InfoAlertComponent message={nameError} />}
      <Typography>Card</Typography>
      <OutlinedInput
        placeholder="Card name"
        value={cardName}
        onChange={handleSetCardName}
      />
      <Typography>Tasks</Typography>
      {taskNames.map((taskName, index) => (
        <Box key={index}>
          <OutlinedInput
            placeholder="Task name"
            value={taskName}
            onChange={(event) => handleSetTaskName(event, index)}
          />
          <ButtonComponent
            type="delete"
            onClick={() => handleDeleteTask(index)}
          />
        </Box>
      ))}
      <ButtonComponent
        type="add"
        text="add new task"
        onClick={handleSetNewTask}
        startIcon={true}
      />
      <ButtonComponent
        type="add"
        text="create new card"
        onClick={handleCreateNewCard}
      />
    </Stack>
  );
};
