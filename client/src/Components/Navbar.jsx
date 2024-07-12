import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Images/logo.png'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Element with ID '${sectionId}' not found.`);
    }
  };

  return (
    <>
      <div className='bg-white h-24 shadow-md font-primary border-primary fixed w-full flex justify-between items-center px-12 md:px-24 py-3 z-50'>
        <Link to="/">
          <img src={Logo} alt='logo' className='h-24' />
        </Link>
        <div onClick={toggleMenu} className='block md:hidden cursor-pointer'>
          {isMenuOpen ? <X size={35} /> : <Menu size={35} />}
        </div>
        <ul className='navbar-links hidden md:flex justify-center items-center gap-12 text-md'>
          <li className='hover:text-primary transition cursor-pointer'><Link to="/">Home</Link></li>
          <li className='hover:text-primary transition cursor-pointer'>About Us</li>
          <li className='hover:text-primary transition cursor-pointer' onClick={() => scrollToSection('services')}>Services</li>
          <li className='hover:text-primary transition cursor-pointer'><Link to="/career">Career</Link></li>
          <li onClick={() => scrollToSection('getintouch')} className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer'>
            {/* <Link to="/contact" > */}
              Get in Touch
            {/* </Link> */}
          </li>
        </ul>
      </div>
      <div className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-700 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className='flex flex-col items-center justify-center h-full font-primary'>
          <ul className='text-center flex flex-col items-center justify-center h-full gap-6'>
            <li ><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li ><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
            <li ><Link to="/services" onClick={toggleMenu}>Services</Link></li>
            <li ><Link to="/career" onClick={toggleMenu}>Career</Link></li>
            <li className='my-4'>
              <Link to="/contact" onClick={toggleMenu} className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer'>
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}