import React from 'react';

const ServiceCard = ({ name, description, image, isEven }) => {
  return (

    <div className={`service-card py-12 px-12 gap-8 flex min-h-[50vh] w-full md:flex-row flex-col justify-around items-center ${isEven ? 'bg-[#d0e3ff] text-primary md:flex-row' : 'bg-white text-primary md:flex-row-reverse'} `}>
      <div className="service-content flex-1 text-black flex flex-col justify-around items-start gap-3">
        <h1 className={`service-title text-3xl font-semibold capitalize `}> {name} </h1>
        <p dangerouslySetInnerHTML={{ __html: description }} className="service-description text-sm"/> 
      </div>
      <div className='image min-h-32 max-h-auto flex-1'>
        <img src={image} alt="" style={{ textIndent: '-9999px' }}
          onError={(e) => { e.target.style.display = 'none' }} className='image min-h-32 max-h-auto w-full' />
      </div>
    </div>


  );
};

export default ServiceCard;