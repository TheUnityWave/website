import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import WhyUs from './Components/WhyUs'
import Careers from './Pages/Careers'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WhyUs />} />
        <Route path="/career" element={<Careers />} />
      </Routes>
    </Router>
  )
}

export default App