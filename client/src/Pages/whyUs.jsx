// WhyUs.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import whyUsData from '../data/whyUs.json';

const WhyUs = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {whyUsData.map((reason) => (
          <div key={reason.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={reason.image} alt={reason.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{reason.title}</h2>
              <p className="text-gray-700 text-base">
                {reason.description.substring(0, 100)}... {/* Truncate description for preview */}
              </p>
              <Link to={`/whyus/${reason.id}`} className="text-cyan-900 font-bold hover:underline mt-4 block">
                Read More...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
