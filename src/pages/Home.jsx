import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";

export const HomePage = () => {
  return (
    <Stack spacing={2}>
      <Toolbar />
      <Typography variant="h5" component="h1">
        This pet project is a Kanban board with a user-friendly interface and
        responsive design, developed using the following technologies:
      </Typography>
      <List marker="disc">
        <Typography variant="h6" component="h2">
          Frontend:
        </Typography>
        <ListItem>
          <Typography>
            <Link href="https://react.dev/">React</Link>: Used for creating
            dynamic user interfaces and components.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <Link href="https://vitejs.dev/">Vite</Link>: Development and build
            tool that provides fast page loading and reloading.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <Link href="https://redux-toolkit.js.org/rtk-query/overview">
              RTK Query
            </Link>
            : State management library that offers an intuitive API and tools
            for working with data.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <Link href="https://reactrouter.com/en/main">React Router DOM</Link>
            : Used for navigation and routing within the application.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <Link href="https://mui.com/">MUI (Material-UI)</Link>: Component
            library that provides pre-styled interface elements for creating
            beautiful and responsive designs.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <Link href="https://dndkit.com/">Dnd kit</Link>: Library for
            implementing drag and drop functionality in React applications.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <Link href="https://eslint.org/">ESLint</Link>: Code static analysis
            tool used to detect and fix potential issues and errors in
            JavaScript code.
          </Typography>
        </ListItem>
      </List>
      <List>
        <Typography variant="h6" component="h2">
          Backend:
        </Typography>
        <ListItem>
          <Typography>
            <Link href="https://nodejs.org/">Node.js</Link>: Used as the runtime
            environment for the server-side of the project.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <Link href="https://expressjs.com/">Express</Link>: Framework for
            creating web applications on Node.js, providing simplicity and
            flexibility in server-side development.
          </Typography>
        </ListItem>
      </List>
    </Stack>
  );
};
