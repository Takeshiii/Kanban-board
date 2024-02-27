import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import { NewBoardButton } from "../NewBoardButton/component";

const drawerWidth = 240;

export const SideBarComponent = ({
  open,
  selectedBoard,
  setSelectedBoard,
  boards,
  isLoading,
  isFetching,
}) => {
  if (isLoading || isFetching) {
    return <Skeleton variant="rectangular" />;
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}>
      <Toolbar />
      <List>
        {boards.map((board) => (
          <ListItem key={board.id} disablePadding>
            <ListItemButton
              component={Link}
              to={`/boards/${board.id}`}
              selected={selectedBoard === board.id}
              onClick={() => setSelectedBoard(board.id)}>
              <ListItemIcon>
                <SpaceDashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                sx={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}>
                {board.name}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <NewBoardButton />
    </Drawer>
  );
};
