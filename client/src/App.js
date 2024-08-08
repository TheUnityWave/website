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
import HeroPg from './Pages/HeroPg';
import Login from './Pages/Login';
import EmployeeVerification from './Pages/EmployeeVerification';
import AdminDashboard from './Pages/AdminPages/AdminDashboard';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import ToastNotifications from './Components/ToastNotifications';
import AboutUs from './Pages/AboutUs'
import Blogs from './Pages/Blogs'
import BlogDetail from './Pages/BlogDetail';
import Jobs from './Pages/Jobs'
import JobDetailPage from './Pages/JobDetail'

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
      <ToastNotifications />
      <ScrollManager />
      <Navbar />
      <div className='relative top-16 font-primary overflow-x-hidden'>
        <Routes>
          <Route path="/" element={
            <>
              <HeroPg />
              <AboutUs/>
              <Stats />
              <Services />
              <WhyUs />
              <Testimonials />
              <GetInTouch />
            </>
          } />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/career" element={<Jobs />} />
          <Route path="/api/careers/:id" element={<JobDetailPage/>} />
          <Route path="/careers/apply" element={<Careers/>} />
          <Route path="/service/:serviceId" element={<ServiceDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/employee/*" element={<EmployeeDashboard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
