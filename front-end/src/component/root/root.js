import React from "react";
import NavBar from "../navigation/navigation";
import { Outlet } from "react-router-dom"; 

function Root() {
  return (
    <div>
      <NavBar />
      <Outlet /> {/* Add the Outlet to render child routes */}
    </div>
  );
}

export default Root;
