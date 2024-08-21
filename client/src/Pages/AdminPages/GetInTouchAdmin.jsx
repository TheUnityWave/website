import React, { useEffect, useState } from 'react';

const GetInTouchAdmin = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('https://website-server-p59e.onrender.com/api/admin/get-in-touch', {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setRequests(data);
            
        } catch (error) {
            console.error('Error fetching get in touch requests:', error);
        }
    };

    const handleMarkDone = async (id) => {
        try {
            const response = await fetch(`https://website-server-p59e.onrender.com/api/admin/get-in-touch/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isContacted: true }),
            });

            if (response.ok) {
                // Update the local state
                // setRequests(requests.map(request => 
                //     request._id === id ? { ...request, isContacted: true } : request
                // ));
            } else {
                console.error('Failed to update contact status');
            }
        } catch (error) {
            console.error('Error updating contact status:', error);
        }
    };

    return (
        <div className='flex'>
            <div className="p-4 md:p-8 bg-[#f3f4f6] flex-1">
                <h2 className="text-2xl bg-cyan-900 from-blue-600 to-blue-400 text-white font-bold py-4 px-6 rounded-lg shadow-md mb-6">
                    Get in Touch Requests
                </h2>
                <div className="mt-4 overflow-y-auto h-[calc(80vh-72px-2rem)]">
                    {requests.length > 0 ? (
                        <ul>
                            {requests.map((request) => (
                                <li key={request._id} className="bg-white p-4 mb-4 shadow-md rounded-md">
                                    <h3 className="text-lg font-semibold">
                                        {request.firstName} {request.lastName}
                                    </h3>
                                    <p><strong>Email:</strong> {request.email}</p>
                                    <p><strong>Mobile:</strong> {request.mobile}</p>
                                    <p><strong>Message:</strong> {request.message}</p>
                                    <p><strong>Submitted At:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                                    <button
                                        onClick={() => handleMarkDone(request._id)}
                                        disabled={request.isContacted}
                                        className={`mt-2 px-4 py-2 rounded ${request.isContacted
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-primary hover:bg-blue-600 text-white'
                                            }`}
                                    >
                                        {request.isContacted ? 'Already Contacted' : 'Mark Done'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No get in touch requests found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetInTouchAdmin;