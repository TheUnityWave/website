import React from 'react';
import { useParams, Link } from 'react-router-dom';
import trainingData from '../data/trainingData.json'; // Adjust the path as necessary

const TrainingDetails = () => {
    const { id } = useParams();
    const module = trainingData.training_modules[parseInt(id)];

    if (!module) {
        return <div>Training module not found</div>;
    }

    return (
        <div className="container mx-auto px-4 md:px-24 py-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                    <h2 className="text-3xl font-semibold mb-4">{module.name}</h2>
                    {module.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="mb-8">
                            <h3 className="text-xl font-semibold mb-2">Week {week.week}:  {week.title}  </h3>
                            {week.days.map((day, dayIndex) => (
                                <div key={dayIndex} className="mb-4">
                                    <h4 className="text-md font-semibold mb-1">Day {day.days || day.day}: <span className='font-normal'>{day.topic}</span></h4>
                                </div>
                            ))}
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold mb-2">Assignments:</h4>
                                <ul className="list-disc list-inside">
                                    {week.assignments.map((assignment, assignmentIndex) => (
                                        <li key={assignmentIndex}>{assignment}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold mb-2">Compliance Guidelines:</h4>
                                <ul className="list-disc list-inside">
                                    {week.compliance_guidelines.map((guideline, guidelineIndex) => (
                                        <li key={guidelineIndex}>{guideline}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">General Compliance Guidelines</h3>
                {trainingData.general_compliance_guidelines.map((guideline, index) => (
                    <div key={index} className="mb-4">
                        <h4 className="text-xl font-semibold mb-1">{guideline.category}</h4>
                        <p>{guideline.description}</p>
                    </div>
                ))}
            </div>
            <Link to="/employee/training" className="mt-8 inline-block px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700">
                Back to Training Modules
            </Link>
        </div>
    );
};

export default TrainingDetails;