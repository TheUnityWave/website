// Blogs.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import blogs from '../data/blogs.json';

const Blogs = () => {
  return (
    <div className="container mx-auto bg-[#d0e3ff] px-24 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-700 text-base">
                {blog.content.substring(0, 100)}... {/* Truncate content for preview */}
              </p>
              <Link to={`/blog/${blog.id}`} className="text-cyan-900 font-bold hover:underline mt-4 block">
                Read More...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
