import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChangePasswordModal from './ChangePasswordModal';

const Sidebar = () => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    toast.success("Logged out successfully");
  }

  const toggleChangePassword = () => {
    setIsChangePasswordOpen(!isChangePasswordOpen);
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
      <nav className='flex flex-col'>
        <NavLink onClick={toggleChangePassword} className="hover:bg-cyan-700 p-2 rounded mt-4">
          Change Password
        </NavLink>
        <NavLink onClick={handleLogout} to="/" className="hover:bg-cyan-700 p-2 rounded mt-4">
          Logout
        </NavLink>
      </nav>
      {isChangePasswordOpen && (
        <ChangePasswordModal onClose={toggleChangePassword} />
      )}
    </div>
  );
};

export default Sidebar;
