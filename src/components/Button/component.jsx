import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

export const ButtonComponent = ({
  type,
  text,
  onClick,
  startIcon,
  paddingLeft,
  width,
  ...props
}) => {
  if (type === "add") {
    return (
      <Button
        startIcon={startIcon && <AddIcon />}
        onClick={onClick}
        {...props}
        sx={{
          paddingLeft: paddingLeft,
          width: width,
          display: "flex",
          justifyContent: "flex-start",
        }}>
        {text}
      </Button>
    );
  }

  if (type === "delete") {
    return (
      <IconButton aria-label="delete" size="small" onClick={onClick}>
        <ClearIcon />
      </IconButton>
    );
  }
};
