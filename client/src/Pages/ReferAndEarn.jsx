import React from 'react';
import ReferForm from '../Components/ReferForm';

const ReferAndEarn = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-cyan-900">
            <div className="bg-white shadow-lg p-6 w-full max-w-lg my-16" >

                <h1 className="text-2xl font-bold text-center mb-1"> Refer and Earn </h1>
                <p classname="block text-cyan-900 text-sm font-bold text-center mb-8">Refer Someone! And get a chance to earn upto Rs4000 </p>

                <ReferForm />
            </div>
        </div >
    );
};

export default ReferAndEarn;
