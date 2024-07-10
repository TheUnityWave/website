import React from 'react';
import Soft1Img from '../Images/soft1.png'
import Soft2Img from '../Images/soft2.png'
import Dummy from '../Images/dummy.png'
import Sample from '../Images/Image.png'
import Clean from '../Images/clean.png'
import Business from '../Images/business.png'

const ServicesPage = () => {
  const servicesJson = {
    "services": [
      {
        "id": 1,
        "name": "Soft Services",
        "items": [
          "House Keeping",
          "Pantry valet",
          "Office boy",
          "Driver",
          "Mailroom boy"
        ],
        "images": [
            Soft1Img,
          Soft2Img
        ]
      },
      {
        "id": 2,
        "name": "Specialization Services",
        "items": [
          "Façade cleaning through manpower",
          "Façade cleaning through drones",
          "Marble and granite polishing",
          "Carpet and upholstery cleaning",
          "Waste Management"
        ],
        "images": [
            Dummy,
            Clean
        ]
      },
      {
        "id": 3,
        "name": "Business Support",
        "items": [
          "Business support manpower",
          "Corporate wellness",
          "Organizing Functions"
        ],
        "images": [
         Business
        ]
      },
      {
        "id": 4,
        "name": "Technical Services",
        "items": [
          "ETP",
          "WTP",
          "HVAC",
          "Plumbing",
          "Power Supply"
        ],
        "images": [
            Sample,Dummy
        ]
      }
    ]
  };

  return (
    <div className="services-page">
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
              {service.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
            <button className='btn bg-primary w-36 text-left text-white px-4 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer'>
              Know More
            </button>
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

export default ServicesPage;