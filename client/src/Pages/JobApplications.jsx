import React, { useEffect, useState } from 'react';

const JobApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/job-applications');
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error('Error fetching job applications:', error);
            }
        };

        fetchApplications();
    }, []);

    const sendCredentials = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/send-credentials/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert('Credentials sent successfully');
            } else {
                console.error('Failed to send credentials');
            }
        } catch (error) {
            console.error('Error sending credentials:', error);
        }
    };

    return (
        <div className="p-4 md:p-8 bg-gray-100 flex-1 h-screen">
            <h2 className="text-2xl bg-cyan-900 text-white font-semibold py-4 px-6 min-h-16">
                Job Applications
            </h2>
            <div className="mt-4 overflow-y-auto h-[calc(100vh-72px-2rem)]">
                {applications.length > 0 ? (
                    <ul>
                        {applications.map((application) => (
                            <li key={application._id} className="bg-white p-4 mb-4 shadow-md rounded-md">
                                <h3 className="text-lg font-semibold">
                                    {application.firstName} {application.lastName}
                                </h3>
                                <p><strong>Email:</strong> {application.email}</p>
                                <p><strong>Mobile:</strong> {application.mobileNumber}</p>
                                <p><strong>Experience:</strong> {application.experience}</p>
                                <p><strong>Job Category:</strong> {application.jobCategory}</p>
                                <a href={application.resumeFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    View Resume
                                </a>
                                {/* <a href={application.viewableResumeFile} target="_blank" rel="noopener noreferrer" className="ml-4 text-blue-500 hover:underline">
                                    View Viewable Resume
                                </a> */}
                                <button
                                    onClick={() => sendCredentials(application._id)}
                                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
                                >
                                    Send Credentials
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No job applications found.</p>
                )}
            </div>
        </div>
    );
};

export default JobApplications;
