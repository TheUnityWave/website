import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import WhyUs from './Components/WhyUs'
import Stats from './Pages/Stats'
import GetInTouch from './Pages/GetInTouch'
import Services from './Pages/Services'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='relative top-24 font-primary'>
        <Stats />
        <Services />
        <WhyUs />
        <GetInTouch/>
      </div>
    </BrowserRouter>
  )
}

export default App