import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Images/logo.png';
import { Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';
import ChangePasswordModal from './ChangePasswordModal';

export default function Navbar() {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
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
    toggleMenu();
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
        <div className="flex md:flex-row flex-col items-center gap-4">
          {user.isAdmin ? (
            <button className='bg-green-500 hover:bg-green-300 transition px-4 py-2 rounded-md'>ADMIN</button>
          ) : (
            <div></div>
          )}
          <img
            src={user.EmployeePhoto}
            alt={user.firstName}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{user.firstName} {user.lastName}</span>
            <span className="text-sm text-gray-600">{user.email}</span>
            <span className="text-sm text-gray-600">{user.mobile}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const toggleChangePassword = () => {
    toggleMenu();
    setIsChangePasswordOpen(!isChangePasswordOpen);
  }

  return (
    <>
      <div className='bg-white m-auto h-16 shadow-md font-primary border-primary fixed w-full flex justify-between items-center px-6 md:px-20 py-3 z-50'>
        <Link to="/">
          <img src={Logo} alt='logo' className='h-16' />
        </Link>

        <div onClick={toggleMenu} className='block md:hidden cursor-pointer'>
          {isMenuOpen ? <X size={35} /> : <Menu size={35} />}
        </div>
        <ul className='navbar-links hidden md:flex justify-center items-center gap-12 text-sm'>
          {!localStorage.getItem('token') || location.pathname === '/' || location.pathname === '/career' || location.pathname === '/about' || location.pathname.startsWith('/service/') ? (
            <>
              <li className='hover:text-primary transition cursor-pointer'><Link to="/">Home</Link></li>
              <li className='hover:text-primary transition cursor-pointer'  onClick={() => handleNavigation('about')}>About Us</li>
              <li className='hover:text-primary transition cursor-pointer' onClick={() => handleNavigation('services')}>Services</li>        
              {/* <li className='hover:text-primary transition cursor-pointer'><Link to="/why-us">Why Us</Link></li> */}
              <li className='hover:text-primary transition cursor-pointer'><Link to="/blogs">Blogs</Link></li>
              <li className='hover:text-primary transition cursor-pointer'><Link to="/career">Career</Link></li>
              <li onClick={() => handleNavigation('getintouch')} className='btn'>
                Get in Touch
              </li>
              <li>
                {!localStorage.getItem('token') ? (
                  <Link to="/login" className='btn bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary/80 transition cursor-pointer'>
                    Login as Employee
                  </Link>
                ) : (
                  user && (user.isAdmin ? (
                    <Link to="/admin/job-applications" className='btn bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary/80 transition cursor-pointer'>
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link to="/employee/verification" className='btn bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary/80 transition cursor-pointer'>
                      Employee Dashboard
                    </Link>
                  ))
                )}
              </li>
            </>
          ) : (
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
          )}
        </ul>
      </div>

      {/* SMALL DEVICE */}
      <div className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-700 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className='flex flex-col items-center justify-center h-full font-primary'>
          <ul className='text-center flex flex-col items-center justify-center h-full gap-6'>
            {!localStorage.getItem('token') || location.pathname === '/' || location.pathname === '/career' || location.pathname.startsWith('/blogs') || location.pathname === '/about' || location.pathname.startsWith('/service/') ? (
              <>
                <li ><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li ><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
                <li onClick={() => handleNavigation('services')}>Services</li>
                <li ><Link to="/blogs" onClick={toggleMenu}>Blogs</Link></li>
                <li ><Link to="/career" onClick={toggleMenu}>Career</Link></li>
                <li className='btn my-4' onClick={() => handleNavigation('getintouch')}>
                  Get in Touch
                </li>

                <li>
                  {!localStorage.getItem('token') ? (
                    <Link to="/login" onClick={toggleMenu} className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary/80 transition cursor-pointer'>
                      Login as Employee
                    </Link>
                  ) : (
                    user && (user.isAdmin ? (
                      <Link to="/admin/job-applications" onClick={toggleMenu} className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary/80 transition cursor-pointer'>
                        Admin Dashboard
                      </Link>
                    ) : (
                      <Link to="/employee/verification" onClick={toggleMenu} className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary/80 transition cursor-pointer'>
                        Employee Dashboard
                      </Link>
                    ))
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  {renderUserInfo()}
                </li>
                <li>
                  <Link onClick={toggleChangePassword} className="hover:bg-primary p-2 px-4 rounded mt-4">
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout} to="/" className="hover:bg-primary p-2 px-4 rounded mt-4">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {isChangePasswordOpen && (
          <ChangePasswordModal onClose={toggleChangePassword} />
        )}
      </div>
    </>
  );
}
