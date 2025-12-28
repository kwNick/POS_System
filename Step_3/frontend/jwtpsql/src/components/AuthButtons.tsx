'use client';

import Link from "next/link"
// import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap"

const AuthButtons = () => {
    const [isPending, setIsPending] = useState(false);
    const { user, role, logout } = useAuth();
    
    const authRef = useRef<HTMLDivElement>(null);

    // const router = useRouter();

    const handleSignout2 = async () => {
        setIsPending(true);
        logout();
        setIsPending(false);
        // router.replace('/');
        // router.refresh(); // Trigger a soft page reload after logout; If you don't want to use context
    };


    useGSAP(() => {
        const tl = gsap.timeline({stagger: 0.1});

        tl.from( authRef.current,
            { y: 20, opacity: 0, duration: 0.5 },
        );
    }, []);

    return (
        <>
            {/* Maybe Wrap each in Activity ${!user ? 'block' : 'hidden'}    ---    ${user ? 'block' : 'hidden'}*/}
            {/* <Activity mode={!user ? 'visible' : 'hidden'}> */}
                <div ref={authRef} className={`w-full h-full flex items-center justify-end gap-4`}>
                    {/* <Activity mode={role?.includes('ROLE_ADMIN') ? 'visible' : 'hidden'}> */}
                    <Link href="/login-client" className={`${!user ? 'block' : 'hidden'} hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4`}>
                        Login
                    </Link>
                    {/* </Activity> */}

                    {/* <Activity mode={role?.includes('ROLE_ADMIN') ? 'visible' : 'hidden'}> */}
                    <Link href="/register-client" className={`${!user ? 'block' : 'hidden'} hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4`}>
                        Register
                    </Link>
                    {/* </Activity> */}

                    {/* <Activity mode={role?.includes('ROLE_ADMIN') ? 'visible' : 'hidden'}> */}
                    <Link href={'/admin'} className={`${role?.includes('ROLE_ADMIN') ? 'block' : 'hidden'} hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4`}>
                        Admin
                    </Link>
                    {/* </Activity> */}

                    {/* <Activity mode={user ? 'visible' : 'hidden'}> */}
                    <Link href={'/dashboard'} className={`${user ? 'block' : 'hidden'} hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4`}>
                        Dashboard
                    </Link>
                    {/* </Activity> */}
                    <button
                        onClick={handleSignout2}
                        disabled={isPending}
                        className={`${user ? 'block' : 'hidden'} justify-end hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4 `}>
                        {isPending ? 'Logging Out...' : 'Logout'}
                    </button>
                </div>
            {/* </Activity> */}

        </>
    )
}
export default AuthButtons