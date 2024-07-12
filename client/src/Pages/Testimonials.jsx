import React from 'react';
import TestimonialCard from '../Components/TestimonialCard';
import logo from "../Images/logo.png";
import testimonialsData from '../data/testimonials.json';

import './testimonials.css';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';

export default function Testimonials() {
    const options = {
        loop: true,
        center: true,
        margin: 0,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        animateOut: 'slideOutUp',
        nav: false,
        responsive: {
            0: {
                items: 1,
                
            },
            680: {
                items: 2,
                
                loop: false,
            },
            1000: {
                items: 3,
                
            },
        },
    };

    return (
        <div className="testimonials bg-primary md:p-24 py-24 flex flex-col gap-12">
            <h1 className='text-4xl text-white w-full text-left font-bold'> What They Say About Us... </h1>
            <div className=' flex justify-center items-center gap-5'>
                <OwlCarousel className="owl-theme" {...options}>
                    {testimonialsData.testimonials.map((item) => (
                        <TestimonialCard
                            key={item.id}
                            name={item.name}
                            title={item.title}
                            review={item.review}
                            // imageUrl={require(`../Images/${item.image}`).default} // Use dynamic import for images
                            imageUrl={logo} // Use dynamic import for images
                        />
                    ))}
                </OwlCarousel>
            </div>
        </div>
    );
}
