import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../../contexts/Theme";
import { lightTheme, darkTheme } from "../../assets/theme/theme";
import { ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "../Header/component";
import { SideBarContainer } from "../Sidebar/container";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export const Layout = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          toggleTheme={toggleTheme}
        />
        <SideBarContainer open={open} />
        <Main open={open}>
          <Outlet />
        </Main>
      </Box>
    </ThemeProvider>
  );
};
