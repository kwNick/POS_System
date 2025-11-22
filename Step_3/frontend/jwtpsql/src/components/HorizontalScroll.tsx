'use client';

import { Features } from "@/lib/lists/Features"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import FeatureCard from "./FeatureCard";

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
                <FeatureCard key={idx} feature={feature} idx={idx + 2} />
            ))
        }
    </div>
  )
}
export default HorizontalScroll