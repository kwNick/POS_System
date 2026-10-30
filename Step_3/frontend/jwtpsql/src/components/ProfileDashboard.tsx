'use client';

import { useAuth } from "@/context/AuthContext";
import DashboardUserData from "./DashboardUserData";
import DashboardShopData from "./DashboardShopData";
import DashboardAnalytics from "./DashboardAnalytics";
import Link from "next/link";
import DashboardUserAnalytics from "./DashboardUserAnalytics";
import { ShopDTO } from "@/lib/models/UserDataObject";
import { useEffect } from "react";
import DashboardPerShopAnalytics from "./DashboardPerShopAnalytics";

const ProfileDashboard = () => {
  const { user, userDataObject, fetchTopProductsUnits, fetchTopProductsRevenue, loading } = useAuth();
  console.log("user: ", user);
  console.log("userDataObject: ", userDataObject); // Why is userDataObject null? i added a useEffect in authContext that does auth checking when setting this value
  // console.log("TopProductsUnits: ",  fetchTopProductsUnits("3"));

  if (loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
  if (!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
  return (
    <>
        {(user && userDataObject) && (
          <>
            <div className="w-full h-[clamp(100px,10vh,400px)] flex items-center justify-start pb-1 lg:pb-3 ">
              <h1 className="text-7xl font-semibold mb-2 lg:mb-4">
                <span className="capitalize underline decoration-1">Hello, {userDataObject.userData.user.username}{" "}</span>

                <span className="text-xs">-{user.roles.map(r => r.name).join(", ")}</span>
              </h1>
            </div>

            <div className="w-full h-[65vh] flex flex-col bg-neutral-surface rounded-lg shadow-md shadow-neutral-white pb-1 lg:pb-3 ">
              <div className="w-full h-[65%] flex flex-col lg:flex-row gap-6 lg:gap-8 p-1">
                <DashboardUserData user={user} />

                <DashboardShopData user={user} />
              </div>

              {/* <DashboardUserAnalytics user={user} userDataObject={userDataObject} /> */}
              <div className="w-full h-full flex flex-wrap items-center justify-between p-1 px-4 bg-neutral-surface border-t-1 border-neutral-surface">
                <DashboardUserAnalytics user={user} userDataObject={userDataObject} />
              </div>
            </div>

            {/* // Make this vv <DashboardPerShopAnalytics user={user} userDataObject={userDataObject} /> */}
            <div className="w-full h-full flex flex-wrap items-start justify-around gap-4 lg:gap-8 pb-1 lg:pb-3 ">

              <DashboardPerShopAnalytics user={user} userDataObject={userDataObject} />

            </div>

            <div className="w-full min-h-[85vh] flex flex-col gap-12 lg:gap-14 p-2">

              {/* <ShopCharts /> Make This a component with charts that represent each shops transaction/revenue/sales overtime */}
              <div className="w-[calc(100%-1rem)] h-[75vh] flex items-center justify-center ">
                <div className="w-full h-[15%] flex items-center justify-center">
                  <h2>Sales Chart</h2>
                </div>

                <div className="w-full h-[85%] flex items-center justify-center border-1">

                </div>
              </div>

              <DashboardAnalytics user={user} userDataObject={userDataObject} />

            </div>
          </>
        )}
    </>
  )
}
export default ProfileDashboard