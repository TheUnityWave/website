import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import logo from '../Images/logo 1.png';
import verificationImage from '../Images/Video Id Verification.png';
import trainingImage from '../Images/Training.png';
import issueResolveImage from '../Images/Strike.png';
import techImage from '../Images/Circuit.png';

import { animateTextWordByWord } from '../utils/titleAnimation';

gsap.registerPlugin(ScrollTrigger);

const contentList = [
    {
        title: "Background Verification",
        content: "Taken from the Latin words 'dolorem ipsum', which translates to 'pain itself', Lorem Ipsum text saw a revival.",
        className: "w-full md:w-1/4 border-2 border-stone-400 p-9 relative mb-16 md:mb-0",
        image: verificationImage
    },
    {
        title: "Online Training",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        className: "w-full md:w-1/4 border-2 border-stone-400 p-9 relative",
        image: trainingImage
    },
    {
        title: "Issue Resolve",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        className: "w-full md:w-1/4 border-2 border-stone-400 p-9 mt-16 relative",
        image: issueResolveImage
    },
    {
        title: "Tech Driven Solution",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        className: "w-full md:w-1/4 border-2 border-stone-400 p-9 mt-16 relative",
        image: techImage
    }
];

const WhyUs = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const contentRefs = useRef([]);

    

    useGSAP(() => {
        animateTextWordByWord(titleRef.current);
        // Content animations
        contentRefs.current.forEach((content, index) => {
            gsap.fromTo(content,
                { opacity: 0 },
                { 
                    opacity: 1, 
                    duration: 0.5,
                    delay:0.5,
                    scrollTrigger: {
                        trigger: content,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

    }, []);


    return (
        <div ref={containerRef} className="relative bg-primary overflow-hidden w-[100vw] text-white md:py-32 py-16 px-16">
            <div className="absolute bottom-0 right-0 opacity-30 md:w-1/3">
                <img src={logo} alt="Logo" className="contrast-200" />
            </div>
            <div className="flex flex-wrap justify-evenly gap-8">
                <div ref={titleRef} className="md:w-1/5 text-3xl leading-normal font-bold md:text-left text-center ">
                    Why are we client's favourite FM company?
                </div>
                {contentList.map((item, index) => (
                    <div 
                        key={index}
                        className={item.className}
                    >
                        <div className="absolute px-2 -top-8 left-8 bg-primary">
                            <img src={item.image} alt="Border" className="w-16 h-16" />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="text-xl font-semibold">{item.title}</div>
                        </div>
                        <p 
                            ref={el => contentRefs.current[index] = el}
                            className="text-gray-300 text-sm"
                        >
                            {item.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyUs;