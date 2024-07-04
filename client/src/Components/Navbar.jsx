import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Images/logo.png'

export default function Navbar() {
  return (
    <div className='bg-white h-24 shadow-md border-primary fixed w-full flex justify-between items-center px-24 py-3 z-50'>
        <Link to="/">
          <img src={Logo} alt='logo' className='h-24'/>
        </Link>

        <ul className='navbar-links flex justify-center items-center gap-12 text-md'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/career">Career</Link></li>
          <li>
            <Link to="/contact" className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer'>
              Get in Touch
            </Link>
          </li>
        </ul>
    </div>
  )
}