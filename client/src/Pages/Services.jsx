// Services.js
import React from 'react';
import { Link } from 'react-router-dom';
import servicesJson from '../data/servicesData.json';

const Services = () => {
  return (
    <div className="services-page" id='services'>
      {servicesJson.services.map((service, index) => (
        <div 
          key={service.id} 
          className={`services w-full flex flex-col gap-6 justify-around items-center px-8 py-12 ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          <div className='content text-primary flex flex-col gap-8'>
            <h1 className='text-4xl font-semibold'>{service.name}</h1>
            <ul>
              {service.subservices.map((item, itemIndex) => (
                <li key={itemIndex}>{item.name}</li>
              ))}
            </ul>
            <Link to={`/service/${service.id}`}>
              <button className='btn bg-primary w-36 text-left text-white px-4 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer'>
                Know More
              </button>
            </Link>
          </div>
          <div className="images flex md:flex-row flex-col justify-center items-center gap-4">
            {service.images.map((item, itemIndex) => (
              <img key={itemIndex} src={item} alt={`${service.name} image ${itemIndex + 1}`} className="max-w-full h-auto rounded-md" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
