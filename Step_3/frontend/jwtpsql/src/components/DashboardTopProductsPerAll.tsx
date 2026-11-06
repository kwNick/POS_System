import { TopProductsModel } from "@/lib/models/TopProducts"

const DashboardTopProductsPerAll = ({ topProductsUnitsPerShop, topProductsRevenuePerShop, topProductsUnitsAllShops, topProductsRevenueAllShops }: { topProductsUnitsPerShop: TopProductsModel[] | null, topProductsRevenuePerShop: TopProductsModel[] | null, topProductsUnitsAllShops: TopProductsModel[] | null, topProductsRevenueAllShops: TopProductsModel[] | null }) => {

  return (
    <>
        <div className="w-[calc(50%-1rem)] h-[60vh] flex flex-col items-center justify-center bg-neutral-surface rounded-lg shadow-md shadow-neutral-white p-1 lg:p-2">
            <h2 className="w-full h-[8%] text-center">
                Top Products by Units Sold Per Shop
            </h2>
            <div className="w-full h-full flex flex-col items-center justify-center overflow-y-auto">
                <ul className="w-full h-full flex flex-col items-center justify-start gap-1 lg:gap-2">
                {topProductsUnitsPerShop && (
                    topProductsUnitsPerShop.map((product, index) => (
                    <li key={index} className={`w-full h-full flex items-center justify-between rounded p-2 ${index%2==0 ? 'bg-neutral-black' : ''}`}>
                        <span>{product.productName}</span>
                        <span>{product.unitsSold} units - {product.shopName}</span>
                    </li>
                    ))
                )}
                </ul>
            </div>
        </div>

        <div className="w-[calc(50%-1rem)] h-[60vh] flex flex-col items-center justify-center bg-neutral-surface rounded-lg shadow-md shadow-neutral-white p-1 lg:p-2">
            <h2 className="w-full h-[8%] text-center">
                Top Products by Revenue Sold Per Shop
            </h2>
            <div className="w-full h-full flex flex-col items-center justify-center overflow-y-auto">
                <ul className="w-full h-full flex flex-col items-center justify-start gap-1 lg:gap-2">
                    {topProductsRevenuePerShop && (
                    topProductsRevenuePerShop.map((product, index) => (
                        <li key={index} className={`w-full h-full flex items-center justify-between rounded p-2 ${index%2==0 ? 'bg-neutral-black' : ''}`}>
                        <span>{product.productName}</span>
                        <span>${product.totalRevenue.toFixed(2)} - {product.shopName}</span>
                        </li>
                    ))
                    )}
                </ul>
            </div>
        </div>

        <div className="w-[calc(50%-1rem)] h-[60vh] flex flex-col items-center justify-center bg-neutral-surface rounded-lg shadow-md shadow-neutral-white p-1 lg:p-2">
            <h2 className="w-full h-[8%] text-center">
                Top Products by Units Sold All Shops
            </h2>
            <div className="w-full h-full flex flex-col items-center justify-center overflow-y-auto">
                <ul className="w-full h-full flex flex-col items-center justify-between gap-1 lg:gap-2">
                {topProductsUnitsAllShops && (
                    topProductsUnitsAllShops.map((product, index) => (
                    <li key={index} className={`w-full h-full flex items-center justify-between rounded p-2 ${index%2==0 ? 'bg-neutral-black' : ''}`}>
                        <span>{product.productName}</span>
                        <span>{product.unitsSold} units</span>
                    </li>
                    ))
                )}
                </ul>
            </div>
        </div>

        <div className="w-[calc(50%-1rem)] h-[60vh] flex flex-col items-center justify-center bg-neutral-surface rounded-lg shadow-md shadow-neutral-white p-1 lg:p-2">
            <h2 className="w-full h-[8%] text-center">
                Top Products by Revenue Sold All Shops
            </h2>
            <div className="w-full h-full flex flex-col items-center justify-center overflow-y-auto">
                <ul className="w-full h-full flex flex-col items-center justify-start gap-1 lg:gap-2">
                {topProductsRevenueAllShops && (
                    topProductsRevenueAllShops.map((product, index) => (
                    <li key={index} className={`w-full h-full flex items-center justify-between rounded p-2 ${index%2==0 ? 'bg-neutral-black' : ''}`}>
                        <span>{product.productName}</span>
                        <span>${product.totalRevenue.toFixed(2)}</span>
                    </li>
                    ))
                )}
                </ul>
            </div>
        </div>
    </>
  )
}
export default DashboardTopProductsPerAll