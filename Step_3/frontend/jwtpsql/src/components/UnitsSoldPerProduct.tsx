'use client';

import { useAuth } from "@/context/AuthContext";
import { TotalUnitsSoldPerProductModel } from "@/lib/models/TotalUnitsSoldPerProductModel"

const UnitsSoldPerProduct = () => {
    const {totalUnitsSoldPerProduct} = useAuth();
    console.log("Total Units Sold Per Product: ", totalUnitsSoldPerProduct);
    
  return (
    <div>
      {totalUnitsSoldPerProduct?.map((product: TotalUnitsSoldPerProductModel) => (
        <p key={product.name}>
          {product.name}: {product.unitsSold} units sold
        </p>
      ))}
    </div>
  )
}
export default UnitsSoldPerProduct