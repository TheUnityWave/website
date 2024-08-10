import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PostAJob() {
    const [isLoading, setIsLoading] = useState(false);

    const [jobData, setJobData] = useState({
        title: '',
        // department: '',
        location: '',
        description: '',
        // requirements: ['']
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    // const handleRequirementChange = (index, value) => {
    //     const newRequirements = [...jobData.requirements];
    //     newRequirements[index] = value;
    //     setJobData({ ...jobData, requirements: newRequirements });
    // };

    // const addRequirement = () => {
    //     setJobData({
    //         ...jobData,
    //         requirements: [...jobData.requirements, '']
    //     });
    // };

    // const removeRequirement = (index) => {
    //     const newRequirements = jobData.requirements.filter((_, i) => i !== index);
    //     setJobData({ ...jobData, requirements: newRequirements });
    // };

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

            const res = await axios.post('http://localhost:5000/api/admin/postajob', jobData, config);
            setSuccess('Job posted successfully!');
            setJobData({
                title: '',
                // department: '',
                location: '',
                description: '',
                requirements: ['']
            });
            setIsLoading(false);

            toast.success("Job Posted Successfully");

        } catch (err) {
            toast.success("Job Posting failed");

            console.log(err)
            setError(err.response.data.msg || 'An error occurred while posting the job.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex'>
            <div className="p-4 md:p-8 bg-[#f3f4f6] flex-1">
                <h2 className="text-2xl bg-cyan-900 from-blue-600 to-blue-400 text-white font-bold py-4 px-6 rounded-lg shadow-md mb-6">
                    Post a Job
                </h2>
                <div className="mt-4 overflow-y-auto h-[calc(80vh-72px-2rem)]">
                    <form onSubmit={handleSubmit}>
                        <div className='w-full md:w-1/2 px-3 mb-4 md:mb-0'>
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
                        {/* <div className='w-full md:w-1/2 px-3 mb-4 md:mb-0'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">Department:</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="department"
                                name="department"
                                value={jobData.department}
                                onChange={handleChange}
                                required
                            />
                        </div> */}
                        <div className='w-full md:w-1/2 px-3 mb-4 md:mb-0'>
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
                        <div className='w-full md:w-1/2 px-3 mb-4 md:mb-0'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
                            <textarea
                                className="shadow appearance-none border h-[40vh] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                name="description"
                                value={jobData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* <div className='w-full flex flex-col gap-2 md:w-1/2 px-3 mb-4 md:mb-0'>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Requirements:</label>
                            {jobData.requirements.map((req, index) => (
                                <div key={index} className='flex justify-center items-center gap-2'>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        value={req}
                                        onChange={(e) => handleRequirementChange(index, e.target.value)}
                                        required
                                    />
                                    <button
                                        className=" bg-cyan-900  text-white font-semibold py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                                        type="button" onClick={() => removeRequirement(index)}>Remove</button>
                                </div>
                            ))}
                            <button className=" bg-cyan-900  text-white font-semibold py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                                type="button" onClick={addRequirement}>Add Requirement</button>
                        </div> */}
                        <button
                            className=" bg-cyan-900  text-white font-semibold py-2 px-6 mt-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" disabled={isLoading}
                        > {isLoading ? 'Posting...' : 'Post Job'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
