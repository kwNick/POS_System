'use client';

import { useAuth } from "@/context/AuthContext";
import DashboardUserData from "./DashboardUserData";
import DashboardShopData from "./DashboardShopData";
import DashboardAnalytics from "./DashboardAnalytics";
import DashboardUserAnalytics from "./DashboardUserAnalytics";
import DashboardPerShopAnalytics from "./DashboardPerShopAnalytics";
import DashboardTopProductsPerAll from "./DashboardTopProductsPerAll";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import DashboardChart from "./DashboardChart";
import DashboardBarChart from "./DashboardBarChart";
import RevenueChart from "./RevenueChart";
import RevenueChartUpgrade from "./RevenueChartUpgrade";

const ProfileDashboard = () => {
  const { user, userDataObject,
    topProductsUnitsAllShops, topProductsRevenueAllShops,
    topProductsUnitsPerShop, topProductsRevenuePerShop,
    loading } = useAuth();
  console.log("user: ", user);
  console.log("userDataObject: ", userDataObject);
  console.log("TopProductsUnits: ",  topProductsUnitsAllShops);
  console.log("TopProductsRevenue: ",  topProductsRevenueAllShops);
  console.log("TopProductsUnitsPerShop: ",  topProductsUnitsPerShop);
  console.log("TopProductsRevenuePerShop: ",  topProductsRevenuePerShop);

  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [chartRef]);

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

              {/* <ShopCharts /> Make This a component with charts that represent each shops transaction/revenue/sales overtime */}
              <div className="w-[calc(100%-1rem)] h-[225vh] flex flex-col items-center justify-center ">
                <div className="w-full h-[15%] flex items-center justify-center">
                  <h2>Sales Chart</h2>
                </div>

                <div  className="w-full h-[25%] flex items-center justify-center border-1">
                  <canvas ref={chartRef} className="w-[800px] h-[400px]" />
                  
                </div>

                <div  className="w-full h-[25%] flex items-center justify-center border-1">
                  <DashboardChart />
                </div>

                <div  className="w-full h-[25%] flex items-center justify-center border-1">
                  <DashboardBarChart />
                </div>

                <div  className="w-full h-[25%] flex items-center justify-center border-1">
                  <RevenueChart />
                </div>

                <div  className="w-full h-[25%] flex items-center justify-center border-1">
                  <RevenueChartUpgrade shopId={1} />
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