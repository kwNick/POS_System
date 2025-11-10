'use client';
import Link from "next/link"
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const AuthButtons = () => {
    const [isPending, startTransition] = useTransition();
    const { user,role, logout } = useAuth();

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
            {/* Maybe Wrap each in Activity ${!user ? 'block' : 'hidden'}    ---    ${user ? 'block' : 'hidden'}*/}
            {/* <Activity mode={!user ? 'visible' : 'hidden'}> */}
                <div className={`w-full h-full flex items-center justify-end gap-4`}>
                    {/* <Activity mode={role?.includes('ROLE_ADMIN') ? 'visible' : 'hidden'}> */}
                    <Link href="/login-client" className={`${!user ? 'block' : 'hidden'} hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4`}>
                        LoginClient
                    </Link>
                    {/* </Activity> */}

                    {/* <Activity mode={role?.includes('ROLE_ADMIN') ? 'visible' : 'hidden'}> */}
                    <Link href="/register-client" className={`${!user ? 'block' : 'hidden'} hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4`}>
                        RegisterClient
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