'use client';
import { useAuth } from "@/context/AuthContext";
import Shop from "@/lib/models/shopModel";
import Link from "next/link";

const ShopsList = () => {
    const {user, loading} = useAuth();

    if(loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
    if(!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
  return (
    <div>
        {user && (
            <div>
                {user?.shops.length > 0 ? (
                    <ul>
                        {user?.shops.map((shop: Shop) => (
                            <div key={shop.name} >
                                <Link href={`/shops/${shop.id}`} key={shop.name}>
                                        <li className="italic" >{shop.name} - {shop.location}</li>
                                </Link>
                                {/* <DeleteShopButton shopId={shop.id.toString()} /> */}
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