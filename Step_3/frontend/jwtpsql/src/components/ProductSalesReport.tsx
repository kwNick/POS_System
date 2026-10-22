'use client';

import { useAuth } from "@/context/AuthContext";
import { ProductSalesReportModel } from "@/lib/models/ProductSalesReport";

const ProductSalesReport = () => {
    const {productSalesReport} = useAuth();
    console.log("PSR: ",productSalesReport);

  return (
    <div>
      <h2>Product Sales Report</h2>
      {/* <ul>
        {productSalesReport?.map((report: ProductSalesReportModel) => (
          <li key={report.productId}>
            Product: {report.productName}, Units Sold: {report.unitsSold}, Total Sales: {report.revenue}
          </li>
        ))}
      </ul> */}

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Units Sold</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {productSalesReport?.map((report: ProductSalesReportModel) => (
            <tr key={report.productId}>
              <td>{report.productName}</td>
              <td>{report.unitsSold}</td>
              <td>{report.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default ProductSalesReport