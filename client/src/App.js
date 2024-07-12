import React, { useEffect, useCallback } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import WhyUs from './Components/WhyUs'
import Careers from './Pages/Careers'
import Footer from './Components/Footer'
import Stats from './Pages/Stats'
import GetInTouch from './Pages/GetInTouch'
import Services from './Pages/Services'
import ServiceDetails from './Pages/ServiceDetails'
import Testimonials from './Pages/Testimonials'

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  const scrollWithOffset = useCallback((elementId, offset = 100) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        scrollWithOffset(hash.slice(1));
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, scrollWithOffset]);

  // Expose a function to handle scrolling
  window.scrollToSection = (sectionId) => {
    if (sectionId === 'getintouch') {
      // Try to scroll to getintouch on the current page
      if (!scrollWithOffset(sectionId)) {
        // If getintouch doesn't exist on the current page, navigate to home
        navigate(`/#${sectionId}`);
      }
    } else if (pathname === '/') {
      scrollWithOffset(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return null;
}



function App() {
  return (
    <BrowserRouter>
    <ScrollManager />
    <Navbar />
    <div className='relative top-24 font-primary'>
      <Routes>
        <Route path="/" element={
          <>
            <Stats />
            <Services />
            <WhyUs />
            <Testimonials/>
          </>
        } />
        <Route path="/career" element={<Careers />} />
        <Route path="/service/:serviceId" element={<ServiceDetails/>} />
      </Routes>
      <GetInTouch/>
      <Footer />
    </div>
  </BrowserRouter>
  )
}

export default App
