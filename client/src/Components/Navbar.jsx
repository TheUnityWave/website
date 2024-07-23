import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Images/logo.png';
import { Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (sectionId) => {
    if (typeof window.scrollToSection === 'function') {
      window.scrollToSection(sectionId);
    }
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    toast.success("Logged out successfully");
  }

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser(token);
        setUser(userData);
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [location]); // Re-run when location changes, which includes login/logout actions

  async function getCurrentUser(token) {
    try {
      const response = await fetch('http://localhost:5000/api/employee/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  const renderUserInfo = () => {
    if (user) {
      return (
        <div className="flex items-center gap-4">
          {(user.isAdmin) ?
            <button className='bg-green-500 hover:bg-green-300 transition px-4 py-2 rounded-md'>ADMIN</button>
            :
            <div></div>

          }
          <img
            src={user.EmployeePhoto}
            alt={user.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{user.firstName} {user.lastName}</span>
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>

          <div>
            {(user.isAdmin) ?

              <Link to="/admin/job-applications" className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary/80 transition cursor-pointer'>
                Admin Dashboard
              </Link>
              :
              <Link to="/employee/verification" className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary/80 transition cursor-pointer'>
                Employee Dashboard
              </Link>

            }
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <div className='bg-white h-20 shadow-md font-primary border-primary fixed w-full flex justify-between items-center px-12 md:px-24 py-3 z-50'>
        <Link to="/">
          <img src={Logo} alt='logo' className='h-20' />
        </Link>

        <div onClick={toggleMenu} className='block md:hidden cursor-pointer'>
          {isMenuOpen ? <X size={35} /> : <Menu size={35} />}
        </div>
        <ul className='navbar-links hidden md:flex justify-center items-center gap-12 text-md'>
          {!localStorage.getItem('token') ?
            <>
              <li className='hover:text-primary transition cursor-pointer'><Link to="/">Home</Link></li>
              <li className='hover:text-primary transition cursor-pointer'><Link to="/about">About Us</Link></li>
              <li className='hover:text-primary transition cursor-pointer' onClick={() => handleNavigation('services')}>Services</li>
              <li className='hover:text-primary transition cursor-pointer'><Link to="/career">Career</Link></li>
              <li onClick={() => handleNavigation('getintouch')} className='btn'>
                Get in Touch
              </li>
              <li>
                <Link to="/login" className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary/80 transition cursor-pointer'>
                  Login as Employee
                </Link>

              </li>
            </>
            :
            <>
              <li>
                {renderUserInfo()}
              </li>
              <li>
                <Link onClick={handleLogout} to="/" className="hover:bg-primary p-2 px-4 rounded mt-4">
                  Logout
                </Link>
              </li>
            </>
          }
        </ul>
      </div>
      <div className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-700 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className='flex flex-col items-center justify-center h-full font-primary'>
          <ul className='text-center flex flex-col items-center justify-center h-full gap-6'>
            <li ><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li ><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
            <li onClick={() => handleNavigation('services')}>Services</li>
            <li ><Link to="/career" onClick={toggleMenu}>Career</Link></li>
            <li className='btn my-4' onClick={() => handleNavigation('getintouch')}>

              Get in Touch

            </li>
            <li className='my-4'>
              <Link to="/login" onClick={toggleMenu} className='btn bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/80 transition cursor-pointer'>
                Login as Employee
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
