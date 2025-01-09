import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import React from "react";

import Root from "./component/root/root.js";
import HomePage from "./page/home.js";
import SystemInfoPage from "./page/systemInfo.js";
import SignUpPage from "./page/signup.js";
import LogInPage from "./page/login.js";
import ProfilePage from "./page/profile.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}> 
      <Route index element={<HomePage />} />
      <Route path="/system-info" element={<SystemInfoPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/log-in" element={<LogInPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
