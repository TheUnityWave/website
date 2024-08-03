// WhyUsDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import whyUsData from '../data/whyUs.json';

const WhyUsDetail = () => {
  const { id } = useParams();
  const reason = whyUsData.find((r) => r.id === parseInt(id));

  if (!reason) {
    return <div>Reason not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img src={reason.image} alt={reason.title} className="w-full h-64 object-cover"/>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">{reason.title}</h2>
          <p className="text-gray-700 text-base">{reason.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WhyUsDetail;
