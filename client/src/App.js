import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Stats from './Pages/Stats'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='relative top-24 '>
        <Stats />
      </div>
    </BrowserRouter>
  )
}

export default App