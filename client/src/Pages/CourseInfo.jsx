import React from 'react';
import Underline from '../Images/underline.png';
import Line from '../Images/line.png';
import Doubtimg from '../Images/Doubtimg.jpg';
import Teamwork from '../Images/teamWork.jpg';
import SoftSkills from '../Images/SoftSkills.jpg';
import Time from '../Images/time.png';
import Interview from '../Images/interview.jpg';
import Feedback from '../Images/feedback.jpg';

const CourseInfo = () => {

    const courseData = {
        title: "Way to Transform Your Career!",
        subheading: "Why you should take this course?",
        cards: [
            {
                title: "1:1 Doubt Support",
                image: Doubtimg,
                description: "Individualized guidance tailored to each participant's strengths, weaknesses, and career goals."
            },
            {
                title: "Demo Interviews",
                image: Interview,
                description: "Participate in demo interviews simulating real job interview environments."
            },
            {
                title: "Soft Skills Training",
                image: SoftSkills,
                description: "Improve verbal and non-verbal communication for professional settings."
            },
            {
                title: "Time Management",
                image: Time,
                description: "Learning to manage time effectively in an interview setting. Balancing speed and accuracy in responses."
            },
            {
                title: "Collaborative Growth",
                image: Teamwork,
                description: "Work on team-based projects to develop interpersonal and leadership skills."
            },
            {
                title: "Real-Time Feedback",
                image: Feedback,
                description: "Receive constructive feedback from mentors to enhance performance in actual interviews."
            }
        ]
    };

    const { title, subheading, cards } = courseData; // Destructure the data

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center p-8 relative">
            <div className="flex flex-col mb-8">
                <h1 className="text-4xl font-semibold mb-0 text-white text-center">{title}</h1>
                <div className="flex justify-center mb-8">
                    <img src={Underline} alt="" className="mx-auto" />
                </div>
            </div>

            <div className="w-full max-w-5xl flex flex-row items-start">
                <div className="w-1/6 hidden md:block ">
                    <div className="flex justify-left py-2"><img src={Line} alt="" />
                    </div>
                    <div className="absolute w-0.5 bg-yellow-500 ml-3" style={{ top: '180px', bottom: '0px' }}></div>

                </div>

                <div>
                    <div className="flex flex-row items-start mb-8">
                        <h2 className="text-3xl font-semibold text-left">{subheading}</h2>
                    </div>

                    {/* Cards Section below the heading */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {cards.map((card, index) => (
                            <div key={index} className="bg-[rgba(1,35,46,0.7)] p-6 rounded-lg shadow-md text-left">
                                <div className="h-40 flex items-center justify-center mb-4">
                                    <img src={card.image} alt="" className="h-full rounded-md" />
                                </div>
                                <h3 className="text-xl  font-semibold mb-2">{card.title}</h3>
                                <p className="text-[rgba(255,255,255,0.7)] ">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CourseInfo;