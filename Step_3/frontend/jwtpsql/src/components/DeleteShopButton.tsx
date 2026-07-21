'use client';

import { useAuth } from "@/context/AuthContext";
import { useTransition } from "react";

const DeleteShopButton = ({ shopId }: { shopId: string }) => {
    const [isPending, startTransition] = useTransition();
    const { deleteShop } = useAuth();

    const handleClick = () => {
        startTransition(() => {
            deleteShop(shopId);
        });
    };

  return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
            {isPending ? 'Deleting...' : 'Delete Shop'}
        </button>
  );
};
export default DeleteShopButton