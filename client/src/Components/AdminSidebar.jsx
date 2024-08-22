import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChangePasswordModal from './ChangePasswordModal';
import { ClipboardList, BookUser, PhoneCall, Tag, LucidePodcast } from 'lucide-react';

const AdminSidebar = () => {
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
            <div className="hidden lg:flex bg-cyan-900 text-white w-[20vw] p-4 flex-col justify-between">
                <nav className="flex flex-col space-y-4 text-sm">
                    <NavLink to="/admin/job-applications" className="hover:bg-cyan-700 p-2 rounded">
                        Job Applications
                    </NavLink>
                    <NavLink to="/admin/employees" className="hover:bg-cyan-700 p-2 rounded">
                        Employees Detail
                    </NavLink>
                    <NavLink to="/admin/getintouch" className="hover:bg-cyan-700 p-2 rounded">
                        Get in Touch Requests
                    </NavLink>
                    <NavLink to="/admin/tickets" className="hover:bg-cyan-700 p-2 rounded">
                        Raise Ticket
                    </NavLink>
                    <NavLink to="/admin/postajob" className="hover:bg-cyan-700 p-2 rounded">
                        Post A Job
                    </NavLink>
                </nav>
                <nav className='flex flex-col text-sm'>
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
            <div className="lg:hidden z-20 fixed bottom-0 left-0 right-0 bg-cyan-900 text-white flex justify-evenly p-2">
                <NavLink to="/admin/job-applications" className="hover:bg-cyan-700 w-20 p-1 rounded text-center">
                    <ClipboardList className='m-auto' />
                    Job Applications
                </NavLink>
                <NavLink to="/admin/employees" className="hover:bg-cyan-700 w-20 p-1 rounded text-center">
                    <BookUser className='m-auto' />
                    Employees Detail
                </NavLink>
                <NavLink to="/admin/getintouch" className="hover:bg-cyan-700 w-20 p-1 rounded text-center">
                    <PhoneCall className='m-auto' />
                    Get in Touch Requests
                </NavLink>
                <NavLink to="/admin/tickets" className="hover:bg-cyan-700 w-20 p-1 rounded">
                    <Tag className='m-auto' />
                    Raise Ticket
                </NavLink>
                <NavLink to="/admin/postajob" className="hover:bg-cyan-700 w-20 p-1 rounded">
                    <LucidePodcast className='m-auto' />
                        Post A Job
                </NavLink>
            </div>
        </>
    );
};

export default AdminSidebar;
