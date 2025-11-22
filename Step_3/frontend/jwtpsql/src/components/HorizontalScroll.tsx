'use client';

import { Features } from "@/lib/lists/Features"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import FeatureCard from "./FeatureCard";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
    const horizScroll = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

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

        gsap.to(imageRef.current, {
            // rotation: 360,
            x: (horizScroll.current!.scrollWidth - window.innerHeight),
            ease: "none",
            scrollTrigger: {
                trigger: horizScroll.current,
                start: "top 8%",
                end: () => `+=${horizScroll.current!.scrollWidth - window.innerWidth}`,
                scrub: true,
                // pin: true,
                // anticipatePin: 1,
            }
        }
        );

    }, []);

  return (
    <div ref={horizScroll} className='relative w-max h-full flex items-start justify-center gap-x-8 px-[5%] pt-8 '>
        <Image ref={imageRef} src={'/mesh-gradient-2.png'} width={400} height={500} alt="mesh-gradient-blue-purple" className='absolute top-0 left-0 w-[33vw] h-[33vh] z-[-10] [filter:_blur(50px)] mix-blend-color'/>

        {
            Features.slice(2,5).map((feature, idx) => (
                <FeatureCard key={idx} feature={feature} idx={idx + 2} />
            ))
        }
    </div>
  )
}
export default HorizontalScroll