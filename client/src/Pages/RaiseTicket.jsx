import React, { useEffect, useState } from 'react';

const RaiseTicket = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {

        const fetchApplications = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/tickets', {
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

    }, [applications]);

    const handleMarkDone = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/tickets/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isResolved: true }),
            });

            if (!response.ok) {
                console.error('Failed to update raise status');

            } 
        } catch (error) {
            console.error('Error updating raised status:', error);
        }
    };

    return (
        <div className="flex">
            <div className='md:p-8 bg-gray-100 flex-1'>
                <h2 className="text-2xl bg-cyan-900 from-blue-600 to-blue-400 text-white font-bold py-4 px-6 rounded-lg shadow-md mb-6">
                    Tickets Raised
                </h2>
                <div className="mt-4 overflow-y-auto h-[calc(80vh-72px-2rem)]">
                    {applications.length > 0 ? (
                        <ul>
                            {applications.map((application) => (
                                <li key={application._id} className="bg-white p-4 mb-4 shadow-md rounded-md w-full">
                                    <h3 className="text-lg font-semibold">
                                        {application.name} 
                                    </h3>
                                    <p><strong>Email:</strong> {application.email}</p>
                                    <p><strong>Mobile:</strong> {application.mobile}</p>
                                    <p><strong>Company:</strong> {application.company}</p>
                                    <p><strong>User Type:</strong> {application.userType}</p>
                                    <p><strong>Complaint:</strong> {application.complaint}</p>
                                    <button
                                        onClick={() => handleMarkDone(application._id)}
                                        disabled={application.isResolved}
                                        className={`mt-2 px-4 py-2 rounded ${application.isResolved
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-primary hover:bg-blue-600 text-white'
                                            }`}
                                    >
                                        {application.isResolved ? 'Issue Resolved' : 'Not resolved yet'}
                                    </button>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tickets raised.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RaiseTicket;