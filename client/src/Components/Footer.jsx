import logo from '../Images/logo.png';
import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import RaiseTicketModal from './RaiseTicketModal';

const Footer = () => {
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const toggleChangePassword = () => {
        setIsChangePasswordOpen(!isChangePasswordOpen);
    }
    return (
        <footer className="bg-primary text-white text-sm">
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
                            <Link to='https://www.facebook.com/people/UNITY-WAVE/61563984818651/'target='_blank' rel="noreferrer" className="mr-8">
                                <Facebook />
                            </Link>
                            {/* <Link to='' className="mr-8">
                                <Youtube />
                                </Link> */}
                            <Link to='https://www.linkedin.com/company/theunitywave' target='_blank' rel="noreferrer" className='mr-8'>
                                <Linkedin />
                            </Link>
                            <Link to='https://www.instagram.com/theunitywave_/' target='_blank' rel="noreferrer" className="mr-8">
                                <Instagram />
                            </Link>
                        </div>
                    </div>
                    <div className='w-2/4 flex flex-wrap justify-between'>
                        <div className="mx-5 md:w-1/4 mb-6 md:mb-0">
                            <h3 className="font-bold mb-2 text-md">Our Services</h3>
                            <ul>
                                <li><Link to='/service/soft-services' className="hover:underline">Soft Services</Link></li>
                                <li><Link to='/service/business-support-manpower' className="hover:underline">Business Services</Link></li>
                                {/* <li><Link to='/service/technical-services' className="hover:underline">Technical Services</Link></li> */}
                                <li><Link to='/service/cleaning-rental-equipment' className="hover:underline">Cleaning/Rental Equipments</Link></li>
                                <li><Link to='/service/wedding-event-services' className="hover:underline">Event Services</Link></li>
                                <li><Link to='/service/pest-control-services' className="hover:underline">Pest Control Services</Link></li>
                            </ul>
                        </div>
                        <div className="mx-5 md:w-1/4 mb-6 md:mb-0">
                            <h3 className="font-bold mb-2 text-md">Quick Links</h3>
                            <ul>
                                {/* <li><Link to='/about' className="hover:underline">About</Link></li> */}
                                {/* <li><Link to="/why-us" className="hover:underline">Why Us</Link></li> */}
                                <li><Link to='/blogs' className="hover:underline">Blogs</Link></li>
                                <li><Link to='/career' className="hover:underline">Career</Link></li>
                                <li><Link to='/' className="hover:underline">Compliances</Link></li>
                                <li><a href='https://superb-notify-d75.notion.site/Privacy-Policy-The-Unity-Wave-2caa680e1e3b44b0b748ebd36b6838ae' target='_blank' rel="noreferrer" className="hover:underline">Policy</a></li>
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
                            <h3 className="font-bold mb-2 text-md">Sectors We Serve</h3>
                            <ul>
                                <li><Link to='/service/technical-services' className="hover:underline">Technology</Link></li>
                                <li><Link to='' className="hover:underline">Healthcare</Link></li>
                                <li><Link to='/service/business-support-manpower' className="hover:underline">Business</Link></li>
                                <li><Link to='' className="hover:underline">Construction</Link></li>
                                <li><Link to='/service/wedding-event-services' className="hover:underline">Events</Link></li>
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
