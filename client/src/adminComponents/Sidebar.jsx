// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Assuming you are using react-router for navigation

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-900 text-white flex-shrink-0 p-4">
      <h2 className="text-2xl font-semibold mb-10 ">Admin Portal</h2>
      <nav className="space-y-2">
        <NavLink
          to="/admin/home"
          className={({ isActive }) =>
            `block py-2 px-4 ${isActive ? 'bg-blue-800' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/admin/addTrain"
          className={({ isActive }) =>
            `block py-2 px-4 ${isActive ? 'bg-blue-800' : ''}`
          }
        >
          Add Train
        </NavLink>
        <NavLink
          to="/admin/editTrain"
          className={({ isActive }) =>
            `block py-2 px-4 ${isActive ? 'bg-blue-800' : ''}`
          }
        >
          Edit Train
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `block py-2 px-4 ${isActive ? 'bg-blue-800' : ''}`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
