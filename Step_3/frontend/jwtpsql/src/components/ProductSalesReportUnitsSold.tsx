import { ProductSalesReportModel } from "@/lib/models/ProductSalesReport"
import { useAuth } from "@/context/AuthContext";

const ProductSalesReportUnitsSold = () => {
    const { topProductsUnits } = useAuth();
    console.log("PSR Units Sold: ", topProductsUnits);

  return (
    <div>
        <h2>Top Products By Units Sold</h2>
        {/* <ul>
          {topProductsUnits?.map((report: ProductSalesReportModel) => (
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
            {topProductsUnits?.map((report: ProductSalesReportModel) => (
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
export default ProductSalesReportUnitsSold