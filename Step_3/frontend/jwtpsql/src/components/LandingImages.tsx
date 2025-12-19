'use client';

import { gsap } from "gsap"
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';

const LandingImages = () => {
    const landImage1 = useRef<HTMLImageElement>(null);
    const landImage2 = useRef<HTMLImageElement>(null);
    
    useGSAP(() => {
        gsap.to(landImage1.current,
            { 
                scale: 1.25,
                opacity: 0.1,
                ease: 'none',
                scrollTrigger:{
                    trigger: landImage1.current,
                    start: 'top top',
                    end: 'bottom 10%',
                    scrub: true,
                    markers: true,
                }
            }
        )
        gsap.to(landImage2.current,
            { 
                scale: 1.25,
                opacity: 0.1,
                ease: 'none',
                scrollTrigger:{
                    trigger: landImage2.current,
                    start: 'top top',
                    end: 'bottom 10%',
                    scrub: true,
                    markers: true,
                }
            }
        )

    }, []);

  return (
    <>
        <Image ref={landImage1} src={'/app-data.svg'} width={400} height={500} alt="app-data" className='absolute top-[calc(30vh-250px)] left-[calc(30vw-200px)] w-[400px] h-[500px] z-[-10]'/>
        <Image ref={landImage2} src={'/finance-app.svg'} width={400} height={500} alt="app-data" className='absolute top-[calc(27.5vh-250px)] left-[calc(70vw-200px)] w-[400px] h-[500px] z-[-10]'/>
    </>
  )
}
export default LandingImages