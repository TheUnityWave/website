import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Login from './Components/login';
import Signup from './Components/signup';
import MainContent from './Components/Heropg';
import AboutUs from './Components/AboutUs';


function App() {
  return (
    <Router>
      <AboutUs/>
    </Router>
  )
}

export default App
