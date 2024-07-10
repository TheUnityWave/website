import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import MainContent from './Components/Heropg'


function App() {
  return (
    <Router>
      <Navbar />
      <MainContent/>
    </Router>
  )
}

export default App