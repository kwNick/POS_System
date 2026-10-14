import { ProductSalesReportModel } from "@/lib/models/ProductSalesReport"
import { useAuth } from "@/context/AuthContext";

const ProductSalesReportUnitsSold = () => {
    const { topProductsUnits } = useAuth();
    console.log("PSR Units Sold: ", topProductsUnits);

  return (
    <div>
        <h2>Top Products By Units Sold</h2>
        <ul>
        {topProductsUnits?.map((report: ProductSalesReportModel) => (
            <li key={report.productId}>
            Product: {report.productName}, Units Sold: {report.unitsSold}, Total Sales: {report.revenue}
            </li>
        ))}
        </ul>
    </div>
  )
}
export default ProductSalesReportUnitsSold