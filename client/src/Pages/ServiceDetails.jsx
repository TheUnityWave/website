import React from 'react';
import { useParams } from 'react-router-dom';
import servicesJson from '../data/servicesData.json';
import ServiceCard from '../Components/ServiceCard';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const service = servicesJson.services.find(s => s.id === serviceId);

  if (!service) {
    return <div className="text-center text-2xl mt-10">Service not found</div>;
  }

  return (
    <div className="w-[100vw] h-auto">
      <h1 className="text-4xl font-bold text-center bg-primary py-6 text-white">{service.name}</h1>
      <div className="">
        {service.subservices.map((subservice, index) => (
          <ServiceCard
            key={index}
            name={subservice.name}
            description={subservice.description}
            image={subservice.image}
            isEven={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceDetails;