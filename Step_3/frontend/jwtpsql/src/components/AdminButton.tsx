'use client';
import { useAuth } from "@/context/AuthContext";
import Link from "next/link"
// import {Activity} from 'react';

const AdminButton = () => {
    const { user, role } = useAuth();
    // console.log("roleToken: ", roleToken);

    return (
        <>
        {/* Maybe Wrap each in Activity ${role?.includes('ROLE_ADMIN') ? 'block' : 'hidden'}  -    ${user ? 'block' : 'hidden'}*/}
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
        </>
    )
}
export default AdminButton