import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    toast.success("Logged out successfully");
}


  return (
    <div className="bg-cyan-900 text-white w-64 p-4 flex flex-col justify-between">
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
      <NavLink onClick={handleLogout} to="/" className="hover:bg-cyan-700 p-2 rounded mt-4">
        Logout
      </NavLink>
    </div>
  );
};

export default Sidebar;
