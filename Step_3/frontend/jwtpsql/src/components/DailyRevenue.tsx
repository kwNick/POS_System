'use client';

import { useAuth } from "@/context/AuthContext";
import { DailyRevenueModel } from "@/lib/models/DailyRevenue";

const DailyRevenue = () => {
    const {dailyRevenue} = useAuth();
    console.log("Daily Revenue: ", dailyRevenue);
  return (
    <div>
      {dailyRevenue?.map((revenue: DailyRevenueModel) => (
        <p key={revenue.saleDate}>
          {revenue.saleDate}: ${revenue.revenue}
        </p>
      ))}
    </div>
  )
}
export default DailyRevenue