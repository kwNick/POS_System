'use client';

import { useAuth } from "@/context/AuthContext";
import Shop from "@/lib/models/shopModel";
import { useEffect, useState } from "react";
import DeleteShopButton from "./DeleteShopButton";
import Link from "next/link";

const ShopDetails = ({shopId}: {shopId: string}) => {
    const { fetchShop } = useAuth();

    const [shop, setShop] = useState<Shop | null>(null);


    useEffect(() => {
        const getShop = async () => {
            const shopData = await fetchShop(shopId);

            if (shopData) {
                setShop(shopData);
            }
        };

        getShop();

    }, []);


    if (!shop) {
        return <div>Loading...</div>;
    }
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
        <div className="w-full h-3/4 p-6 flex flex-col gap-6 text-xl md:text-2xl">
            <h1>Name: {shop.name}</h1>
            <p>Location: {shop.location}</p>
        </div>

        <div className="w-full h-1/4 p-4 flex items-center justify-center">
            <Link href={`/shops/${shop.id}/update`}>Update</Link>
            <DeleteShopButton shopId={shop.id.toString()} />
        </div>
    </div>
  )
}
export default ShopDetails