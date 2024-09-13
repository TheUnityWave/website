import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import debounce from 'lodash.debounce';

const ReferForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [allJobs, setAllJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        referrerName: '',
        candidateName: '',
        email: '',
        phone: '',
        purpose: '',
        designation: '',
    });



    // Handle form changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // Handle purpose dropdown selection

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/careers/all"); // Replace with your endpoint
                setAllJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    const debouncedSearch = debounce((term) => {
        const lowerCaseTerm = term.toLowerCase();
        const filtered = allJobs.filter((job) =>
            job.title.toLowerCase().includes(lowerCaseTerm)
        );
        setFilteredJobs(filtered);
    }, 300);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        debouncedSearch(term);
        setShowDropdown(true);
    };
    const handleFocus = () => {
        setShowDropdown(true); // Show the dropdown when the input is focused
    };


    const handleJobSelect = (jobTitle) => {
        setSearchTerm(jobTitle);
        setFormData({ ...formData, designation: jobTitle });
        setShowDropdown(false); // Hide the dropdown after selecting a job
    };

    const handlePurposeChange = (e) => {
        const selectedPurpose = e.target.value;
        setFormData({ ...formData, purpose: selectedPurpose });

        if (selectedPurpose !== 'job') {
            setSearchTerm(''); // Clear search term if not Job
            setFilteredJobs([]); // Clear filtered jobs if not Job
        } else {
            setFilteredJobs(allJobs); // Reset filtered jobs when "Job" is selected
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.referrerName || !formData.candidateName || !formData.email || !formData.phone || !formData.purpose) {
            toast.error("Please fill out all the fields");
            return;
        }

        if (formData.purpose === 'job' && !formData.designation) {
            toast.error("Please select a designation for the job purpose");
            return; // Stop form submission if 'designation' is missing when 'purpose' is 'job'
        }


        setIsLoading(true);
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/referandearn', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // console.log(response.data);
            toast.success("Application Sent Successfully");
            setIsLoading(false);

            // Reset form or redirect user
            setFormData({
                referrerName: '',
                candidateName: '',
                email: '',
                phone: '',
                purpose: '',
                designation: '',
            });
        } catch (error) {
            console.error('Error submitting application:', error.response ? error.response.data : error.message);
            toast.error("Please try again later");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name*</label>
                <input
                    type="text"
                    name="referrerName"
                    value={formData.referrerName}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-900"
                    placeholder="Enter your full name"


                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">To whom are you referring?</label>
                <select
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-900"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}

                >
                    <option>--Select an option--</option>
                    <option value="friend">Friend</option>
                    <option value="family">Family</option>
                    <option value="colleagues">Colleagues</option>
                    <option value="others">Others</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Purpose</label>
                <select
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-900"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handlePurposeChange}

                >
                    <option>--Select Purpose--</option>
                    <option value="job">Job</option>
                    <option value="industrial training program">Industrial Training Program</option>
                </select>
            </div>

            {formData.purpose === 'job' && (
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Designation:</label>
                    <input
                        type="text"
                        name="designation"
                        placeholder="Search Designation"
                        value={searchTerm}
                        className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-900"
                        onChange={handleSearch}
                        onFocus={handleFocus} // Show dropdown on focus

                    />
                    {showDropdown && filteredJobs.length > 0 && (
                        <ul className="list-none mt-2 border border-gray-200 max-h-40 overflow-y-auto">
                            {filteredJobs.map((job) => (
                                <li
                                    key={job.id}
                                    className="bg-white shadow-md rounded-lg p-2 mb-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleJobSelect(job.title)} // Set the job title on click
                                >
                                    <p className="text-md">{job.title}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                    {filteredJobs.length === 0 && searchTerm && (
                        <p>No job available.</p>
                    )}
                </div>
            )}


            <div className="my-4">
                <p className="block text-gray-700 text-sm font-bold mb-2">Please submit the information of the candidate you are referring.</p>

                <input
                    type="text"
                    name="candidateName"
                    value={formData.candidateName}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-900"
                    placeholder="Full Name"
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-900"
                    placeholder="Email"
                />
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-900"
                    placeholder="Phone No."
                />
            </div>

            <div className="flex items-center justify-center">
                <button
                    className="w-full bg-cyan-900  text-white font-semibold py-3 px-6 mt-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button></div>
        </form>
    );
};

export default ReferForm;
