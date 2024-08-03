import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const AboutUs = () => {
    const containerRef = useRef(null)
  const taglineRef = useRef(null)
  const headingRef = useRef(null)
  const headingVRef = useRef(null)
  const contentRef = useRef(null)
  const contentVRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    })

    .fromTo(taglineRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo([headingRef.current, headingVRef.current], 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.5 }
    )
    .fromTo([contentRef.current,contentVRef.current], 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, duration: 0.5 }
    )

  }, [])

    return (
        <div ref={containerRef} className="w-full bg-[#d0e3ff] py-12 items-center font-primary" id='about'>
            {/* Header Section */}
            <header className="text-center pt-12 px-20 w-full text-white">
                <h1 className="text-2xl text-primary font-bold ">At the core of our existence is shared vision to reflect integrity in all our engagements.</h1>
                <p ref={taglineRef} className="italic text-black text-xl mt-5">“Doing things differently”</p>
            </header>

            <div className="flex flex-col md:flex-row w-full h-auto bg-[#d0e3ff] py-8">
                <div className="w-full md:w-1/2 h-auto flex items-center justify-center p-8 mb-0">
                    <div className="text-center md:text-left max-w-lg">
                        <h2 ref={headingVRef} className="text-2xl font-bold text-[#21506E]">Our Vision</h2>
                        <p ref={contentVRef} className="text-[#6B7280] mt-4">
                        To set the standard for excellence in facility management, providing innovative, reliable, and sustainable solutions that exceed our clients' expectations and contribute to their success.
                        </p>
                    </div>
                </div>
                <div className="w-full md:border-l-[2px] border-white md:w-1/2 h-auto flex items-center justify-center p-8 mb-0">
                    <div className="text-center md:text-left max-w-lg">
                        <h2 ref={headingRef} className="text-2xl font-bold text-[#21506E]">Our Mission</h2>
                        <p ref={contentRef} className="text-[#6B7280] mt-4">
                        We are dedicated to providing top-tier facility management services that ensure the operational excellence, safety, and sustainability of our clients' properties, fostering environments where people can work, live, and thrive.    
                        </p>
                    </div>
                </div>
            </div>
    </div >
    )
}
export default AboutUs;
