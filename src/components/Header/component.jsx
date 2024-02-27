import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const Header = ({ open, handleDrawerOpen, toggleTheme }) => {
  return (
    <AppBar>
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="h1">
            Kanban board
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}>
          <LightModeIcon />
          <Switch onClick={toggleTheme} />
          <DarkModeIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
