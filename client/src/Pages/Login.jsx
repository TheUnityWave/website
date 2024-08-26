import React, { useState } from 'react';
import axios from 'axios';
import logo from '../Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();

    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const onChange = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://website-server-p59e.onrender.com/api/login', {
                email: loginCredentials.email,
                password: loginCredentials.password
            });

            const { authToken, isAdmin } = response.data;
            if (authToken) {
                // Save the authToken
                localStorage.setItem('token', authToken);
                // console.log(authToken);
                // console.log(localStorage.getItem('token'));

                // Navigate based on isAdmin value
                if (isAdmin) {
                    toast.success("Logged In Successfully");
                    navigate("/admin/job-applications");
                } else {
                    toast.success("Logged In Successfully");
                    navigate("/employee/verification");
                }
            } else {
                toast.error("Invalid Credentials");
                setErrorMessage("Invalid credentials, please try again.");
            }
        } catch (error) {
            toast.error("Invalid Credentials");
            console.error("Error during login:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center w-full bg-gray-100 h-screen">
            <div className="relative w-full max-w-xl bg-[#d0e3ff] rounded-lg p-6">
                <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl text-[#21506E] font-bold text-center mb-6">The Unity Wave</h2>
                <h3 className="text-3xl text-[#21506E] font-bold text-center mb-6">Log In</h3>
                <p className="mt-6 text-center text-gray-600">
                    For new employees, please log in using the credentials that were sent to your email.
                </p>
                {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
                <form onSubmit={handleLoginSubmit}>
                    <div className="mb-4 ">
                        <input
                            type="email"
                            name="email"
                            className="w-full bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Enter Email"
                            value={loginCredentials.email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            className="w-full bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Enter Password"
                            value={loginCredentials.password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-10">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-[#21506E] rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
