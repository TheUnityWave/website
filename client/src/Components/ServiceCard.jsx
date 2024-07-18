import React from 'react';

const ServiceCard = ({ name, description, image, isEven }) => {
  return (
    
      <div className={`service-card py-12 px-6 gap-4 flex min-h-[100vh] w-full md:flex-row flex-col justify-around items-center ${isEven ? 'bg-primary text-white md:flex-row' : 'bg-white text-primary md:flex-row-reverse'} `}>
        <div className="service-content flex flex-col justify-around items-start">
            <h1 className={`service-title text-3xl font-semibold `}> {name} </h1>
            <p className="service-description"> {description} </p>
        </div>
        <div className='image min-h-32'>
            <img src={image} alt={name} className='image min-h-32' />
        </div>
    </div>


  );
};

export default ServiceCard;