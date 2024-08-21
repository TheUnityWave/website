import React, { useRef } from 'react';
import TestimonialCard from '../Components/TestimonialCard';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { animateTextWordByWord } from '../utils/titleAnimation';


import testimonialsData from '../data/testimonials.json';

import './testimonials.css';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';

gsap.registerPlugin(ScrollTrigger);
export default function Testimonials() {
    const options = {
        loop: true,
        center: true,
        margin: 35,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
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

    const titleRef = useRef(null);

    useGSAP(() => {
        animateTextWordByWord(titleRef.current);

    }, []);

    return (
        <div className="testimonials bg-[#d0e3ff] w-[100vw] md:px-24 px-8 py-8 flex flex-col gap-4">
            <h1 ref={titleRef} className='text-3xl text-primary w-full text-left font-bold'> What They Say About Us... </h1>
            <div className=' flex justify-center items-center gap-5'>
                <OwlCarousel className="owl-theme" {...options}>
                    {testimonialsData.testimonials.map((item) => (
                        <TestimonialCard
                            key={item.id}
                            name={item.name}
                            title={item.title}
                            review={item.review}
                            // imageUrl={require(`../Images/${item.image}`).default} // Use dynamic import for images
                            imageUrl={item.image} // Use dynamic import for images
                        />
                    ))}
                </OwlCarousel>
            </div>
        </div>
    );
}
