// BlogDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import blogs from '../data/blogs.json';

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover"/>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
          <p className="text-gray-700 text-base">{blog.content}</p>
          {/* <Link
            to="/"
            className="inline-block mt-4 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow"
          >
            Back to Blogs
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
