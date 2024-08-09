import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import careersImage from '../Images/career.png';
import debounce from 'lodash/debounce';

const CareersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/careers/all');
        setJobs(res.data);
        setFilteredJobs(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }, 300),
    [jobs]
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="">
      <div className="">
        <img src={careersImage} alt="Careers" className="w-full h-96 object-cover" />
      </div>
      <p className="text-2xl px-8 md:px-56 pt-12 text-center text-cyan-900 mb-6 font-semibold">
        Discover Career Opportunities in Integrated Facility Management. Unlock Your Potential and Grow with Us.
      </p>
      <div className="careers-page mx-auto container w-full bg-[#d0e3ff] px-12 md:px-24 py-10">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {filteredJobs.length === 0 ? (
          <p>No job openings available matching your search. Please try a different search term or check back later.</p>
        ) : (
          <div className="job-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                  {/* <p className="text-gray-700 text-base">
                    {job.department}
                  </p> */}
                  <p className="text-gray-700 text-base">
                    {job.location}
                  </p>
                  <p className="text-gray-700 text-base">
                    {job.description.substring(0, 100)}...
                  </p>
                  <Link to={`/api/careers/${job._id}`} className="text-cyan-900 font-bold hover:underline mt-4 block">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareersPage;