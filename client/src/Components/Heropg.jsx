import React from 'react';
import CompanyImage from '../Images/company1.jpg'; // Make sure to replace with the actual path to your image

const MainContent = () => {
  return (
    <div className="p-4 bg-gray-100 pt-32"> {/* Added pt-32 to avoid overlap with the fixed navbar */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          <img src={CompanyImage} alt="Company Working" className="w-full h-96 object-cover mb-8" />
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900">The Unity Wave</h1>
            <p className="text-lg text-gray-700 mt-4">
              Empowering Growth Through Secure and Efficient Facility Management. Our dedicated team of over 10,000 professionals ensure safe, comfortable, and functional spaces, enabling you to focus on value creation without risk or inefficiency.
            </p>
            <button className="mt-8 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition">
              Learn More
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              <p className="text-gray-700 mt-4">
                Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival in the mid-20th century as placeholder text in printing and design.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-700 mt-4">
                Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival in the mid-20th century as placeholder text in printing and design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
