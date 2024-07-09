import React from 'react';
import CompanyImage from '../Images/company1.jpg'; // Ensure this path is correct

export const MainContent = () => {
  return (
    <div className="p-4 bg-gray-100 pt-32"> {/* Added pt-32 to avoid overlap with the fixed navbar */}
    <div className="max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row items-center relative z-10">
        <div className="w-full md:w-1/2 bg-[#21506E] text-white p-8 md:p-16 text-center md:text-left relative z-10">
          <h1 className="text-4xl font-bold">The Unity Wave</h1>
          <p className="text-lg mt-4">
            Empowering Growth Through Secure and Efficient Facility Management. Our dedicated team of over 10,000 professionals ensures safe, comfortable, and functional spaces, enabling you to focus on value creation without risk or inefficiency.
          </p>
          <button className="mt-8 px-6 py-3 bg-white text-[#21506E] rounded-lg hover:bg-gray-200 transition cursor-pointer">
            Learn More
          </button>
        </div>
        <div className="w-full md:w-1/2 relative">
          <img src={CompanyImage} alt="Company Working" className="w-full h-96 object-cover relative z-10" />
        </div>
      </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#21506E]">Our Vision</h2>
              <p className="text-[#6B7280] mt-4">
                Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival in the mid-20th century as placeholder text in printing and design.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#21506E]">Our Mission</h2>
              <p className="text-[#6B7280] mt-4">
                Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival in the mid-20th century as placeholder text in printing and design.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};



