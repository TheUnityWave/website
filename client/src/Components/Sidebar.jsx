import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-cyan-900 text-white w-64 min-h-screen p-4">
      <nav className="flex flex-col space-y-4">
        <NavLink to="/employee/verification" className="hover:bg-cyan-700 p-2 rounded">
          Verification
        </NavLink>
        <NavLink to="/employee/training" className="hover:bg-cyan-700 p-2 rounded">
          Trainings
        </NavLink>
        <NavLink to="/employee/raise-ticket" className="hover:bg-cyan-700 p-2 rounded">
          Raise Ticket
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
