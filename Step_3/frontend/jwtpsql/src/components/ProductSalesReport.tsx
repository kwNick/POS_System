'use client';

import { useAuth } from "@/context/AuthContext";

const ProductSalesReport = () => {
    const {productSalesReport} = useAuth();
    console.log("PSR: ",productSalesReport);

  return (
    <div>ProductSalesReport</div>
  )
}
export default ProductSalesReport