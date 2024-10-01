import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Careers = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    experience: '',
    jobCategory: '',
    resumeFile: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setFormData(prevState => ({
        ...prevState,
        jobCategory: decodeURIComponent(category)
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resumeFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
       if (!formData.firstName || !formData.lastName || !formData.mobileNumber || !formData.email || !formData.experience) {
      toast.error("Please fill out all the fields");
      return;
    }
    setIsLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post('https://website-server-six.vercel.app/api/careers', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // console.log(response.data);
      toast.success("Application Sent Successfully");
      setIsLoading(false);

      // Reset form or redirect user
      setFormData({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        experience: '',
        jobCategory: '',
        resumeFile: null,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error("Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen py-12 bg-white">
        <div className="w-full max-w-3xl px-4 pt-6 pb-8 mb-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-cyan-900">Apply for {formData.jobCategory}</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name*
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="Jane"
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name*
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Smitherton"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                Mobile Number*
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mobileNumber"
                type="text"
                placeholder="Enter Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email*
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="email@janesfakedomain.net"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="option1">
                Experience*
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="experience"
                onChange={handleChange}
                value={formData.experience}
              >
                <option>--Please choose an option--</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3+ years">3+ years</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobCategory">
                Job Category*
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                id="jobCategory"
                type="text"
                placeholder="Job Category"
                value={formData.jobCategory}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileUpload">
                Upload File*
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fileUpload"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="w-full bg-cyan-900  text-white font-semibold py-3 px-6 mt-4 rounded focus:outline-none focus:shadow-outline"
                type="submit" disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Careers;
