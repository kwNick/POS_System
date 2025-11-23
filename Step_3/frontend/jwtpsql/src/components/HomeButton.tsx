'use client';

import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Link from "next/link"
import { useRef } from "react";

const HomeButton = () => {
    const homeRef = useRef<HTMLAnchorElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({stagger: 0.1});

        tl.from( homeRef.current,
            { y: 20, opacity: 0, duration: 0.5 },
        ).from( listRef.current,
            { y: 20, opacity: 0, duration: 0.5 },
        );

    }, []);

    return (
        <div className="w-1/2 h-full flex items-center justify-left gap-x-8">
            <Link ref={homeRef} href="/" className="group relative hover:text-neutral-gray duration-300 font-bold py-2 px-4 perspective-near transform-3d " >
                <p className="group-hover:animate-rotatey-repeat">
                    POS
                </p>
                <p className="opacity-0 absolute top-[0%] left-[5%] text-primary-blue py-2 px-4 group-hover:opacity-100 duration-300 group-hover:animate-rotatey-repeat" >
                    POS
                </p>
                <p className="opacity-0 absolute top-0 left-[10%] text-primary-purple py-2 px-4 group-hover:opacity-100 duration-300 group-hover:animate-rotatey-repeat" >
                    POS
                </p>
                <p className="opacity-0 absolute top-0 left-[15%] text-cta py-2 px-4 group-hover:opacity-100 duration-300 group-hover:animate-rotatey-repeat" >
                    POS
                </p>
            </Link>

            <div ref={listRef} className="w-fit h-full flex items-center justify-center">
                <ul className="w-fit flex items-center justify-center gap-x-6">
                    <li className="w-fit"><Link href={"#"}>Business Types</Link></li>
                    <li className="w-fit"><Link href={"#"}>Products</Link></li>
                    <li className="w-fit"><Link href={"#"}>Hardware</Link></li>
                    <li className="w-fit"><Link href={"#"}>Pricing</Link></li>
                </ul>
            </div>
        </div>
    )
}
export default HomeButton