'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const DeleteProfileButton = () => {
    // const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const { deleteProfile} = useAuth();
    // const router = useRouter();

    const handleClick = async () => {
        if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            return;
        }
        setLoading(true);
        await deleteProfile();
        setLoading(false);

    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
            {loading ? 'Deleting...' : 'Delete Account'}
        </button>
    );
};

export default DeleteProfileButton;