'use client';

import { useAuth } from "@/context/AuthContext";
import { DailyRevenueModel } from "@/lib/models/DailyRevenue";

const DailyRevenue = () => {
    const {dailyRevenue} = useAuth();
    console.log("Daily Revenue: ", dailyRevenue);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sale Date</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {dailyRevenue?.map((revenue: DailyRevenueModel) => (
            <tr key={revenue.saleDate}>
              <td>{revenue.saleDate}</td>
              <td>${revenue.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default DailyRevenue