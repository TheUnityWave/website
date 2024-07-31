import React, { useRef } from 'react'
import StatsCard from '../Components/StatsCard'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { animateTextWordByWord } from '../utils/titleAnimation';
gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const titleRef = useRef(null);

  useGSAP(() => {
    animateTextWordByWord(titleRef.current);

}, []);
  return (
    <div className='stats-container bg-primary px-24 py-12 flex justify-center items-center flex-col gap-8'>
        <h1 ref={titleRef} className='title font-primary text-center text-3xl font-bold text-white'>
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
