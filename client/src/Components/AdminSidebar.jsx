import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="bg-cyan-900 text-white w-96 min-h-screen p-4">
            <nav className="flex flex-col space-y-4">
                    <NavLink to="/admin/job-applications" className="hover:bg-cyan-700 p-2 rounded">
                        Job Applications
                    </NavLink>
                    <NavLink to="/admin/employees" className="hover:bg-cyan-700 p-2 rounded">
                        Employees
                    </NavLink>
                    <NavLink to="/admin/getintouch" className="hover:bg-cyan-700 p-2 rounded">
                        Get in Touch Requests
                    </NavLink>
            </nav>
        </div>
    );
};

export default AdminSidebar;
