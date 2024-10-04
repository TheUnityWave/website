import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Industry = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const isFormValid = formData.fullName && formData.email && formData.phone;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
            toast.error("Please fill out all the fields");
            return;
        }

        setIsLoading(true);
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }


        try {
            const response = await axios.post('http://localhost:5000/api/demoform', data, {
                headers: { 'Content-Type': 'application/json' },
            });
            toast.success("Application Sent Successfully");
            setIsLoading(false);
            setFormData({
                fullName: '',
                email: '',
                phone: ''
            });
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error("Please try again later");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-start pb-24 bg-[rgba(1,35,46,1)] min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start md:space-x-12 px-4 md:mt-24">
                {/* Left Section */}
                <div className="text-white flex-1 text-center md:text-left md:w-2/3 md:pr-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 pt-6 md:pt-0">
                        Interview & Communication <span className="text-[#57B9F8]">Training Program</span>
                    </h1>
                    <p className="text-lg my-8">
                        Empowering the Future Workforce Through Hands-On Industrial Training!
                    </p>

                    {/* Flex Box */}
                    <div className="flex w-full md:w-[700px] h-auto md:h-[100px] rounded-lg bg-[#000F13] p-4 md:flex md:w-[700px]">
                        {/* First Box */}
                        <div className="relative flex-1 flex items-center justify-center text-slate-300">
                            <p className='text-center'>
                                <span className='text-[#57B9F8] text-lg md:text-2xl text-bold'>40%</span><br /> Get Hiked
                            </p>
                            <div className="absolute right-0 top-1/4 h-1/2 w-[1px] bg-gray-300 hidden md:block"></div>
                        </div>

                        {/* Second Box */}
                        <div className="relative flex-1 flex items-center justify-center text-slate-300">
                            <p className='text-center'>
                                <span className='text-[#57B9F8] text-lg md:text-2xl text-bold'>7 LPA</span><br /> Average Package
                            </p>
                            <div className="absolute right-0 top-1/4 h-1/2 w-[1px] bg-gray-300 hidden md:block"></div>
                        </div>

                        {/* Third Box */}
                        <div className="relative flex-1 flex items-center justify-center text-slate-300">
                            <p className='text-center'>
                                <span className='text-[#57B9F8] text-lg md:text-2xl text-bold'>15 LPA</span><br />Highest CTC
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Section (Form) */}
                <div className="bg-gray-100 p-8 rounded-xl shadow-md max-w-xs w-full mt-8 md:mt-0 md:ml-auto">
                    <h2 className="text-xl font-bold text-center mb-4">
                        Book a Live Demo Class!<br />
                        <span className="text-[#4297CD]">For FREE</span>
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
                                placeholder="Full Name*"

                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
                                placeholder="Email*"

                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
                                placeholder="Phone No*"

                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-1/2 bg-[#57B9F8] text-white py-2 rounded-l transition duration-200 mx-auto block ${isFormValid ? 'hover:bg-[#4297CD]' : 'opacity-50 cursor-not-allowed'
                                }`}
                            disabled={!isFormValid || isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Register Now'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Industry;
