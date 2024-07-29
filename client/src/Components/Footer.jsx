import logo from '../Images/logo.png';
import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import ChangePasswordModal from './ChangePasswordModal';
import RaiseTicketModal from './RaiseTicketModal';

const Footer = () => {
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const toggleChangePassword = () => {
        setIsChangePasswordOpen(!isChangePasswordOpen);
    }
    return (
        <footer className="bg-primary text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-wrap justify-between md:mx-16">
                    <div className="mx-5 w-auto md:w-1/4 mb-6 md:mb-0">
                        <img src={logo} alt="The Unity Wave" className="h-12" />
                        <address className="not-italic">
                            <h1 className='text-2xl font-semibold'>The Unity Wave</h1>
                            505, Udyog Vihar, Phase 3, 122022,<br />
                            Plot number 505, Gurugram, Haryana 122022, IN
                        </address>
                        <div className="flex mt-4">
                            <Link to='' className="mr-8">
                                <Facebook />
                            </Link>
                            <Link to='' className="mr-8">
                                <Instagram />
                            </Link>
                            <Link to='' className="mr-8">
                                <Youtube />
                            </Link>
                            <Link to='' className='mr-8'>
                                <Linkedin />
                            </Link>
                        </div>
                    </div>
                    <div className='w-2/4 flex flex-wrap justify-between'>
                        <div className="mx-5 md:w-1/4 mb-6 md:mb-0">
                            <h3 className="font-bold mb-2">Our Services</h3>
                            <ul>
                                <li><Link to='' className="hover:underline">Specialisation Services</Link></li>
                                <li><Link to='' className="hover:underline">Technical Services</Link></li>
                                <li><Link to='' className="hover:underline">Business Services</Link></li>
                                <li><Link to='' className="hover:underline">Soft Services</Link></li>
                            </ul>
                        </div>
                        <div className="mx-5 md:w-1/4 mb-6 md:mb-0">
                            <h3 className="font-bold mb-2">Quick Links</h3>
                            <ul>
                                <li><Link to='/about' className="hover:underline">About</Link></li>
                                <li><Link to='/' className="hover:underline">Policy</Link></li>
                                <li><Link to='/' className="hover:underline">Contact</Link></li>
                                <li><Link to='/blogs' className="hover:underline">Blogs</Link></li>
                                <li><Link to='/career' className="hover:underline">Career</Link></li>
                                <li>
                                    <NavLink onClick={toggleChangePassword} className="hover:underline opacity-100">
                                        Raise a Ticket
                                    </NavLink>
                                    {isChangePasswordOpen && (
                                        <RaiseTicketModal onClose={toggleChangePassword} />
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div className="mx-5 md:w-1/4 mb-6 md:mb-0">
                            <h3 className="font-bold mb-2">Sectors We Serve</h3>
                            <ul>
                                <li><Link to='' className="hover:underline">Technology</Link></li>
                                <li><Link to='' className="hover:underline">Healthcare</Link></li>
                                <li><Link to='' className="hover:underline">Business</Link></li>
                                <li><Link to='' className="hover:underline">Construction</Link></li>
                                <li><Link to='' className="hover:underline">Events</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white text-cyan-900 text-center py-4">
                &copy; 2024 The Unity Wave
            </div>
        </footer>
    );
}

export default Footer;
