import React from 'react';
import CompanyImage from '../Images/company1.jpg'; 

const MainContent = () => {
  return (
    <div className="w-full bg-gray-100 pt-24">
      {/* Main Section */}
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/2 bg-[#21506E] text-white flex items-center justify-center p-8 style={{ height: '500px' }}">
          <div className="text-center md:text-left max-w-lg">
            <h1 className="text-4xl font-bold">The Unity Wave</h1>
            <p className="text-lg mt-4">
              Empowering Growth Through Secure and Efficient Facility Management. Our dedicated team of over 10,000 professionals ensures safe, comfortable, and functional spaces, enabling you to focus on value creation without risk or inefficiency.
            </p>
            <button className="mt-8 px-6 py-3 bg-white text-[#21506E] rounded-lg hover:bg-gray-200 transition cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2" style={{ height: '500px' }}>
          <img src={CompanyImage} alt="Company Working" className="w-full h-full object-cover" />
        </div>
      </div>
      
      {/* Our Vision, Our Mission, and Center Text Section */}
      <div className="flex flex-col md:flex-row w-full h-auto bg-white py-16">
        <div className="w-full md:w-1/2 h-auto flex items-center justify-center p-8">
          <div className="text-center md:text-left max-w-lg">
            <h2 className="text-2xl font-bold text-[#21506E]">Our Vision</h2>
            <p className="text-[#6B7280] mt-4">
              Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival in the mid-20th century as placeholder text in printing and design.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-auto flex items-center justify-center p-8">
          <div className="text-center md:text-left max-w-lg">
            <h2 className="text-2xl font-bold text-[#21506E]">Our Mission</h2>
            <p className="text-[#6B7280] mt-4">
              Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival in the mid-20th century as placeholder text in printing and design.
            </p>
          </div>
        </div>
      </div>
    <div className="w-full h-auto bg-white flex items-center justify-center py-10">
      <h2 className="text-4xl font-bold text-[#21506E]">Doing things differently</h2>
    </div>
  </div>
  );
};

export default MainContent;





