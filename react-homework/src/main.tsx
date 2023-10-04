import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Homework4 from './Homeowrk4.tsx'
import Homework5 from './Homework5.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/homework4",
    element: <Homework4 />,
  },
  {
    path: "/homework5",
    element: <Homework5 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
