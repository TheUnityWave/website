import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import JobApplications from './JobApplications';
import Employees from './Employees';
import GetInTouchAdmin from './GetInTouchAdmin';

const AdminDashboard = () => {

    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="p-4 w-full">
                <Routes>
                    <Route path="job-applications" element={<JobApplications />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="getintouch" element={<GetInTouchAdmin />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
