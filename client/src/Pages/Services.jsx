import React from 'react';
import { Link } from 'react-router-dom';
import servicesJson from '../data/servicesData.json'; // Adjust the path according to your project structure

const Services = () => {
  const firstRowServices = servicesJson.services.slice(0, 3);
  const secondRowServices = servicesJson.services.slice(3);

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-cyan-900 font-semibold tracking-wide uppercase">Our Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-cyan-900 sm:text-4xl">
            What We Offer
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {firstRowServices.map((service, index) => (
            <div key={service.id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
              <p className="mt-2 text-base text-gray-600">{service.description}</p>
              <Link to={`/service/${service.id}`}>
                <button className='btn bg-primary w-36 text-left text-white px-4 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer mt-4'>
                  Know More
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {secondRowServices.map((service, index) => (
            <div key={service.id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
              <p className="mt-2 text-base text-gray-600">{service.description}</p>
              <Link to={`/service/${service.id}`}>
                <button className='btn bg-primary w-36 text-left text-white px-4 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer mt-4'>
                  Know More
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
