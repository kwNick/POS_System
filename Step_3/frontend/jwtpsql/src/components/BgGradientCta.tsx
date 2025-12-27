'use client';
import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import { useRef } from "react";

const BgGradientCta = () => {
  const gradientRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // GSAP animations can be added here if needed
    gsap.to( gradientRef.current, {
       backgroundImage: "linear-gradient(to top, rgb(0, 70, 255), transparent)",
        scrollTrigger: {
            trigger: gradientRef.current,
            start: "bottom bottom",
            end: "bottom 70%",
            scrub: true
        },
    });

  }, []);

  return (
    <div ref={gradientRef} className='absolute inset-0 bg-gradient-to-t from-neutral-white to-transparent bg-[length:_100%_70%] bg-bottom bg-no-repeat opacity-15'/>
  )
}
export default BgGradientCta