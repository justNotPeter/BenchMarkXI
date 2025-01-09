import { NavLink, useNavigate } from "react-router-dom";
import React from 'react';

function NavBar({ userInfo, onLogOut }) {
  return (
    <nav className="bg-gray-800 p-4">  
      <ul className="flex space-x-4 max-w-6xl ml-72">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500 text-lg"
                : "text-gray-300 hover:text-white text-lg"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/system-info"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500 text-lg"
                : "text-gray-300 hover:text-white text-lg"
            }
          >
            System Information
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500 text-lg"
                : "text-gray-300 hover:text-white text-lg"
            }
          >
            Profile
          </NavLink>
        </li>
        
      </ul>
    </nav>
  );
}

export default NavBar;
