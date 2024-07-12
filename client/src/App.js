import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Login from './Components/login';
import Signup from './Components/signup';
import MainContent from './Components/Heropg';


function App() {
  return (
    <Router>
      <Navbar />
      <MainContent/>
      <Signup/>
      <Login/>
    </Router>
  )
}

export default App
