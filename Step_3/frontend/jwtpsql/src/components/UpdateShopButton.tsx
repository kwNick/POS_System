'use client';

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const UpdateShopButton = ({ name, location, shopId }: { name: string, location: string, shopId: string }) => {
  const [loading, setLoading] = useState(false);
    const { updateShop, user } = useAuth();
    const router = useRouter();
    const pathName = usePathname();
    // console.log("Current path:", pathName); // Log the current path for debugging

    const handleClick = async () => {
        if (!confirm("Are you sure you want to update this shop? This action cannot be undone.")) {
            return;
        }
        setLoading(true);

        const success = await updateShop(name, location, shopId);

        setLoading(false);

        if(success) {
            alert("Shop updated successfully!");
            // router.back();
            if(pathName.startsWith('/shops/')){
                router.back();
            }
        }else {
            alert("Failed to update shop.");
        }
        
    };

  return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 hover:scale-110 duration-300 rounded disabled:opacity-50"
        >
            {loading ? 'Updating...' : 'Update'}
        </button>
  );
};

export default UpdateShopButton