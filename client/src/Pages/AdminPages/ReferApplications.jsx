import React, { useEffect, useState } from 'react';

const ReferApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {

        const fetchApplications = async () => {
            try {
                const response = await fetch('https://website-server-six.vercel.app/api/admin/referandearn', {
                    headers: {
                        'auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setApplications(data);

                // console.log(data);
            } catch (error) {
                console.error('Error fetching refer applications:', error);
            }
        };
        fetchApplications();

    }, []);


    return (
        <div className="flex">
            <div className='md:p-8 bg-[#f3f4f6] flex-1'>
                <h2 className="text-2xl bg-cyan-900 from-blue-600 to-blue-400 text-white font-bold py-4 px-6 rounded-lg shadow-md mb-6">
                    Refer Applications
                </h2>
                <div className="mt-4 overflow-y-auto h-[calc(80vh-72px-2rem)]">
                    {applications.length > 0 ? (
                        <ul>
                            {applications.map((application) => (
                                <li key={application._id} className="bg-white p-4 mb-4 shadow-md rounded-md w-full">
                                    <h3 className="text-lg font-semibold">
                                        {application.referrerName}
                                    </h3>
                                    <p><strong>Candidate Name:</strong> {application.candidateName}</p>
                                    <p><strong>Email:</strong> {application.email}</p>
                                    <p><strong>Mobile:</strong> {application.phone}</p>
                                    <p><strong>Purpose:</strong> {application.purpose}</p>
                                    <p><strong>Designation:</strong> {application.designation}</p>


                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No refer applications found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReferApplications;
