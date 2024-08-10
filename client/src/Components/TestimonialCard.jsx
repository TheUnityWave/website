import React from 'react'


const TestimonialCard = ({ name, title, review, imageUrl }) => {
    return (
      <div className="item mx-auto w-[18rem] max-h-max flex flex-col justify-center items-center bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="flex justify-center mb-4">
            <img 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow shadow-primary"
              src={imageUrl} 
              alt={title} 
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-primary">{name}</h2>
            <p className="text-gray-600">{title}</p>
          </div>
        </div>
        <div className="px-6 pb-4">
          <p className="text-gray-700 text-center italic text-sm">
            "{review}"
          </p>
        </div>
      </div>
    );
  };
  
  export default TestimonialCard;
