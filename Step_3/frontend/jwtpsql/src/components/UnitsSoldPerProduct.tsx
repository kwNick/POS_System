'use client';

import { useAuth } from "@/context/AuthContext";
import { TotalUnitsSoldPerProductModel } from "@/lib/models/TotalUnitsSoldPerProductModel"

const UnitsSoldPerProduct = () => {
    const {totalUnitsSoldPerProduct} = useAuth();
    console.log("Total Units Sold Per Product: ", totalUnitsSoldPerProduct);
    
  return (
    <div>
      {/* {totalUnitsSoldPerProduct?.map((product: TotalUnitsSoldPerProductModel) => (
        <p key={product.name}>
          {product.name}: {product.unitsSold} units sold
        </p>
      ))} */}

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Units Sold</th>
          </tr>
        </thead>
        <tbody>
          {totalUnitsSoldPerProduct?.map((product: TotalUnitsSoldPerProductModel) => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>{product.unitsSold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default UnitsSoldPerProduct