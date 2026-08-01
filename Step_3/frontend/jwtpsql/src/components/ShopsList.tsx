'use client';
import { useAuth } from "@/context/AuthContext";
import Shop from "@/lib/models/shopModel";
import Link from "next/link";
import DeleteShopButton from "./DeleteShopButton";

const ShopsList = () => {
    const {user, loading} = useAuth();

    if(loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
    if(!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-3/4 py-2">
        {user && (
            <div className="flex flex-col items-center justify-center min-h-screen w-full py-2">
                {user?.shops.length > 0 ? (
                    <ul className="w-3/4 flex flex-col items-center justify-center min-h-screen py-2">
                        {user?.shops.map((shop: Shop) => (
                            <div key={shop.name} className="w-3/4 flex flex-row items-center justify-around gap-4">
                                <Link href={`/shops/${shop.id}`} key={shop.name}>
                                        <li className="italic underline" >{shop.name} - {shop.location}</li>
                                </Link>
                                <DeleteShopButton shopId={shop.id.toString()} />
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>You have no shops.</p>
                )}
            </div>
        )}
    </div>
  )
}
export default ShopsList