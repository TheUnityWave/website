import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import JobApplications from './JobApplications';
import Employees from './Employees';
import GetInTouchAdmin from './GetInTouchAdmin';

const AdminDashboard = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const userData = await getCurrentUser(token);
                setUser(userData);
            } catch (err) {
                setError(err.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        if (!loading && user && !user.isAdmin) {
            navigate("/");
        }
    }, [loading, user, navigate]);

    async function getCurrentUser(token) {
        try {
            const response = await fetch('http://localhost:5000/api/employee/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch user data');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
