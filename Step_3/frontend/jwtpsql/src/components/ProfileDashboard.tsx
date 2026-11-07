'use client';

import { useAuth } from "@/context/AuthContext";
import DashboardUserData from "./DashboardUserData";
import DashboardShopData from "./DashboardShopData";
import DashboardAnalytics from "./DashboardAnalytics";
import DashboardUserAnalytics from "./DashboardUserAnalytics";
import DashboardPerShopAnalytics from "./DashboardPerShopAnalytics";
import DashboardTopProductsPerAll from "./DashboardTopProductsPerAll";
import DashboardChart from "./DashboardChart";
import DashboardBarChart from "./DashboardBarChart";
import RevenueChart from "./RevenueChart";
import RevenueChartUpgrade from "./RevenueChartUpgrade";
import RevenueChartUpgradeTotal from "./RevenueChartUpgradeTotal";
import RevenueChartUpgradeTotalAllShops from "./RevenueChartUpgradeTotalAllShops";

const ProfileDashboard = () => {
  const { user, userDataObject,
    topProductsUnitsAllShops, topProductsRevenueAllShops,
    topProductsUnitsPerShop, topProductsRevenuePerShop,
    loading } = useAuth();
  console.log("user: ", user);
  console.log("userDataObject: ", userDataObject);
  console.log("TopProductsUnitsAllShops: ",  topProductsUnitsAllShops);
  console.log("TopProductsRevenueAllShops: ",  topProductsRevenueAllShops);
  console.log("TopProductsUnitsPerShop: ",  topProductsUnitsPerShop);
  console.log("TopProductsRevenuePerShop: ",  topProductsRevenuePerShop);


  if (loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
  if (!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
  return (
    <>
        {(user && userDataObject) && (
          <>
            <div className="w-full h-[clamp(100px,7vh,300px)] flex items-center justify-start pb-1 lg:pb-3 ">
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
                <DashboardUserAnalytics user={user} userDataObject={userDataObject} topProductsUnitsAllShops={topProductsUnitsAllShops} topProductsRevenueAllShops={topProductsRevenueAllShops} />
              </div>

            </div>

            {/* // Make this vv <DashboardPerShopAnalytics user={user} userDataObject={userDataObject} /> */}
            <div className="w-full h-full flex flex-wrap items-start justify-between gap-4 lg:gap-8 pb-1 lg:pb-3 ">
              <DashboardPerShopAnalytics user={user} userDataObject={userDataObject} />

            </div>

            <div className="w-full h-full flex flex-wrap items-center justify-start gap-4 lg:gap-8 pb-1 lg:pb-3 ">
              <DashboardTopProductsPerAll  topProductsUnitsAllShops={topProductsUnitsAllShops} topProductsRevenueAllShops={topProductsRevenueAllShops} topProductsUnitsPerShop={topProductsUnitsPerShop} topProductsRevenuePerShop={topProductsRevenuePerShop} />

            </div>

            <div className="w-full min-h-[85vh] flex flex-col gap-12 lg:gap-14 p-2">

              <div className="w-[calc(100%-1rem)] h-[85vh] flex flex-col items-center justify-center ">
                <div className="w-full h-[15%] flex items-center justify-center">
                  <h2>Sales Chart</h2>
                </div>

                <div  className="w-full h-full flex items-center justify-center ">
                  <RevenueChartUpgradeTotal userId={userDataObject.userData.user.id} />
                </div>
              </div>

              <div className="w-[calc(100%-1rem)] h-[85vh] flex flex-col items-center justify-center ">
                <div className="w-full h-[15%] flex items-center justify-center">
                  <h2>Sales Chart</h2>
                </div>

                <div  className="w-full h-full flex items-center justify-center ">
                  <RevenueChartUpgradeTotalAllShops userId={userDataObject.userData.user.id} />
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