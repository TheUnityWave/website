import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import image from '../Images/heropgimg.png'
import mobimage from '../Images/mobimage.jpg'

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
      className={`heropg bg-primary h-[99vh] overflow-hidden text-white flex md:flex-row flex-col justify-between items-center relative`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: `url(${mobimage})`
        }}
      ></div>
      <div className="content md:ml-12 flex flex-col flex-1 gap-4 md:gap-8 py-10 px-6 z-10 ">
        <h1 ref={h1Ref} className='font-black text-5xl md:text-5xl'>The Unity Wave</h1>
        <p ref={contentRef} className='text-md '>
          Empowering Growth Through Secure and Efficient Facility Management: Our dedicated team of over 10,000 professionals ensures safe, comfortable, and functional spaces, enabling you to focus on value creation without risk or inefficiency.
        </p>
        <p ref={buttonRef} onClick={() => handleNavigation('services')} className='bg-white w-[7rem] text-sm text-primary px-4 py-3 rounded-lg hover:bg-[#DCEFFB] transition cursor-pointer'>
          Learn More
        </p>
      </div>
      <div className="image hidden md:block">
        <img src={image} alt='image' className='h-[100vh] object-cover ' />
      </div>
    </div>
  )
}