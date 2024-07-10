import React from 'react'
import StatsCard from '../Components/StatsCard'
export default function Stats() {
  return (
    <div className='stats-container bg-primary px-24 py-12 flex justify-center items-center flex-col gap-8'>
        <h1 className='title font-primary text-center text-4xl font-bold text-white'>
            Our Company's Stats Speak for Themselves
        </h1>
        <div className="statcards flex flex-col md:flex-row items-center justify-center gap-10">

        <StatsCard count="50+" text="Cities" />
        <StatsCard count="150+" text="Happy Customers"/>
        <StatsCard count="250+" text="Employees"/>
        <StatsCard count="50+" text="Client Location"/>
        </div>
    </div>
  )
}
