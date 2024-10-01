import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const JobApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {

        const fetchApplications = async () => {
            try {
                const response = await fetch('https://website-server-six.vercel.app/api/admin/job-applications', {
                    headers: {
                        'auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setApplications(data);
                
                // console.log(data);
            } catch (error) {
                console.error('Error fetching job applications:', error);
            }
        };
        fetchApplications();

    }, []);

    const sendCredentials = async (id) => {
        try {
            const response = await fetch(`https://website-server-six.vercel.app/api/admin/send-credentials/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sendCredentials: true })
            });
    
            if (response.ok) {
                const updatedCareer = await response.json();
                setApplications(applications.map(app => 
                    app._id === id ? { ...app, sendCredentials: updatedCareer.sendCredentials } : app
                ));
                toast.success("Credentials Sent Successfully");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to send credentials');
            }
        } catch (error) {
            console.error('Error sending credentials:', error);
            toast.error('Error sending credentials');
        }
    };

    return (
        <div className="flex">
            <div className='md:p-8 bg-[#f3f4f6] flex-1'>
                <h2 className="text-2xl bg-cyan-900 from-blue-600 to-blue-400 text-white font-bold py-4 px-6 rounded-lg shadow-md mb-6">
                    Job Applications
                </h2>
                <div className="mt-4 overflow-y-auto h-[calc(80vh-72px-2rem)]">
                    {applications.length > 0 ? (
                        <ul>
                            {applications.map((application) => (
                                <li key={application._id} className="bg-white p-4 mb-4 shadow-md rounded-md w-full">
                                    <h3 className="text-lg font-semibold">
                                        {application.firstName} {application.lastName}
                                    </h3>
                                    <p><strong>Email:</strong> {application.email}</p>
                                    <p><strong>Mobile:</strong> {application.mobileNumber}</p>
                                    <p><strong>Experience:</strong> {application.experience}</p>
                                    <p><strong>Job Category:</strong> {application.jobCategory}</p>
                                    <div className='flex py-6 gap-6 items-center'>
                                       <div>{application.resumeFile ? (
                                            <a href={application.resumeFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                View Resume
                                            </a>) : (<p>No Resume</p>)

                                        }

                                        </div>
                                        {application.sendCredentials ? (
                                            <p className=" text-gray-500">Credentials Already Sent</p>
                                        ) : (
                                            <button
                                                onClick={() => sendCredentials(application._id)}
                                                className=" bg-green-500 text-white py-2 px-4 rounded"
                                            >
                                                Send Credentials
                                            </button>
                                        )}
                                    </div>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No job applications found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobApplications;
