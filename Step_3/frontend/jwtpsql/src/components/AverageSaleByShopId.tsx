'use client';
import { useAuth } from "@/context/AuthContext";

const AverageSaleByShopId = () => {
    const { averageSaleByShopId } = useAuth();

    console.log("Average Sale By Shop ID:", averageSaleByShopId);
  return (
    <div>
      <p>Average Sale for Shop: ${averageSaleByShopId}</p>
    </div>
  )
}
export default AverageSaleByShopId