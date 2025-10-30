'use client';
import { useAuth } from "@/context/AuthContext";
import Link from "next/link"

const AdminButton = () => {
    const { user, role } = useAuth();
    // console.log("roleToken: ", roleToken);

    return (
        <>
            <Link href={'/admin-dashboard'} className={`${role?.includes('ROLE_ADMIN') ? 'block' : 'hidden'} hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4`}>
                Admin
            </Link>
            <Link href={'/dashboard'} className={`${user ? 'block' : 'hidden'} hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4`}>
                Dashboard
            </Link>
        </>
    )
}
export default AdminButton