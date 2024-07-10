import logo from '../Images/logo.png';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-cyan-900 text-white">
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
                            <a href="#" className="mr-4">
                                <img src="path-to-facebook-icon" alt="Facebook" />
                            </a>
                            <a href="#" className="mr-4">
                                <img src="path-to-linkedin-icon" alt="LinkedIn" />
                            </a>
                            <a href="#" className="mr-4">
                                <img src="path-to-youtube-icon" alt="YouTube" />
                            </a>
                            <a href="#">
                                <img src="path-to-instagram-icon" alt="Instagram" />
                            </a>
                        </div>
                    </div>
                    <div className='w-2/4 flex flex-wrap justify-between'>
                        <div className="mx-5 md:w-1/4 mb-6 md:mb-0">
                            <h3 className="font-bold mb-2">Our Services</h3>
                            <ul>
                                <li><a href="#" className="hover:underline">Specialisation Services</a></li>
                                <li><a href="#" className="hover:underline">Technical Services</a></li>
                                <li><a href="#" className="hover:underline">Business Services</a></li>
                                <li><a href="#" className="hover:underline">Soft Services</a></li>
                            </ul>
                        </div>
                        <div className="mx-5 md:w-1/4 mb-6 md:mb-0">
                            <h3 className="font-bold mb-2">Quick Links</h3>
                            <ul>
                                <li><a href="#" className="hover:underline">About</a></li>
                                <li><a href="#" className="hover:underline">Policy</a></li>
                                <li><a href="#" className="hover:underline">Contact</a></li>
                                <li><a href="#" className="hover:underline">Career</a></li>
                            </ul>
                        </div>
                        <div className="mx-5 md:w-1/4 mb-6 md:mb-0">
                            <h3 className="font-bold mb-2">Sectors We Serve</h3>
                            <ul>
                                <li><a href="#" className="hover:underline">Technology</a></li>
                                <li><a href="#" className="hover:underline">Healthcare</a></li>
                                <li><a href="#" className="hover:underline">Business</a></li>
                                <li><a href="#" className="hover:underline">Construction</a></li>
                                <li><a href="#" className="hover:underline">Events</a></li>
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
