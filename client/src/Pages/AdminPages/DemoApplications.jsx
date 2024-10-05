import React, { useEffect, useState } from 'react';

const DemoApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {

        const fetchApplications = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/demoform', {
                    headers: {
                        'auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setApplications(data);

                // console.log(data);
            } catch (error) {
                console.error('Error fetching demo applications:', error);
            }
        };
        fetchApplications();

    }, []);


    return (
        <div className="flex">
            <div className='md:p-8 bg-[#f3f4f6] flex-1'>
                <h2 className="text-2xl bg-cyan-900 from-blue-600 to-blue-400 text-white font-bold py-4 px-6 rounded-lg shadow-md mb-6">
                    Demo Applications
                </h2>
                <div className="mt-4 overflow-y-auto h-[calc(80vh-72px-2rem)]">
                    {applications.length > 0 ? (
                        <ul>
                            {applications.map((application) => (
                                <li key={application._id} className="bg-white p-4 mb-4 shadow-md rounded-md w-full">
                                    <h3 className="text-lg font-semibold">
                                        {application.fullName}
                                    </h3>
                                    <p><strong>Email:</strong> {application.email}</p>
                                    <p><strong>Mobile:</strong> {application.phone}</p>


                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No demo applications found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DemoApplications;