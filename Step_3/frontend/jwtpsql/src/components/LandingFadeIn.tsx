'use client';

import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Link from "next/link"
import { useRef } from "react";


const LandingFadeIn = () => {
    const posRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({stagger: 0.1});
        tl.from( posRef.current,
            { y: 50, opacity: 0, duration: 0.75 },
        ).from( textRef.current,
            { y: 50, opacity: 0, duration: 0.75 },
        ).from( buttonRef.current,
            { y: 50, opacity: 0, duration: 0.75 },
        );
    }, []);

  return (
    <>
        <div className='flex flex-col items-center justify-center gap-y-12'>

            <div ref={posRef} className="relative text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-widest uppercase perspective-near transform-3d -rotate-y-[12.5]">
                POS
                <h1 className="absolute top-0 left-[5%] text-cta text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-widest uppercase">
                POS
                </h1>
                <h1 className="absolute top-0 left-[10%] text-primary-purple text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-widest uppercase">
                POS
                </h1>
                <h1 className="absolute top-0 left-[15%] text-primary-blue text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-widest uppercase">
                POS
                </h1>
            </div>

            <h2 ref={textRef} className="text-neutral-gray text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase">
                Sales never been easier
            </h2>
        </div>

        <div ref={buttonRef} className='flex gap-5 '>
            <Link href={'#'} className='p-4 lg:p-6 border-1 border-primary-purple rounded-full uppercase hover:text-cta hover:text-shadow-sm hover:text-shadow-cta hover:shadow-sm hover:shadow-cta hover:scale-118 duration-300'>
                Get Started
            </Link>

            <Link href={'#'} className='p-4 lg:p-6 border-1 border-primary-purple bg-neutral-white rounded-full uppercase text-primary-purple hover:text-cta hover:bg-neutral-gray hover:text-shadow-sm hover:text-shadow-cta hover:shadow-sm hover:shadow-cta hover:scale-118 duration-300'>
                Learn More
            </Link>
        </div>
    </>
  )
}
export default LandingFadeIn