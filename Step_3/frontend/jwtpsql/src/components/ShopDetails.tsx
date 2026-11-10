'use client';

import { useAuth } from "@/context/AuthContext";
import Shop from "@/lib/models/shopModel";
import { useEffect, useState } from "react";
import {ProductSalesReportModel} from "@/lib/models/ProductSalesReport";
import DeleteShopButton from "./DeleteShopButton";
import UpdateShopLink from "./UpdateShopLink";
import { SalesSummaryModel } from "@/lib/models/SalesSummary";
import RevenueChartUpgrade from "./RevenueChartUpgrade";
import Link from "next/link";

const ShopDetails = ({shopId}: {shopId: string}) => {
    const { fetchShop,
        // fetchTopProductsUnits,
        // fetchTopProductsRevenue,
        // fetchProductSalesReportById,
        // fetchAverageSaleByShopId,
        fetchPSRByShopIdAndDateRange,
        fetchSalesSummaryByShopIdAndDateRange,
    } = useAuth();

    const [shop, setShop] = useState<Shop | null>(null);
    // const [topProductsUnits, setTopProductsUnits] = useState<ProductSalesReportModel[] | null>(null);
    // const [topProductsRevenue, setTopProductsRevenue] = useState<ProductSalesReportModel[] | null>(null);
    // const [productSalesReport, setProductSalesReport] = useState<ProductSalesReportModel[] | null>(null);
    // const [averageSale, setAverageSale] = useState<number | null>(null);
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

        // const getShopProductSalesReport = async () => {
        //     const productSalesReportData = await fetchProductSalesReportById(shopId);
        //     if (productSalesReportData) {
        //         setProductSalesReport(productSalesReportData);
        //     }
        // };

        // const getShopTopProductsByUnits = async () => {
        //     const topProductsUnitsData = await fetchTopProductsUnits(shopId);
        //     if (topProductsUnitsData) {
        //         setTopProductsUnits(topProductsUnitsData);
        //     }
        // };

        // const getShopTopProductsByRevenue = async () => {
        //     const topProductsRevenueData = await fetchTopProductsRevenue(shopId);
        //     if (topProductsRevenueData) {
        //         setTopProductsRevenue(topProductsRevenueData);
        //     }
        // };

        // const getAverageSale = async () => {
        //     const averageSaleData = await fetchAverageSaleByShopId(shopId);
        //     if (averageSaleData !== null) {
        //         setAverageSale(averageSaleData);
        //     }
        // };

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
        // getShopTopProductsByUnits();
        // getShopTopProductsByRevenue();
        // getShopProductSalesReport();
        // getAverageSale();
        getPSRByShopIdAndDateRange();
        getPSRByUnitsShopIdAndDateRange();
        getSalesSummaryByShopIdAndDateRange();

    }, []);

    if (!shop) {
        return <div>Loading...</div>;
    }
    console.log("psrByShopIdAndDateRange:", psrByShopIdAndDateRange,
        " salesSummaryByShopIdAndDateRange:", salesSummaryByShopIdAndDateRange
    );
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
        <div className="w-full h-[clamp(300px, 500px, 700px)] p-6 flex gap-6 text-xl md:text-2xl">
            <div className="flex flex-col items-start justify-start">
                <h1>{shop.name}</h1>
                <h2>{shop.location}</h2>
            </div>

            <div className="p-4 flex items-start justify-start gap-4 lg:gap-8">
                <UpdateShopLink shopId={shop.id} />
                <DeleteShopButton shopId={shop.id.toString()} />
                <Link href={`${shopId}/pos/menu`} className="border-1 p-2">POS</Link>
            </div>
        </div>

        <div className="w-full h-[70%] p-6 flex flex-wrap gap-6 text-xl md:text-2xl">
            {!psrByShopIdAndDateRange && !salesSummaryByShopIdAndDateRange && !psrByUnitsShopIdAndDateRange && (
                <div className="w-full h-1/2 p-6 flex gap-6 text-xl md:text-2xl">
                    <h2 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Shop Doesn't have any top products yet.</h2>
                </div>
            )}

            {
                salesSummaryByShopIdAndDateRange && (
                    <div className="w-full h-1/4 p-6 flex flex-col items-center justify-center text-xl md:text-2xl">
                        <h2 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Sales Summary for Shop All Time</h2>
                        
                        <p className="w-full flex items-center justify-between">
                            <span>Revenue: </span>
                            <span>{salesSummaryByShopIdAndDateRange.totalRevenue}</span>
                        </p>

                        <p className="w-full flex items-center justify-between">
                            <span>Average Sale: </span>
                            <span>{salesSummaryByShopIdAndDateRange.averageSale}</span>
                        </p>

                        <p className="w-full flex items-center justify-between">
                            <span>Transactions: </span>
                            <span>{salesSummaryByShopIdAndDateRange.totalTransactions}</span>
                        </p>

                        <p className="w-full flex items-center justify-between">
                            <span>Tax: </span>
                            <span>{salesSummaryByShopIdAndDateRange.totalTax}</span>
                        </p>

                        <p className="w-full flex items-center justify-between">
                            <span>Average Tax per Sale: </span>
                            <span>{salesSummaryByShopIdAndDateRange.avgTaxPerSale}</span>
                        </p>

                        <p className="w-full flex items-center justify-between">
                            <span>Units Sold: </span>
                            <span>{salesSummaryByShopIdAndDateRange.unitsSold}</span>
                        </p>

                        <h3 className="text-2xl font-semibold mb-4 lg:mb-8 underline">Employee Sales Summary</h3>
                        <ul className="flex flex-col gap-4">
                            {salesSummaryByShopIdAndDateRange.employeeSalesSummary.map((employee) => (
                                <li key={employee.employeeId}>{employee.employeeName} - Transactions: {employee.totalTransactions} - Revenue: {employee.totalRevenue} - Average Sale: {employee.averageSale}</li>
                            ))}
                        </ul>
                    </div>
                )
            }

            <div className="w-full h-[85vh] flex items-center justify-center p-6 lg:p-8 xl:p-12 ">
                <RevenueChartUpgrade shopId={Number(shopId)} />
            </div>

            <div className="w-full h-[85vh] flex items-center justify-center">
                {
                    psrByShopIdAndDateRange && (
                        <div className="w-[calc(50%)] h-full p-6 flex flex-col text-xl md:text-2xl">
                            <h2 className="text-2xl font-semibold mb-4 lg:mb-8 underline text-center">Top Products by Renvenue for Shop All Time</h2>
                            <ul className="flex flex-col gap-4">
                                {psrByShopIdAndDateRange.map((product,index) => (
                                    <li key={product.productId} className={`w-full flex items-center justify-between ${index%2==0 ? 'bg-neutral-black' : ''} rounded`}>
                                        <span className="w-[calc(33%-.5rem)] flex items-center justify-center">{product.productName}</span>
                                        <span className="w-[calc(33%-.5rem)] flex items-center justify-center">{product.unitsSold} units</span>
                                        <span className="w-[calc(33%-.5rem)] flex items-center justify-center">{product.revenue} revenue</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }

                {
                    psrByUnitsShopIdAndDateRange && (
                        <div className="w-[calc(50%)] h-full p-6 flex flex-col text-xl md:text-2xl text-center">
                            <h2 className="text-2xl font-semibold mb-4 lg:mb-8 underline">Top Products by Units Sold All Time</h2>
                            <ul className="flex flex-col gap-4">
                                {psrByUnitsShopIdAndDateRange.map((product,index) => (
                                    <li key={product.productId} className={`w-full flex items-center justify-between ${index%2==0 ? 'bg-neutral-black' : ''} rounded`}>
                                        <span className="w-[calc(33%-.5rem)] flex items-center justify-center">{product.productName}</span>
                                        <span className="w-[calc(33%-.5rem)] flex items-center justify-center">{product.unitsSold} units</span>
                                        <span className="w-[calc(33%-.5rem)] flex items-center justify-center">{product.revenue} revenue</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }
            </div>

        </div>

        
    </div>
  )
}
export default ShopDetails