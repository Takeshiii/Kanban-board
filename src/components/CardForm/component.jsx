import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { ButtonComponent } from "../Button/component";
import { EditCardButton } from "../EditCardButton/component";

export const CardFormComponent = ({
  cardId,
  columnId,
  tasksLoading,
  columnsLoading,
  doneTasks,
  tasks,
  handleCheckboxChange,
  selectedColumn,
  handleChangeColumn,
  columns,
  handleChange,
}) => {
  if (tasksLoading || columnsLoading) {
    return <Skeleton variant="rectangular" />;
  }

  return (
    <Stack spacing={1}>
      <FormGroup>
        <Typography>
          {doneTasks()} out of {tasks.length}{" "}
          {tasks.length === 1 ? "task" : "tasks"} completed
        </Typography>
        {tasks.map((task) => (
          <FormControlLabel
            key={task.id}
            control={
              <Checkbox
                checked={task.done}
                onChange={() => handleCheckboxChange(task.id, task.done)}
              />
            }
            label={
              task.done === true ? (
                <Typography
                  sx={{
                    textDecoration: "line-through",
                  }}>
                  {task.name}
                </Typography>
              ) : (
                <Typography>{task.name}</Typography>
              )
            }
          />
        ))}
      </FormGroup>
      <Typography>Current status</Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select value={selectedColumn} onChange={handleChangeColumn}>
            {columns.map((column) => (
              <MenuItem key={column.id} value={column.id}>
                {column.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <EditCardButton cardId={cardId} columnId={columnId} />
      <ButtonComponent type="add" text="save changes" onClick={handleChange} />
    </Stack>
  );
};
