import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StatsCard({ count, text }) {
    const countRef = useRef(null)
    const cardRef = useRef(null)

    useEffect(() => {
        const card = cardRef.current
        const countElement = countRef.current

        gsap.fromTo(countElement,
            { innerText: 2 },
            {
                innerText: count,
                duration: 1,
                snap: { innerText: 2 },
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    once: true
                },
                onUpdate: function () {
                    countElement.innerText = Math.ceil(this.targets()[0].innerText)
                }
            }
        )
    }, [count])

    return (
        <div ref={cardRef} className='bg-white font-primary rounded-xl h-[35vh] w-64 p-3 flex flex-col justify-center items-center gap-12 shadow-md shadow-white'>
            <div className='text-primary font-black text-7xl font-secondary'>
                <span ref={countRef}>
                    2
                </span>+
            </div>
            <div className='text-3xl text-center font-bold text-primary'>
                {text}
            </div>
        </div>
    )
}