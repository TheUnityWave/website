import React from 'react';
import careersImage from '../Images/career.png';

const Careers = () => {
  return (
    <>
      <div className="pt-10">
        <img src={careersImage} alt="Careers" className="w-full h-96 object-cover" />
      </div>

      <div className="flex justify-center items-center min-h-screen py-12">
        <div className="w-full max-w-3xl px-8 pt-6 pb-8 mb-4">
          <h2 className="text-5xl font-bold text-center mb-4 text-cyan-900">Careers</h2>
          <p className="text-2xl text-center text-cyan-900 mb-6 font-semibold">
            We are always on the lookout for talented folks to join our team. Together, let's shape your future.
          </p>
          <form>
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
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="option1">
                Experience*
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="option1"
              >
                <option>--Please choose an option--</option>
                <option value="option1">0-1 years</option>
                <option value="option2">1-3 years</option>
                <option value="option3">3+ years</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="option2">
                Job Category*
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="option2"
              >
                <option>--Please choose an option--</option>
                <option value="option1">Housekeeping</option>
                <option value="option2">Driver</option>
                <option value="option3">Plumber</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileUpload">
                Upload File*
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fileUpload"
                type="file"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="w-full bg-cyan-900  text-white font-semibold py-3 px-6 mt-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Careers;
