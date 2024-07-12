import React, { useState, useEffect } from 'react';
import TestimonialCard from '../Components/TestimonialCard';
import logo from "../Images/logo.png";
import testimonialsData from '../data/testimonials.json';

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.testimonials.length);
        }, 4000); // Adjust interval time as needed (2000ms for each card + 2000ms at center)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='bg-primary p-24 py-32 flex justify-center items-center gap-5 overflow-hidden'>
            {testimonialsData.testimonials.map((item, index) => {
                const isCenter = index === currentIndex;
                const cardClasses = `
                    w-full
                    sm:w-1/2
                    md:w-1/3
                    lg:w-1/4
                    transform
                    transition-transform
                    ${isCenter ? 'translate-x-0' : 'translate-x-full sm:translate-x-1/4 md:translate-x-1/6 lg:translate-x-1/8'}
                    ${isCenter ? 'opacity-100' : 'opacity-0'}
                    ${isCenter ? 'relative' : 'absolute'}
                `;
                return (
                    <div key={index} className={cardClasses}>
                        <TestimonialCard
                            name={item.name}
                            title={item.title}
                            review={item.review}
                            imageUrl={logo} // Replace with actual imageUrl logic
                        />
                    </div>
                );
            })}
        </div>
    );
}
