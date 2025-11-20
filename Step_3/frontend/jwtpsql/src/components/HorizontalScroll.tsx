'use client';

import { Features } from "@/lib/lists/Features"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
    const horizScroll = useRef<HTMLDivElement>(null);

    useGSAP(()=>{
        gsap.to(horizScroll.current, {
            x: -(horizScroll.current!.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: horizScroll.current,
                start: "top 8%",
                end: () => `+=${horizScroll.current!.scrollWidth - window.innerWidth}`,
                scrub: true,
                pin: true,
                anticipatePin: 1,
            }
        });
    }, []);

  return (
    <div ref={horizScroll} className='w-max h-full flex items-start justify-center gap-x-8 px-[5%] pt-8 '>
        {
            Features.slice(2,5).map((feature, idx) => (
            <div key={feature.title} className='w-[90vw] h-[85vh] flex flex-col items-center justify-center bg-neutral-black border-1 border-primary-purple p-5 rounded-lg hover:shadow-md hover:shadow-primary-blue hover:scale-105 duration-300 overflow-hidden'>
                <h3 className='text-xl lg:text-2xl xl:text-3xl font-semibold mb-4'><sup className='text-sm'>{idx + 2}</sup>{feature.title}</h3>
                <p className='text-lg lg:text-xl xl:text-2xl text-neutral-gray'>{feature.description}</p>
            </div>
            ))
        }
    </div>
  )
}
export default HorizontalScroll