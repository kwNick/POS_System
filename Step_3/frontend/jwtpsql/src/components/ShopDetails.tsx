'use client';

import { useAuth } from "@/context/AuthContext";
import Shop from "@/lib/models/shopModel";
import { useEffect, useState } from "react";
import DeleteShopButton from "./DeleteShopButton";

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
    <div className="w-3/4 h-3/4 flex-col items-center justify-center">
        <h1>Name: {shop.name}</h1>
        <p>Location: {shop.location}</p>
        <DeleteShopButton shopId={shop.id.toString()} />
    </div>
  )
}
export default ShopDetails