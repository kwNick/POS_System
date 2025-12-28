// 'use client';

// import { useGSAP } from '@gsap/react';
// import { useRef } from 'react';

const GradientHovers = () => {

    // const gradRef = useRef<HTMLDivElement>(null);

    // useGSAP(() => {
    //     const grads = document.querySelectorAll('.gradient-hover');
    //     grads.forEach((grad, index) => {
    //         grads.to(grad, {
    //             opacity: 1,
                
    //         })
    //     });

    // }, []);

  return (
    <>
        <div className="gradient-hover absolute inset-0 translate-y-[25%] rounded-xl bg-gradient-to-t from-0% from-neutral-white to-transparent to-50% pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-400" />

        <div className="gradient-hover absolute inset-0 translate-y-[25%] rounded-xl bg-gradient-to-t from-0% from-accent-purple to-transparent to-65% pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-400" />
    </>
  )
}
export default GradientHovers