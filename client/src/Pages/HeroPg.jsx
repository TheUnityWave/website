import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import newimage from '../Images/new_face_of.jpg'
import mobimage from '../Images/mobimage.jpg'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function HeroPg() {
  const containerRef = useRef(null)
  const h1Ref = useRef(null)
  const contentRef = useRef(null)
  const buttonRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    })

    .fromTo(h1Ref.current, 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.5 }
    )
    .fromTo(contentRef.current, 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.5 }
    )
    .fromTo(buttonRef.current, 
      { opacity: 0}, 
      { opacity: 1, duration: 0.5 }
    )

  }, [])

  const handleNavigation = (sectionId) => {
    if (typeof window.scrollToSection === 'function') {
      window.scrollToSection(sectionId);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`heropg w-full bg-primary h-[100vh] overflow-hidden text-white flex md:flex-row flex-col justify-between items-center relative`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url(${newimage})`
        }}
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: `url(${mobimage})`
        }}
      ></div>
      <div className="content md:w-1/3 md:ml-12 flex flex-col  gap-4 md:gap-8 py-10 px-6 z-10 ">
        <h1 ref={h1Ref} className='font-black text-5xl md:text-5xl'>THE UNITY WAVE</h1>
        <p ref={contentRef} className='text-md '>
        Your facility is our priority. From cleaning to maintenance, our facility management services cover it all. We optimize spaces, prevent issues, and keep your premises fresh. Trust our expertise. We promise to provide a safe and welcoming environment that supports your business objectives.
        </p>
        <p ref={buttonRef} className='bg-white w-[7rem] text-sm text-primary px-4 py-3 rounded-lg hover:bg-[#DCEFFB] transition cursor-pointer'>
          <Link to='https://www.linkedin.com/company/theunitywave' target='_blank' rel="noreferrer">
          Learn More
          </Link>
        </p>
      </div>
      {/* <div className="image hidden md:block">
        <img src={image} alt='image' className='h-[100vh] object-cover ' />
      </div> */}
    </div>
  )
}
