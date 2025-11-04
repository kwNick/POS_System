'use client';
import Link from "next/link"
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const AuthButtons = () => {
    const [isPending, startTransition] = useTransition();
    const { user, logout } = useAuth();

    const router = useRouter();

    const handleSignout2 = async () => {
        startTransition(() => {
            logout();
        });
        router.replace('/');
        // router.refresh(); // Trigger a soft page reload after logout; If you don't want to use context
    };

    return (
        <>
            {/* <LoginNavItems isLoggedIn={login} /> */}

            {/* Maybe Wrap each in Activity ${!user ? 'block' : 'hidden'}    ---    ${user ? 'block' : 'hidden'}*/}
            {/* <Activity mode={!user ? 'visible' : 'hidden'}> */}
                <div className={`${!user ? 'block' : 'hidden'} w-full h-full flex items-center justify-end gap-4`}>
                    <Link href="/login-client" className="hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4">
                        LoginClient
                    </Link>
                    <Link href="/register-client" className="hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4">
                        RegisterClient
                    </Link>
                    {/* <Link href="/login" className="hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4">
                        Login
                    </Link>
                    <Link href="/login-api" className="hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4">
                        LoginAPI
                    </Link> */}
                    {/* <Link href="/register" className="hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4">
                        Register
                    </Link>
                    <Link href="/register-api" className="hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4">
                        RegisterAPI
                    </Link> */}
                </div>
            {/* </Activity> */}

            {/* <Activity mode={user ? 'visible' : 'hidden'}> */}
                <div className={`${user ? 'block' : 'hidden'}`}>
                    <button
                        onClick={handleSignout2}
                        disabled={isPending}
                        className={` hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4 `}>
                        {isPending ? 'Logging Out...' : 'Logout'}
                    </button>
                </div>
            {/* </Activity> */}
        </>
    )
}
export default AuthButtons