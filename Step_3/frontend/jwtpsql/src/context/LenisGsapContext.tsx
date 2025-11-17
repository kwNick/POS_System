'use client';

import Lenis from "lenis";
import { useEffect } from "react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisGsapContext = ({children}: { children: React.ReactNode}) => {

    useEffect(() => {

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        const lenisRaf = (time: number) => lenis.raf(time * 1000);

        gsap.ticker.add(lenisRaf);
        
        lenis.on('scroll', ScrollTrigger.update);

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            gsap.ticker.remove(lenisRaf);
            lenis.off('scroll', ScrollTrigger.update);
            lenis.destroy();
            ScrollTrigger.killAll?.();
        }
    }, []);

  return (
    <>
        {children}
    </>
    )
}
export default LenisGsapContext