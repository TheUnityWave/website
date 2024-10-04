import React, { useState } from "react";
import Underline from '../Images/underline.png';

const FAQ = () => {
    const faqData = [
        {
            "question": "How can I enroll in the course?",
            "answer": "You can enroll in this course by contacting our team, who will be happy to assist in scheduling your class.\nDetails on course fees and payment plans:\n\n30 - Day Program:\n• Course Fee: ₹1200 + GST\n• Flexible option for students who wish to complete the course in a shorter duration\n\n60 - Day Program:\n• Course Fee: ₹2000 + GST\n• Comprehensive training with extended support and guidance\n\nPersonalized One-on-One Mentorship:\n• Fee: ₹2000 + GST for 30 days\n• Customized mentorship tailored to individual needs for focused learning and progress"
        },

        {
            question: "Will I get the internship?",
            answer: "We collaborate with a variety of organizations to offer our students valuable internship opportunities.While we make every effort to connect you with these opportunities, we cannot guarantee an internship placement upon completion of this program."
        },
        {
            question: "Will I get the job?",
            answer: "Yes, you could get a high-paying job after completing this training program. This course is designed to enhance your skills in communication, interview techniques, and time management, making you a strong candidate in the job market. It will greatly support your professional journey and increase your chances of securing a rewarding position."
        },
        {
            question: "What will be the Upcoming Sessions?",
            answer: "You will get this information by contacting the team."
        },
        {
            question: "Is there any money back gurantee?",
            answer: "Yes, we offer a 5 day money-back guarantee. If you're not satisfied with the program within the first five days, we will provide a full refund of your fees—no questions asked."
        },
        {
            question: "Why should I pursue this training from THE UNITY WAVE?",
            answer: "Pursuing training from THE UNITY WAVE provides you with a unique opportunity to gain industry-relevant skills, hands-on experience, and personalized mentorship. Our comprehensive program is designed to enhance your professional competencies, boost your confidence, and prepare you for real-world challenges, "
        }
    ];

    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    return (
        <div className="relative py-12 bg-black">
            <div className="flex justify-center flex-col p-4">
                <h2 className="text-center ml-xl text-5xl font-bold text-[#57B9F8] pr-40 mb-0">
                    Still have a doubt?<br />
                </h2>
                <h2 className="text-center pl-8 text-3xl font-bold text-white">
                    Find your answer here!
                </h2>
                <div className="flex justify-center mb-6">
                    <img src={Underline} alt="" />
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-12 mt-10">
                {faqData.map((faq, index) => (
                    <div key={index} className="mb-2">
                        {/* Question and Button */}
                        <div className="flex justify-between text-white items-center py-2 bg-[#012A37] hover:bg-[rgba(1,35,46,1)] px-4 text-md font-semibold">
                            <span>{faq.question}</span>
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="text-white py-1 px-3 font-semibold"
                            >
                                {activeFAQ === index ? "-" : "+"}
                            </button>
                        </div>

                        {/* Answer (conditionally rendered with line breaks) */}
                        {activeFAQ === index && (
                            <div className="py-2 px-4 bg-[rgba(1,35,46,0.5)] rounded-b-md text-white text-sm transition-all duration-300 ease-in-out">
                                {faq.answer.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;