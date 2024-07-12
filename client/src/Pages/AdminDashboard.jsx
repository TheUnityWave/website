import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import JobApplications from './JobApplications';
import Employees from './Employees';

const AdminDashboard = () => {

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-64 p-4 w-full">
                <Routes>
                    <Route path="job-applications" element={<JobApplications />} />
                    <Route path="employees" element={<Employees />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
