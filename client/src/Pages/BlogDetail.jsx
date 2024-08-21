// BlogDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import blogs from '../data/blogs.json';

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="container mx-auto px-8 md:px-24 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 p-8">{blog.title}</h2>
        <img src={blog.image} alt={blog.title} className="m-auto h-96 object-cover" />
        <div className="p-8">
          <p className="text-gray-700 text-lg mb-4">{blog.description}</p>
          
          {/* <h3 className="text-2xl font-semibold mb-2 text-blue-600">Key Points:</h3> */}
          <ul className="list-disc list-inside mb-4">
            {blog.points.map((point, index) => (
              <li key={index} className="text-gray-700 text-base">
                <strong className="font-medium text-xl">{point.title}</strong>
                <br /> {point.description}
              </li>
            ))}
          </ul>
          
          <h3 className="text-2xl font-semibold mb-2 text-blue-600">Conclusion:</h3>
          <p className="text-gray-700 text-lg">{blog.conclusion}</p>
        </div>
      </div>
      {/* <Link to="/" className="mt-4 inline-block text-blue-500">Back to Blogs</Link> */}
    </div>
  );
};

export default BlogDetail;
