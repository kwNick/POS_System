'use client';

import { Features } from "@/lib/lists/Features"
import HorizontalScroll from "./HorizontalScroll"
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useRef } from "react";

const FeaturesSection = () => {
    const wrapperRef = useRef<HTMLElement>(null);
    const horizSections = (Features.slice(2).length-1) * 100;
    useGSAP(() => {
        gsap.set(wrapperRef.current, {height: `calc(280vh + ${horizSections}vw)`});
    }, []);

  return (
                            // h-[calc(280vh+200vw)]
    <section ref={wrapperRef} className="  w-full flex flex-col items-center justify-center gap-y-8 py-[2.5%]">
          <div className='relative w-full h-[15vh] flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-blue p-5'>
            <h1 className="text-neutral-white text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light underline underline-offset-4 decoration-primary-purple decoration-2 translate-x-[10vw] uppercase">
              Features
            </h1>
            <h2 className="text-neutral-gray text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw]">
              Everything you need to run your business.
            </h2>
          </div>

          {/* Vertical Scroll */}
          <div className='w-full h-[200vh] flex flex-col items-center justify-center gap-y-8 pt-10'>
            {
              Features.slice(0,2).map((feature, idx) => (
                <div key={feature.title} className='w-[90vw] h-[85vh] flex flex-col items-start justify-center bg-neutral-black border-1 border-primary-purple p-5 rounded-lg hover:shadow-md hover:shadow-primary-blue hover:scale-105 duration-300 overflow-hidden'>
                  <h3 className='text-xl lg:text-2xl xl:text-3xl font-semibold mb-4'><sup className='text-sm'>{idx}</sup>{feature.title}</h3>
                  <p className='text-lg lg:text-xl xl:text-2xl text-neutral-gray'>{feature.description}</p>
                </div>
              ))
            }
          </div>

          {/* Horizontal Scroll */}
          {/* <div className='w-full h-full overflow-x-hidden flex '>
            <div className='w-max h-full flex items-center justify-around gap-x-8 px-[5%] '>
                {
                  Features.slice(2,5).map((feature, idx) => (
                    <div key={feature.title} className='w-[90vw] h-[80vh] flex flex-col items-start justify-center bg-neutral-black border-1 border-primary-purple p-5 rounded-lg hover:shadow-md hover:shadow-primary-blue hover:scale-105 duration-300 overflow-hidden'>
                      <h3 className='text-xl lg:text-2xl xl:text-3xl font-semibold mb-4'><sup className='text-sm'>{idx + 2}</sup>{feature.title}</h3>
                      <p className='text-lg lg:text-xl xl:text-2xl text-neutral-gray'>{feature.description}</p>
                    </div>
                  ))
                }
            </div>
          </div> */}
          
          {/* Horizontal Scroll */}
          <div className='w-full h-full overflow-hidden flex '>
            <HorizontalScroll />
          </div>

        </section>
  )
}
export default FeaturesSection