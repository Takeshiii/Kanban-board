import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const InfoAlertComponent = ({ message }) => {
  return (
    <Alert severity="info">
      <AlertTitle>Info</AlertTitle>
      {message}
    </Alert>
  );
};
