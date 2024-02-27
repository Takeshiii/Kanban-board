import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout/component";
import { ErrorPage } from "../pages/Error";
import { HomePage } from "../pages/Home";
import { MainContent } from "../components/MainBoard/component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "boards/:boardId", element: <MainContent /> },
    ],
  },
]);
