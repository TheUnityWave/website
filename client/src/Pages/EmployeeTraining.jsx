import React from 'react';
import { Link } from 'react-router-dom';
import trainingData from '../data/trainingData.json';

const EmployeeTraining = () => {
    return (
        <div className="flex">
            <div className="md:p-4 bg-[#f3f4f6] flex-1">
                <h2 className="text-2xl bg-cyan-900 text-white font-semibold py-3 px-6 mb-4 rounded-md">
                    Employee Training
                </h2>
                <div className='overflow-y-auto h-[calc(85vh-72px-2rem)]'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainingData.training_modules.map((module, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="p-4 flex flex-col items-start justify-between gap-2">
                                    <h3 className="text-xl font-semibold mb-2">{module.name}</h3>
                                    <p className="text-gray-700 text-base">
                                        {`${module.weeks.length} week${module.weeks.length > 1 ? 's' : ''}`}
                                    </p>
                                    <ul className="text-sm text-gray-600 mb-2">
                                        {module.weeks.map((week, weekIndex) => (
                                            <li key={weekIndex}>Week {week.week}: {week.title}</li>
                                        ))}
                                    </ul>
                                    <Link to={`/employee/training/${index}`} className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700">
                                        Start Training
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeTraining;