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
    // const imageRef = useRef<HTMLImageElement>(null);
    const lineFill1 = useRef<HTMLDivElement>(null);
    const lineFill2 = useRef<HTMLDivElement>(null);
    // const fadeInButton = useRef<HTMLDivElement>(null);

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
                invalidateOnRefresh: true,
            }
        });

        // gsap.to(imageRef.current, {
        //     // rotation: 360,
        //     x: (horizScroll.current!.scrollWidth - window.innerHeight),
        //     ease: "none",
        //     scrollTrigger: {
        //         trigger: horizScroll.current,
        //         start: "top 8%",
        //         end: () => `+=${horizScroll.current!.scrollWidth - window.innerWidth}`,
        //         scrub: true,
        //         // pin: true,
        //         // anticipatePin: 1,
        //     }
        // });

        gsap.to(lineFill1.current, {
            scaleX: 1.25,
            ease: "none",
            scrollTrigger: {
                trigger: horizScroll.current,
                start: "top 8%",
                end: () => `+=${horizScroll.current!.scrollWidth - window.innerWidth}`,
                scrub: true,
                // pin: true,
                // anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        gsap.to(lineFill2.current, {
            scaleX: 1.25,
            ease: "none",
            scrollTrigger: {
                trigger: horizScroll.current,
                start: "top 8%",
                end: () => `+=${horizScroll.current!.scrollWidth - window.innerWidth}`,
                scrub: true,
                // pin: true,
                // anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        gsap.to(horizScroll.current, {
            scale: 0.75,
            ease: "none",
            scrollTrigger: {
                trigger: horizScroll.current,
                start: "top 8%",
                end: () => `+=${horizScroll.current!.scrollWidth - window.innerWidth}`,
                scrub: true,
                // pin: true,
                // anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        // gsap.from(fadeInButton.current, {
        //     opacity: 0,
        //     ease: "none",
        //     scrollTrigger: {
        //         trigger: fadeInButton.current,
        //         start: "top top",
        //         end: "top center",
        //         scrub: true,
        //         pin: true,
        //         // anticipatePin: 1,
        //         // invalidateOnRefresh: true,
        //     }
        // });

    }, []);

  return (
    <div ref={horizScroll} className='relative w-max h-screen flex items-center justify-center gap-x-10 lg:gap-x-14 xl:gap-x-16 pl-[5%] '>
        {/* <Image ref={imageRef} src={'/mesh-gradient-2.png'} width={400} height={500} alt="mesh-gradient-blue-purple" className='absolute top-0 left-0 w-[33vw] h-[33vh] z-[-10] [filter:_blur(50px)] mix-blend-color'/> */}
        <div ref={lineFill1} className="absolute h-1 w-full top-0 left-0 bg-accent-blue origin-left scale-x-0" />
        <div ref={lineFill2} className="absolute h-1 w-full bottom-0 right-[-25%] bg-accent-blue origin-right scale-x-0" />

        {
            Features.slice(2,Features.length).map((feature, idx) => (
                <FeatureCard key={idx} feature={feature} idx={idx + 2} />
            ))
        }
        
    </div>
  )
}

export default HorizontalScroll