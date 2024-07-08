import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import WhyUs from './Components/WhyUs'


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <WhyUs />
      
    </Router>
  )
}

export default App