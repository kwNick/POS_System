'use client';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react"
import { useRef } from "react";

const BgPricingSection = () => {

    const blobRefContainer = useRef<HTMLDivElement>(null);
    const gradientRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // GSAP animations can be added here if needed
        const images = blobRefContainer.current?.querySelectorAll('.blob-scale');

        images?.forEach((image, index) => {
            const delay = index * 0.2; // Stagger the animations
        
            if(index%2 === 0){
                gsap.to(image, {
                    scale: 2.0,
                    scrollTrigger: {
                        trigger: blobRefContainer.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }
        
            if(index%2 !== 0){
                gsap.to(image, {
                    scale: 0.25,
                    scrollTrigger: {
                        trigger: blobRefContainer.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }
        });

        // gsap.to(gradientRef.current, {
        //     "--from-color": "rgb(69, 6, 147)",
        //     scrollTrigger: {
        //         trigger: gradientRef.current,
        //     },
        // });

        gsap.to(gradientRef.current, {
           backgroundImage: "linear-gradient(to bottom, rgb(69, 6, 147), transparent)",
            scrollTrigger: {
                trigger: gradientRef.current,
                start: "top 20%",
                end: "bottom top",
                scrub: true,
            },
        });

    }, []);

  return (
    <div ref={gradientRef} className='absolute inset-0 bg-gradient-to-b from-neutral-white to-transparent opacity-50'>
        <div ref={blobRefContainer} className="relative w-full h-full">
            <span  className="blob-scale absolute rounded-full bg-accent-purple w-[10vw] h-[10vw] left-[-5vw] top-[10%]" />
            <span className="blob-scale absolute rounded-full bg-accent-purple w-[20vw] h-[20vw] right-[-5vw] top-[20%]" />
            <span className="blob-scale absolute rounded-full bg-accent-purple w-[5vw] h-[5vw] left-[5vw] bottom-[20%]" />
            <span className="blob-scale absolute rounded-full bg-accent-purple w-[10vw] h-[10vw] right-[-5vw] bottom-[10%]" />
            <span className="blob-scale absolute rounded-full bg-accent-purple w-[5vw] h-[5vw] right-[40vw] bottom-[10%]" />
        </div>
    </div>
  )
}
export default BgPricingSection