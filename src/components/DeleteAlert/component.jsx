import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ButtonComponent } from "../Button/component";

export const DeleteAlertComponent = ({
  open,
  entity,
  handleClickOpen,
  handleClose,
  handleDelete,
}) => {
  return (
    <>
      <ButtonComponent onClick={handleClickOpen} type="delete" />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Please confirm the deletion of this{" "}
          {entity === "board" ? "board" : "card"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
