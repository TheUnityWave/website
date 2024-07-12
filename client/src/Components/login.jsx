import React,{useState} from 'react';
import axios from 'axios';
import logo from '../Images/logo.png';

const Login= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token } = res.data;
      localStorage.setItem('token', token);
      setMessage('Login successful');
      // Redirect to a protected route or another page
    } catch (err) {
      console.error(err);
      setMessage(err.response ? err.response.data.msg : 'An error occurred');
    }
  };
  return (
    <div className="flex items-center justify-center w-full bg-gray-100">
      <div className=" relative w-full max-w-xl bg-[#D9D9D9] rounded-lg shadow-md p-6">
        <div className="absolute top-0 right-0 bottom-0 w-2 bg-[#21506E]"></div>
        <div className="absolute bottom-0 right-0 left-0 h-2 bg-[#21506E]"></div>
        <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl text-[#21506E] font-bold text-center mb-6">The Unity Wave!</h2>
        <h3 className="text-3xl text-[#21506E] font-bold text-center mb-6">LogIn</h3>
        {message && <p className="text-center text-green-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-2 mt-2  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mt-10">
            <button className="w-full px-4 py-2 text-white bg-[#21506E] rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              Login
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <a href="#" className="text-[#21506E] hover:underline">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
