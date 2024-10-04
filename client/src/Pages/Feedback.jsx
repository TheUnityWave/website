import React from 'react';
import video from '../Images/video1.mp4';
import video1 from '../Images/video.mp4';
import linkedin from '../Images/linked.png';

const Feedback = () => {

    const feedbackData = [
        {
            name: "Harsh Aware",
            role: "Investor Relations Associate",
            video: true,
            videoSrc: video,
            content: ""
        },
        {
            name: "Naaz Mansoori",
            role: "",
            video: true,
            videoSrc: video1,
            content: ""
        }, {
            name: "Muskan Arora",
            role: "Investor Relation",
            video: false,
            linkedin: "https://www.linkedin.com/in/muskan-arora-375a45310/ ",
            content: "Unity Wave taught me in months what years of college couldn't. They sharpened both my technical and non-technical skills and built my confidence. The mock interviews were challenging, but they prepared me thoroughly for the actual interviews, so I knew exactly what to expect. This course has been incredibly beneficial for my career development. It provided a perfect blend of personalized guidance, practical exposure, and real-time feedback. I highly recommend this course to anyone looking to boost their employability and career readiness"
        }
    ]


    return (
        <div className=" flex flex-col justify-center items-center bg-complex-gradient h-auto text-white overflow-hidden p-8">
            <h1 className="text-4xl font-semibold text-center mb-0.25">
                Some <span className="text-red-500">❤</span> from our Learners ...
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-auto w-full max-w-5xl py-16
            ">
                {feedbackData.map((person, index) => (
                    <div key={index} className="bg-[#000F13] rounded-lg p-4 shadow-lg">


                        {person.video ? (
                            <div> <div className="flex items-center space-x-4 mb-2">
                                <div>
                                    <h2 className="text-lg font-semibold">{person.name}</h2>

                                </div>
                            </div>
                                <video
                                    className="w-full rounded-lg h-80"
                                    src={person.videoSrc}
                                    controls
                                /></div>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center space-x-4 mb-2">
                                    <div>
                                        <h2 className="text-lg font-semibold">{person.name}</h2>

                                    </div>
                                    <div>  <a
                                        href={person.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400"
                                    >
                                        <img src={linkedin} alt='LinkedIn' className='rounded-sm h-6 w-6' />
                                    </a></div>
                                </div>
                                <p className="text-sm">{person.content}</p></div>
                        )}
                    </div>))
                }

            </div>
        </div>
    );
};
export default Feedback;
