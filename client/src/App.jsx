import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CreateTask from "./pages/CreateTask";
import DeleteTask from "./pages/DeleteTask";
import Navigation from "./pages/Navigation";
import UpdateTask from "./pages/UpdateTask";
import ViewAllTasks from "./pages/ViewAllTasks";
import ViewTask from "./pages/ViewTask";
import Wallet from "./pages/Wallet";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Wallet /> },
    { path: "/view-all-tasks", element: <ViewAllTasks /> },
    { path: "/create-task", element: <CreateTask /> },
    { path: "/view-task", element: <ViewTask /> },
    { path: "/update-task", element: <UpdateTask /> },
    { path: "/delete-task", element: <DeleteTask /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
