import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import servicesJson from '../data/servicesData.json'; // Adjust the path according to your project structure
import softImage from '../Images/soft_home.jpg';
import pestHome from '../Images/pest_home.jpg';
//import weddingHome from '../Images/wedding_home.jpg';
import techHome from '../Images/tech_home.jpg';
import businessHome from '../Images/business_home.jpg';
import cleaningHome from '../Images/cleaning_home.jpg';
import Training from '../Images/train.jpg'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { animateTextWordByWord } from '../utils/titleAnimation';

gsap.registerPlugin(ScrollTrigger);

const imageMap = {
  softImage,
  pestHome,
//  weddingHome,
  techHome,
  cleaningHome,
  businessHome,
  Training
};

const Services = () => {
  const titleRef = useRef(null);


  useGSAP(() => {
    animateTextWordByWord(titleRef.current, {duration : 2});

}, []);

  return (
    <section className="py-12 bg-[#d0e3ff] " id='services'>
      <style>
        {`
          .image-hover {
            filter: brightness(0.8) saturate(0%) invert(30%); /* Grayish tone for the image */
            transition: filter 0.3s ease-in-out;
          }
          .hover-effect:hover .image-hover {
            filter: brightness(0) saturate(100%) invert(33%) sepia(87%) saturate(614%) hue-rotate(182deg) brightness(95%) contrast(92%);
          }
          .hover-effect:hover h3 {
            color: #21506E; /* Change text color on hover */
          }
          .hover-effect:hover {
            color: #21506E; /* Change the color of all text within the div on hover */
          }
        `}
      </style>
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-cyan-900 font-semibold tracking-wide uppercase">Our Services</h2>
          <p ref={titleRef} className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-cyan-900 sm:text-4xl">
            What We Offer
          </p>
        </div>

        <div className="mt-10 flex md:flex-row flex-col justify-around items-center ">
          {servicesJson.services.map((service) => (
           <Link 
              to={`/service/${service.id}`} // Adjust the path as needed for your routing
              key={service.id}
              className="p-8 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover-effect"
            >
              {service.images[0] && (
                <img
                  src={imageMap[service.images[0]]}
                  alt={service.name}
                  className="object-cover w-[8rem] h-[8rem] rounded-md image-hover"
                />
              )}
              <h3 className="mt-4 text-md font-medium text-center text-[#6B7280]">{service.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
