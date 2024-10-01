import React from 'react';
import CoursePic from '../Images/explore.png';
import clock from '../Images/clock.png';

const CheckIcon = () => (
    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M7.629 12.667l-3.75-3.75a1 1 0 00-1.414 1.414l4.5 4.5a1 1 0 001.414 0l9-9a1 1 0 00-1.414-1.414l-8.293 8.293z" />
    </svg>
);
const Course = () => {

    return (
        <div className="flex justify-start items-center flex-col bg-gradient-radial from-[#57B9F8] via-[#1A586C]  to-[#01232E] pb-20 px-2">
            <h1 className='text-3xl text-white text-center md:text-5xl font-semibold mt-8 mb-8'>Explore Our Course</h1>
            <div className="w-full md:w-2/3 max-w-[90%] lg:max-w-[1200px] bg-slate-700 rounded-xl overflow-hidden shadow-lg mt-8">
                <div className="flex flex-col md:flex-row h-auto md:h-96">
                    {/* Left side - Photo */}
                    <div className="w-full md:w-1/3">
                        <img src={CoursePic} alt="" className='h-full' />
                    </div>

                    {/* Right side - Course Details */}
                    <div className="flex justify-center items-start flex-col w-full md:w-2/3 p-4 md:p-20 bg-[#000F13]">
                        <h2 className="text-white text-3xl font-semibold mb-5">Industrial Training Program</h2>
                        <div className="flex items-center bg-yellow-400 text-gray-900 rounded-lg px-2 py-2 mb-6">
                            <img src={clock} alt="" />
                            <span>Duration: 2 Months</span>
                        </div>

                        <ul className="list-none text-white space-y-5">
                            <li className="flex items-center mb-2">
                                <CheckIcon />
                                500+ real-time interview questions
                            </li>
                            <li className="flex items-center mb-2">
                                <CheckIcon />
                                One-to-One interaction with mentors
                            </li>
                            <li className="flex items-center mb-2">
                                <CheckIcon />
                                Demo Interviews
                            </li>
                            <li className="flex items-center mb-2">
                                <CheckIcon />
                                Learn techniques to tackle real-time job difficulties
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default Course;
