import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function JobDetailPage() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Replace with your actual backend URL
        const response = await fetch(`http://localhost:5000/api/careers/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJob(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job:', error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchJob();
  }, [id]);

  const handleApplyNow = () => {
    // Redirect to careers page with job title as a parameter
    navigate(`/careers/apply?category=${encodeURIComponent(job.title)}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>No job found</div>;

  return (
    <div className="container mx-auto px-8 md:px-24 py-8">
      <div className="job-detail bg-white shadow-md rounded-lg p-8 overflow-hidden">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{job.title}</h1>
        <p><strong>Department:</strong> {job.department}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <h2 className='font-bold'>Description:</h2>
        <p>{job.description}</p>
        <br />
        <h2 className='font-bold'>Requirements:</h2>
        <ul>
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
        <button className='btn mt-4' onClick={handleApplyNow}>Apply Now</button>
      </div>
    </div>
  );
}

export default JobDetailPage;