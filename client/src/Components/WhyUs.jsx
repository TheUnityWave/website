import React from 'react';
import logo from '../Images/logo 1.png';
import verificationImage from '../Images/Video Id Verification.png';
import trainingImage from '../Images/Training.png';
import issueResolveImage from '../Images/Strike.png';
import techImage from '../Images/Circuit.png';

const WhyUs = () => {
    return (
        <div className="relative bg-primary overflow-hidden w-[100vw] text-white md:py-32 py-16 px-16">
            <div className="absolute bottom-0 right-0 opacity-30 md:w-1/3">
                <img src={logo} alt="Logo" className="contrast-200" />
            </div>
            <div className="flex flex-wrap justify-evenly gap-8">
                <div className="md:w-1/5 text-3xl leading-normal font-bold ">Why are we client’s favourite FM company?</div>
                <div className="w-full md:w-1/4 border-2 border-stone-400 p-9 relative mb-16 md:mb-0">
                    <div className="absolute px-2 -top-8 left-8 bg-primary">
                        <img src={verificationImage} alt="Border" className="w-16 h-16" />
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="text-xl font-semibold">Background Verification</div>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival.
                    </p>
                </div>

                <div className="w-full md:w-1/4 border-2 border-stone-400 p-9 relative">
                    <div className="absolute px-2 -top-8 left-8 bg-primary">
                        <img src={trainingImage} alt="Border" className="w-16 h-16" />
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="text-xl font-semibold">Online Training</div>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival.
                    </p>
                </div>

                <div className="w-full md:w-1/4 border-2 border-stone-400 p-9 mt-16 relative">
                    <div className="absolute px-2 -top-8 left-8 bg-primary">
                        <img src={issueResolveImage} alt="Border" className="w-16 h-16" />
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="text-xl font-semibold">Issue Resolve</div>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival.
                    </p>
                </div>

                <div className="w-full md:w-1/4 border-2 border-stone-400 p-9 mt-16 relative">
                    <div className="absolute px-2 -top-8 left-8 bg-primary">
                        <img src={techImage} alt="Border" className="w-16 h-16" />
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="text-xl font-semibold">Tech Driven Solution</div>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
