import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChangePasswordModal from './ChangePasswordModal';
import { CircleCheckBig, BookOpenText, MessageSquareDot } from 'lucide-react';

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
    <>
      <div className="hidden lg:flex bg-cyan-900 text-white w-64 p-4 flex-col justify-between">
        <nav className="flex flex-col space-y-4">
          <NavLink to="/employee/verification" className="hover:bg-cyan-700 p-2 rounded">
            Verification
          </NavLink>
          <NavLink to="/employee/training" className="hover:bg-cyan-700 p-2 rounded">
            Trainings
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

      {/* Bottom Navbar for Small Devices */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-cyan-900 text-white flex justify-around p-2">
        <NavLink to="/employee/verification" className="hover:bg-cyan-700 p-2 rounded">
          <CircleCheckBig className='m-auto' />
          Verification
        </NavLink>
        <NavLink to="/employee/training" className="hover:bg-cyan-700 p-2 rounded">
          <BookOpenText className='m-auto' />
          Trainings
        </NavLink>
        <NavLink to="/employee/raise-ticket" className="hover:bg-cyan-700 p-2 rounded">
          <MessageSquareDot className='m-auto' />
          Raise Ticket
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
