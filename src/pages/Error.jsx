import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ButtonComponent } from "../components/Button/component";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography variant="h3">Oops!</Typography>
        <Typography variant="h6">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="h6">
          {error.statusText || error.message}
        </Typography>
      </Box>
      <ButtonComponent component={Link} to="/" type="add" text="take me home" />
    </Container>
  );
};
