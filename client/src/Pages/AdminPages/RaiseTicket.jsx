import React, { useEffect, useState } from 'react';

const RaiseTicket = () => {
    const [applications, setApplications] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {

        const fetchApplications = async () => {
            try {
                let url = 'https://website-server-p59e.onrender.com/api/admin/tickets';
                if (filter !== 'all') {
                    url += `?userType=${filter}`;
                }
                const response = await fetch(url, {
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

    }, [filter]);

    const handleMarkDone = async (id) => {
        try {
            const response = await fetch(`https://website-server-p59e.onrender.com/api/admin/tickets/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isResolved: true }),
            });

            if (response.ok) {
                const updatedTicket = await response.json();
                setApplications(applications.map( app => app._id === id ? updatedTicket : app ))
            } else {
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
                <div className='flex justify-start gap-4'>
                <button className='btn' onClick={() => setFilter('all')}>All</button>
                <button className='btn' onClick={() => setFilter('Client')}>Client</button>
                <button className='btn' onClick={() => setFilter('Employee')}>Employee</button>
            </div>
                <div className="mt-4 overflow-y-auto h-[calc(80vh-72px-2rem)]">
                    {applications.length > 0 ? (
                        <ul>
                            {applications.map((application) => (
                                <li key={application._id} className="bg-white text-sm p-4 mb-4 shadow-md rounded-md w-full">
                                    <h3 className="text-lg font-semibold">
                                        {application.ticketNumber} 
                                    </h3>
                                    <p><strong>Name:</strong> {application.name}</p>
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
                                        {application.isResolved ? 'Issue Resolved' : 'Mark Resolved'}
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