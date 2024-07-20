import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import WhyUs from './Components/WhyUs';
import Careers from './Pages/Careers';
import Footer from './Components/Footer';
import Stats from './Pages/Stats';
import GetInTouch from './Pages/GetInTouch';
import Services from './Pages/Services';
import EmployeeVerification from './Pages/EmployeeVerification';
import AdminDashboard from './Pages/AdminDashboard';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className='relative top-24 font-primary'>
        <Routes>
          <Route path="/" element={
            <>
              <Stats />
              <Services />
              <WhyUs />
              <GetInTouch />
            </>
          } />
          <Route path="/career" element={<Careers />} />

          {/* <Route path="/employee-verification" element={<EmployeeVerification />} /> */}
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/employee/*" element={<EmployeeDashboard />} />
          <Route path="/login" element={<Login />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
