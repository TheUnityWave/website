import React from 'react';
import ReferForm from '../Components/ReferForm';

const ReferAndEarn = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-cyan-900">
            <div className="bg-white shadow-lg p-6 w-full max-w-lg my-16"  >

                <h1 className="text-2xl font-bold mb-1 text-center">Refer and Earn</h1>
                <p className="block text-cyan-900 text-sm text-center font-bold mb-8">Refer someone! And get a chance to earn upto &#8377;4000.</p>
                <ReferForm />
            </div>
        </div >
    );
};

export default ReferAndEarn;
