import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="bg-white shadow-md h-screen overflow-y-auto fixed top-24 left-0 bottom-0 w-64">
            <ul className="space-y-2 p-4">
                <li>
                    <Link to="/admin/job-applications" className="block p-2 text-gray-800 hover:bg-gray-200 rounded">
                        Job Applications
                    </Link>
                </li>
                <li>
                    <Link to="/admin/employees" className="block p-2 text-gray-800 hover:bg-gray-200 rounded">
                        Employees
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
