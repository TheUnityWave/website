import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import  MainContent from './Components/Heropg'
import Signup from './Components/signup';
import Login from './Components/login';


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