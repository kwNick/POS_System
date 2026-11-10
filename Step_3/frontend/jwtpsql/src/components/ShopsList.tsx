'use client';

import { useAuth } from "@/context/AuthContext";
import Shop from "@/lib/models/shopModel";
import Link from "next/link";
import DeleteShopButton from "./DeleteShopButton";
import UpdateShopLink from "./UpdateShopLink";
import RevenueChartUpgradeTotalAllShops from "./RevenueChartUpgradeTotalAllShops";
import DashboardPerShopAnalytics from "./DashboardPerShopAnalytics";

const ShopsList = () => {
    const {user, userDataObject, loading} = useAuth();

    if(loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
    if(!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 h-[90%] min-h-[25vh] w-[90%] py-2">
        {user && (
            <>
                <div className="flex flex-col items-center justify-center h-[90%] min-h-[50%] w-full py-2">
                    {user?.shops.length > 0 ? (
                        <ul className="w-full flex flex-col items-center justify-center h-[90%] py-2">
                            {user?.shops.map((shop: Shop) => (
                                <div key={shop.name} className="w-full flex flex-row items-center justify-between gap-4 border-b-1 py-2">
                                    <Link href={`/shops/${shop.id}`} key={shop.name} className="w-full ">
                                            <li className="italic underline font-semibold" >{shop.name} - {shop.location}</li>
                                    </Link>
                                    <div className="flex gap-4 lg:gap-8">
                                        <UpdateShopLink shopId={shop.id} />
                                        <DeleteShopButton shopId={shop.id.toString()} />
                                    </div>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-2xl xl:text-3xl font-semibold">You have no shops.</p>
                    )}
                </div>

                <div className="w-[calc(100%-1rem)] h-[85vh] flex flex-col items-center justify-center ">
                    <div className="w-full h-[15%] flex items-center justify-center">
                        <h2>Sales Chart</h2>
                    </div>

                    <div  className="w-full h-full flex items-center justify-center ">
                        <RevenueChartUpgradeTotalAllShops userId={userDataObject?.userData.user.id ?? null} />
                    </div>
                </div>

                <div className="w-full h-full flex flex-wrap items-start justify-between gap-4 lg:gap-8 pb-1 lg:pb-3 ">
                    <DashboardPerShopAnalytics user={user} userDataObject={userDataObject} />

                </div>
            </>
        )}

        
    </div>
  )
}
export default ShopsList