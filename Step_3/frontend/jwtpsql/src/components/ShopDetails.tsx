'use client';

import { useAuth } from "@/context/AuthContext";
import Shop from "@/lib/models/shopModel";
import { useEffect, useState } from "react";
import {ProductSalesReportModel} from "@/lib/models/ProductSalesReport";
import DeleteShopButton from "./DeleteShopButton";
// import Link from "next/link";
import UpdateShopLink from "./UpdateShopLink";
import ProductSalesReportUnitsSold from "./ProductSalesReportUnitsSold";
import AverageSaleByShopId from "./AverageSaleByShopId";
import { SalesSummaryModel } from "@/lib/models/SalesSummary";

const ShopDetails = ({shopId}: {shopId: string}) => {
    const { fetchShop,
        fetchTopProductsUnits,
        fetchTopProductsRevenue,
        fetchProductSalesReportById,
        fetchAverageSaleByShopId,
        fetchPSRByShopIdAndDateRange,
        fetchSalesSummaryByShopIdAndDateRange,
    } = useAuth();

    const [shop, setShop] = useState<Shop | null>(null);
    const [topProductsUnits, setTopProductsUnits] = useState<ProductSalesReportModel[] | null>(null);
    const [topProductsRevenue, setTopProductsRevenue] = useState<ProductSalesReportModel[] | null>(null);
    const [productSalesReport, setProductSalesReport] = useState<ProductSalesReportModel[] | null>(null);
    const [averageSale, setAverageSale] = useState<number | null>(null);
    const [psrByShopIdAndDateRange, setPsrByShopIdAndDateRange] = useState<ProductSalesReportModel[] | null>(null);
    const [psrByUnitsShopIdAndDateRange, setPsrByUnitsShopIdAndDateRange] = useState<ProductSalesReportModel[] | null>(null);
    const [salesSummaryByShopIdAndDateRange, setSalesSummaryByShopIdAndDateRange] = useState<SalesSummaryModel | null>(null);

    useEffect(() => {
        const getShop = async () => {
            const shopData = await fetchShop(shopId);

            if (shopData) {
                setShop(shopData);
            }
        };

        const getShopProductSalesReport = async () => {
            const productSalesReportData = await fetchProductSalesReportById(shopId);
            if (productSalesReportData) {
                setProductSalesReport(productSalesReportData);
            }
        };

        const getShopTopProductsByUnits = async () => {
            const topProductsUnitsData = await fetchTopProductsUnits(shopId);
            if (topProductsUnitsData) {
                setTopProductsUnits(topProductsUnitsData);
            }
        };

        const getShopTopProductsByRevenue = async () => {
            const topProductsRevenueData = await fetchTopProductsRevenue(shopId);
            if (topProductsRevenueData) {
                setTopProductsRevenue(topProductsRevenueData);
            }
        };
        const getAverageSale = async () => {
            const averageSaleData = await fetchAverageSaleByShopId(shopId);
            if (averageSaleData !== null) {
                setAverageSale(averageSaleData);
            }
        };

        const getPSRByShopIdAndDateRange = async () => {
            const psrData = await fetchPSRByShopIdAndDateRange(shopId, "2026-01-01", "2026-12-31");
            if (psrData) {
                setPsrByShopIdAndDateRange(psrData);
            }
        };

        const getPSRByUnitsShopIdAndDateRange = async () => {
            const psrData = await fetchPSRByShopIdAndDateRange(shopId, "2026-01-01", "2026-12-31", "unitsSold");
            if (psrData) {
                setPsrByUnitsShopIdAndDateRange(psrData);
            }
        };

        const getSalesSummaryByShopIdAndDateRange = async () => {
            const salesSummaryData = await fetchSalesSummaryByShopIdAndDateRange(shopId, "2026-01-01", "2026-12-31");
            if (salesSummaryData) {
                setSalesSummaryByShopIdAndDateRange(salesSummaryData);
            }
        };

        getShop();
        getShopTopProductsByUnits();
        getShopTopProductsByRevenue();
        getShopProductSalesReport();
        getAverageSale();
        getPSRByShopIdAndDateRange();
        getPSRByUnitsShopIdAndDateRange();
        getSalesSummaryByShopIdAndDateRange();

    }, []);

    if (!shop) {
        return <div>Loading...</div>;
    }
    console.log("productSalesReport:", productSalesReport,
        " topProductsUnits:", topProductsUnits,
        " topProductsRevenue:", topProductsRevenue,
        " averageSale:", averageSale,
        " psrByShopIdAndDateRange:", psrByShopIdAndDateRange,
        " salesSummaryByShopIdAndDateRange:", salesSummaryByShopIdAndDateRange
    );
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
        <div className="w-full h-3/4 p-6 flex gap-6 text-xl md:text-2xl">
            <h1>{shop.name}</h1>
            <p>{shop.location}</p>
        </div>

        {!topProductsUnits && !topProductsRevenue && (
            <div className="w-full h-1/2 p-6 flex gap-6 text-xl md:text-2xl">
                <h2 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Shop Doesn't have any top products yet.</h2>
            </div>
        )}

        <div className="w-full h-1/2 p-6 flex flex-wrap gap-6 text-xl md:text-2xl">

            {
                productSalesReport && (
                    <div className="w-full h-1/2 p-6 flex flex-col text-xl md:text-2xl">
                        <h2 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Product Sales Report</h2>
                        <ul className="flex flex-col gap-4 ">
                            {productSalesReport.map((product,idx) => (
                                <li key={idx}>{product.productName} - {product.unitsSold} units - {product.revenue} revenue</li>
                            ))}
                        </ul>
                    </div>
                )
            }

            {
                topProductsUnits && (
                    <div className="w-full h-1/2 p-6 flex flex-col text-xl md:text-2xl">
                        <h2 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Top Products by Units</h2>
                        <ul className="flex flex-col gap-4 ">
                            {topProductsUnits.map((product) => (
                                <li key={product.productId}>{product.productName} - {product.unitsSold} units - {product.revenue} revenue</li>
                            ))}
                        </ul>
                    </div>
                )
            }
            {
                topProductsRevenue && (
                    <div className="w-full h-1/2 p-6 flex flex-col text-xl md:text-2xl">
                        <h2 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Top Products by Revenue</h2>
                        <ul className="flex flex-col gap-4 ">
                            {topProductsRevenue.map((product) => (
                                <li key={product.productId}>{product.productName} - {product.unitsSold} units - {product.revenue} revenue</li>
                            ))}
                        </ul>
                    </div>
                )
            }
            {
                averageSale &&  (
                    <div className="w-full h-1/2 p-6 flex flex-col text-xl md:text-2xl">
                        <h2 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Average Sale for Shop all time</h2>
                        <p>{averageSale}</p>
                    </div>
                )
            }

            {
                psrByShopIdAndDateRange && (
                    <div className="w-full h-1/2 p-6 flex flex-col text-xl md:text-2xl">
                        <h2 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Product Sales Report by Renvenue for Shop in date range: "2023-01-01", "2023-12-31"</h2>
                        <ul className="flex flex-col gap-4">
                            {psrByShopIdAndDateRange.map((product) => (
                                <li key={product.productId}>{product.productName} - {product.unitsSold} units - {product.revenue} revenue</li>
                            ))}
                        </ul>
                    </div>
                )
            }

            {
                psrByUnitsShopIdAndDateRange && (
                    <div className="w-full h-1/2 p-6 flex flex-col text-xl md:text-2xl">
                        <h2 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Product Sales Report by Units Sold for Shop in date range: "2023-01-01", "2023-12-31"</h2>
                        <ul className="flex flex-col gap-4">
                            {psrByUnitsShopIdAndDateRange.map((product) => (
                                <li key={product.productId}>{product.productName} - {product.unitsSold} units - {product.revenue} revenue</li>
                            ))}
                        </ul>
                    </div>
                )
            }

            {
                salesSummaryByShopIdAndDateRange && (
                    <div className="w-full h-1/2 p-6 flex flex-col text-xl md:text-2xl">
                        <h2 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Sales Summary for Shop in date range: "2023-01-01", "2023-12-31"</h2>
                        <p>Revenue: {salesSummaryByShopIdAndDateRange.totalRevenue}</p>
                        <p>Average Sale: {salesSummaryByShopIdAndDateRange.averageSale}</p>
                        <p>Transactions: {salesSummaryByShopIdAndDateRange.totalTransactions}</p>
                        <p>Tax: {salesSummaryByShopIdAndDateRange.totalTax}</p>
                        <p>Average Tax per Sale: {salesSummaryByShopIdAndDateRange.avgTaxPerSale}</p>
                        <p>Units Sold: {salesSummaryByShopIdAndDateRange.unitsSold}</p>
                        <h3 className="text-2xl font-semibold mb-4 lg:mb-8 underline">Employee Sales Summary</h3>
                        <ul className="flex flex-col gap-4">
                            {salesSummaryByShopIdAndDateRange.employeeSalesSummary.map((employee) => (
                                <li key={employee.employeeId}>{employee.employeeName} - Transactions: {employee.totalTransactions} - Revenue: {employee.totalRevenue} - Average Sale: {employee.averageSale}</li>
                            ))}
                        </ul>
                    </div>
                )
            }

            <div className="w-full h-1/2 p-6 flex flex-col text-xl md:text-2xl">
                <div>
                    <h2>
                        What are the top 5 products sold at shop #1?
                    </h2>
                    <p>
                        {/* This query shows the top 5 products sold at a specific shop */}
                        SELECT<br />
                            &emsp;p.id,<br />
                            &emsp;p.name,<br />
                            &emsp;SUM(si.quantity) AS units_sold,<br />
                            &emsp;SUM(si.subtotal) AS revenue<br />
                        FROM sale_items si<br />
                        JOIN products p<br />
                            &emsp;ON si.product_id = p.id<br />
                        JOIN sales s<br />
                            &emsp;ON si.sale_id = s.id<br />
                        WHERE s.shop_id = :shopId<br />
                        GROUP BY p.id, p.name<br />
                        ORDER BY units_sold DESC<br />
                        LIMIT 5;<br />
                    </p>
                </div>

                <div>
                    <p>
                        ShopId Dashboard:
                    </p>
                </div>
                
                <div>
                    <ProductSalesReportUnitsSold />
                </div>
            </div>

            <div className="w-full h-1/2 p-6 flex flex-col text-xl md:text-2xl">
                <div>
                    <h2>
                        Average Order
                    </h2>
                    <p>
                        SELECT AVG(subtotal) <br />
                        FROM sales  <br />
                        WHERE shop_id == shop.id <br />
                        {/* This query shows the average order for a specific shop   -->  This goes in SalesRepository */}
                    </p>
                </div>
                {/* Maybe list all shops average sale by id using user variable for dashboard */}
                <div>
                    <AverageSaleByShopId />
                </div>
            </div>

        </div>

        <div className="w-full h-1/4 p-4 flex items-center justify-center gap-4 lg:gap-8">
            <UpdateShopLink shopId={shop.id} />
            <DeleteShopButton shopId={shop.id.toString()} />
        </div>
    </div>
  )
}
export default ShopDetails