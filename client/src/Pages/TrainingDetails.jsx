import React from 'react';
import { useParams, Link } from 'react-router-dom';
import trainingData from '../data/trainingData.json'; // Adjust the path as necessary

const TrainingDetails = () => {
    const { id } = useParams();
    const training = trainingData.find((t) => t.id === parseInt(id));

    if (!training) {
        return <div>Training module not found</div>;
    }

    return (
        <div className="container mx-auto px-4 md:px-24 py-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={training.image} alt={training.title} className="w-full h-64 object-cover"/>
                <div className="p-4">
                    <h2 className="text-3xl font-semibold mb-4">{training.title}</h2>
                    <p className="text-gray-700 mb-4">{training.description}</p>
                    <h3 className="text-xl font-semibold mb-2">Content:</h3>
                    <p className="text-gray-700">{training.content}</p>
                </div>
            </div>
        </div>
    );
};

export default TrainingDetails;
