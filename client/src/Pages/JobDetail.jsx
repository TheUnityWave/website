import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function JobDetailPage() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>No job found</div>;

  return (
    <div className="container w-full">
    <div className="job-detail">
      <h1>{job.title}</h1>
      <p><strong>Department:</strong> {job.department}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <h2>Description</h2>
      <p>{job.description}</p>
      <h2>Requirements</h2>
      <ul>
        {job.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
      <button>Apply Now</button>
    </div>
    </div>
  );
}

export default JobDetailPage;