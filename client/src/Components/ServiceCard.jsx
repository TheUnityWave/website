import React from 'react';
const ServiceCard = ({ name, description, image, industry = [], isEven }) => {
  return (

    <div className={`service-card py-12 px-12 gap-8 flex min-h-[70vh] w-full md:flex-row flex-col justify-around items-center ${isEven ? 'bg-[#d0e3ff] text-primary md:flex-row' : 'bg-white text-primary md:flex-row-reverse'} `}>
      <div className="service-content flex-1 text-black flex flex-col justify-around items-start gap-3">
        <h1 className={`service-title text-3xl font-semibold capitalize `}> {name} </h1>
        <p dangerouslySetInnerHTML={{ __html: description }} className="service-description text-sm" />


        {industry.length > 0 && (
          <div className="industry-icons md:mt-12">
            <p className='font-bold'>
              {(name === "Advantages" || name==="nil") ? "" : "Industries we serve:"}
            </p>
            <div className="flex flex-wrap justify-evenly md:justify-start md:items-start w-full gap-y-4 md:gap-y-12">
              {industry.map(({ name: industryName, iconPath }, index) => (
                <div key={index} className="industry-item flex flex-col justify-center items-center w-1/4 sm:w-1/5 px-2">
                  <img
                    src={iconPath}
                    alt={`${industryName} icon`}
                    className="industry-icon md:w-20 md:h-20 w-12 h-12 object-contain"
                  />
                  <div className="industry-name md:text-[0.75rem] text-[0.65rem] text-center mt-2 text-wrap">{industryName}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      <div className='image min-h-32 max-h-auto flex-1'>
        <img src={image} alt="" style={{ textIndent: '-9999px' }}
          onError={(e) => { e.target.style.display = 'none' }} className='image min-h-32 max-h-auto w-full' />
      </div>
    </div>


  );
};

export default ServiceCard;