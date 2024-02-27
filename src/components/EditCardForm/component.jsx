import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { InfoAlertComponent } from "../InfoAlert/component";
import { DeleteAlertContainer } from "../DeleteAlert/container";
import { ButtonComponent } from "../Button/component";

export const EditCardFormComponent = ({
  cardId,
  nameError,
  cardName,
  handleSetCardName,
  taskNames,
  handleSetTaskName,
  handleDeleteTask,
  handleSetNewTask,
  handleUpdateCard,
}) => {
  return (
    <Stack spacing={1}>
      {nameError && <InfoAlertComponent message={nameError} />}
      <Typography>Card</Typography>
      <Box>
        <OutlinedInput
          placeholder="Card name"
          value={cardName}
          onChange={handleSetCardName}
        />
        <DeleteAlertContainer cardId={cardId} entity="card" />
      </Box>
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
        text="save changes"
        onClick={handleUpdateCard}
      />
    </Stack>
  );
};
