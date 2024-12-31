import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import React from "react";

import Root from "./component/root/root.js";
import HomePage from './page/home/homePage.js'
import SystemInfo from "./page/systemInfo/systemInfoPage.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}> 
      <Route index element={<HomePage />} />
      <Route path="/system-info" element={<SystemInfo />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
