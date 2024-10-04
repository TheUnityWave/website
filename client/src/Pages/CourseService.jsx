import React from "react";
import cv from '../Images/cv.png';
import exposure from '../Images/exposure.png';
import mock from '../Images/mock.png';
import linkedin from '../Images/linkedin.png';
import referrals from '../Images/referrals.png';
import handshake from '../Images/handshake.png';

const CareerServices = () => {
    const serviceData = {
        title: "Dedicated Career Services",
        cards: [
            {
                title: "CV Development",
                image: cv,
                description: "Earn a certification that adds value to your resume and increases employability."
            },
            {
                title: "Mock Interviews",
                image: mock,
                description: "Intensive mock interviews with real-time feedback to build confidence."
            },
            {
                title: "Linkedin Profile",
                image: linkedin,
                description: "Got noticed by companies through linkedin."
            }
        ]
    };

    const { title, cards } = serviceData;

    return (
        <div className="flex flex-col h-auto justify-center items-center bg-[#01232E] p-8 relative">
            <div className="w-full max-w-5xl flex flex-row items-start">
                <div className="w-1/6 hidden md:block">
                    <div className="absolute w-0.5 bg-yellow-500 ml-3" style={{ top: '0px', bottom: '0px' }}></div>
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-row items-start mb-8">
                        <h2 className="text-3xl text-white font-semibold text-left">{title}</h2>
                    </div>

                    {/* Cards Section below the heading */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {cards.map((card, index) => (
                            <div key={index} className="bg-[#000F13] p-6 rounded-lg shadow-md text-left">
                                <div className="pl-4 py-4">
                                    <img src={card.image} alt="" />
                                </div>
                                <h3 className="text-xl text-white font-semibold my-4">{card.title}</h3>
                                <p className="text-[rgba(255,255,255,0.7)]">{card.description}</p>
                            </div>
                        ))}
                    </div>
                    {/* Last Section for desktop view*/}
                    <div className="hidden md:flex justify-between items-start bg-[#000F13] pb-8 px-8 rounded h-80 w-full  max-w-[70%] lg:max-w-[1200px] mb-8 ">
                        <div className="pt-8">
                            <div className="pl-4 py-4"><img src={referrals} alt="" /></div>
                            <h3 className="text-xl text-white font-semibold my-4">Job Referrals</h3>
                            <span className="text-white">Access to alumni networks and potential job referrals.</span>
                        </div>
                        <img src={handshake} alt="photo" className="h-full"></img>
                        <div className=" pt-8">
                            <div className="pl-4 py-4 text-right"><img src={exposure} alt="" /></div>
                            <h3 className="text-xl text-white font-semibold my-4">Practical Exposure</h3>
                            <span className="text-white ">Practical exposure to industry-relevant tools
                                and techniques</span>
                        </div>
                    </div>
                    {/* Last Section for mobile view */}
                    <div className=" md:hidden grid grid-cols-1 gap-8 rounded w-full h-auto mb-8">
                        <div className="bg-[#000F13] p-6 rounded-lg">
                            <div className="pl-4 py-4"><img src={referrals} alt="" /></div>
                            <h3 className="text-xl text-white font-semibold my-4">Job Referrals</h3>
                            <span className="text-white">Access to alumni networks and potential job referrals.</span>
                        </div>

                        <div className="bg-[#000F13] p-6 rounded-lg">
                            <div className="pl-4 py-4"><img src={exposure} alt="" /></div>
                            <h3 className="text-xl text-white font-semibold my-4">Practical Exposure</h3>
                            <span className="text-white">Practical exposure to industry-relevant tools and techniques.</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CareerServices;
