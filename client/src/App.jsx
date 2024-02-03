import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CreateTask from "./pages/CreateTask";
import DeleteTask from "./pages/DeleteTask";
import Navigation from "./pages/Navigation";
import UpdateTask from "./pages/UpdateTask";
import ViewAllTask from "./pages/ViewAllTask";
import ViewTask from "./pages/ViewTask";
import Wallet from "./pages/Wallet";
import "./App.css";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <Wallet /> }]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
