import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PostAJob() {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingJob, setEditingJob] = useState(null); 
    const [jobData, setJobData] = useState({ title: '', location: '', description: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const config = {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            };

            let res;
            if (editingJob) {
                res = await axios.put(`http://localhost:5000/api/admin/job/edit/${editingJob._id}`, jobData, config);
                toast.success("Job Updated Successfully");
                setJobs(jobs.map(job => job._id === editingJob._id ? res.data : job));
            } else {
                res = await axios.post('http://localhost:5000/api/admin/postajob', jobData, config);
                toast.success("Job Posted Successfully");
                setJobs([...jobs, res.data]);
            }

            setSuccess(editingJob ? 'Job updated successfully!' : 'Job posted successfully!');
            setJobData({ title: '', location: '', description: '' });
            setIsModalOpen(false);
        } catch (err) {
            toast.error("Job Operation failed");
            console.log(err);
            setError(err.response.data.msg || 'An error occurred while processing the job.');
        } finally {
            setIsLoading(false);
            setEditingJob(null);
        }
    };

    const handleEdit = (job) => {
        setEditingJob(job);
        setJobData({ title: job.title, location: job.location, description: job.description });
        setIsModalOpen(true);
    };

    const toggleJobStatus = async (jobId, isActive) => {
        try {
            const config = {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.put(`http://localhost:5000/api/admin/job/editOpening/${jobId}`, { isActive: !isActive }, config);
            setJobs(jobs.map(job => job._id === jobId ? res.data : job));
            toast.success(`Job Opening ${isActive ? 'Closed' : 'Opened'} Successfully`);
        } catch (err) {
            toast.error("Failed to toggle job opening status");
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/job/all');
                setJobs(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch jobs. Please try again later.');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className='flex flex-col'>
            <div className="p-4 md:p-8 bg-[#f3f4f6] flex-1">
                <h2 className="text-2xl bg-cyan-900 from-blue-600 to-blue-400 text-white font-bold py-4 px-6 rounded-lg shadow-md mb-6">
                    Job Openings
                </h2>
                <div className="mt-4 overflow-y-auto h-[calc(80vh-72px-2rem)]">
                    <button
                        className="bg-cyan-900 text-white font-semibold py-2 px-6 mb-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => {
                            setJobData({ title: '', location: '', description: '' });
                            setEditingJob(null);
                            setIsModalOpen(true);
                        }}
                    >
                        Post New Job Opening
                    </button>

                    {/* Modal for posting/updating job */}
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold mb-4">{editingJob ? 'Edit Job' : 'Post New Job'}</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className='w-full px-3 mb-4'>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Job Title:</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={jobData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className='w-full px-3 mb-4'>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location:</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={jobData.location}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className='w-full px-3 mb-4'>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
                                        <textarea
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="description"
                                            name="description"
                                            value={jobData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="bg-gray-400 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-cyan-900 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                                            type="submit" disabled={isLoading}
                                        >
                                            {isLoading ? 'Processing...' : editingJob ? 'Update Job' : 'Post Job'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Job Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {loading ? (
                            <p>Loading jobs...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div key={job._id} className="bg-white p-4 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                    <p className="text-gray-600 mb-1">{job.location}</p>
                                    <p className="text-gray-600 mb-4">{job.description.substring(0, 100)}...</p>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => handleEdit(job)}
                                            className="bg-blue-500 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => toggleJobStatus(job._id, job.isActive)} // Toggle job opening status
                                            className={`font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline ${job.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                                        >
                                            {job.isActive ? 'Close Opening' : 'Open Opening'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No job openings.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
