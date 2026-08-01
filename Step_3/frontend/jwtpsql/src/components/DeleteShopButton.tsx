'use client';

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useState} from "react";

const DeleteShopButton = ({ shopId }: { shopId: string }) => {
  const [loading, setLoading] = useState(false);
    const { deleteShop, user } = useAuth();
    const router = useRouter();
    const pathName = usePathname();
    // console.log("Current path:", pathName); // Log the current path for debugging

    const handleClick = async () => {
        if (!confirm("Are you sure you want to delete this shop? This action cannot be undone.")) {
            return;
        }
        setLoading(true);

        const success = await deleteShop(shopId);

        setLoading(false);

        if(success) {
            alert("Shop deleted successfully!");
            // router.back();
            if(pathName.startsWith('/shops/')){
                router.back();
            }
        }else {
            alert("Failed to delete shop.");
        }
        
    };

  return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
            {loading ? 'Deleting...' : 'Delete Shop'}
        </button>
  );
};
export default DeleteShopButton