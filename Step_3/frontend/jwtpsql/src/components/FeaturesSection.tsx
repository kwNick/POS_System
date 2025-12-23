'use client';

import { Features } from "@/lib/lists/Features"
import HorizontalScroll from "./HorizontalScroll"
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useRef } from "react";
import FeatureCard from "./FeatureCard";
import Image from "next/image";
// import circleScatter from '@/public/circle-scatter.svg';

const FeaturesSection = () => {
  
    const wrapperRef = useRef<HTMLElement>(null);
    const horizSections = (Features.slice(2).length-1) * 100;

    useGSAP(() => {
        gsap.set(wrapperRef.current, {height: `calc(280vh + ${horizSections}vw)`});


    }, []);

  return (
      // h-[calc(280vh+200vw)]
    <section ref={wrapperRef} className="  w-full flex flex-col items-center justify-center gap-y-8 pt-[2.5%] ">
      <div className='relative w-full h-[15vh] flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-blue p-5 '>
        <h1 className="text-neutral-white text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light underline underline-offset-4 decoration-primary-purple decoration-2 translate-x-[10vw] uppercase">
          Features
        </h1>
        <h2 className="text-neutral-gray text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw]">
          Everything you need to run your business.
        </h2>
      </div>

      {/* Vertical Scroll  -- --  bg-[url("/circle-scatter.svg")] bg-cover bg-center*/}
      <div className='relative w-full h-[200vh] flex flex-col items-center justify-center gap-y-8 pt-10'>
        <Image src={'/circle-scatter.svg'} width={1000} height={1000} alt="circle-scatter" className='absolute inset-0 w-full h-full z-[-10]' />

        <Image src={'/mesh-gradient-2.png'} width={400} height={500} alt="mesh-gradient-blue-purple" className='absolute -top-1/5 left-[30%] w-full h-full z-[-10] origin-left [filter:_blur(50px)] rotate-90 mix-blend-color'/>
        {
          Features.slice(0,2).map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} idx={idx} />
          ))
        }
      </div>
      
      {/* Horizontal Scroll */}
      <div className='relative w-full h-full flex '>
        <HorizontalScroll />
        
      </div>
        
    </section>
  )
}
export default FeaturesSection