import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Heropg from './Components/Heropg'


function App() {
  return (
    <Router>
      <Navbar />
      <Heropg/>
    </Router>
  )
}

export default App