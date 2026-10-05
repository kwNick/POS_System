'use client';

import { useAuth } from "@/context/AuthContext";
import Shop from "@/lib/models/shopModel";
import { useEffect, useState } from "react";
import {ProductSalesReport} from "@/lib/models/ProductSalesReportModel";
import DeleteShopButton from "./DeleteShopButton";
// import Link from "next/link";
import UpdateShopLink from "./UpdateShopLink";

const ShopDetails = ({shopId}: {shopId: string}) => {
    const { fetchShop, fetchTopProductsUnits, fetchTopProductsRevenue, fetchProductSalesReportById } = useAuth();

    const [shop, setShop] = useState<Shop | null>(null);
    const [topProductsUnits, setTopProductsUnits] = useState<ProductSalesReport[] | null>(null);
    const [topProductsRevenue, setTopProductsRevenue] = useState<ProductSalesReport[] | null>(null);
    const [productSalesReport, setProductSalesReport] = useState<ProductSalesReport[] | null>(null);

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

        getShop();
        getShopTopProductsByUnits();
        getShopTopProductsByRevenue();
        getShopProductSalesReport();

    }, []);

    if (!shop) {
        return <div>Loading...</div>;
    }
    console.log(productSalesReport);
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
        <div className="w-full h-3/4 p-6 flex gap-6 text-xl md:text-2xl">
            <h1>Name: {shop.name}</h1>
            <p>Location: {shop.location}</p>
        </div>

        {!topProductsUnits && !topProductsRevenue && (
            <div className="w-full h-1/2 p-6 flex gap-6 text-xl md:text-2xl">
                <h2 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Shop Doesn't have any top products yet.</h2>
            </div>
        )}

        <div className="w-full h-1/2 p-6 flex gap-6 text-xl md:text-2xl">

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
        </div>



        <div className="w-full h-1/4 p-4 flex items-center justify-center gap-4 lg:gap-8">
            <UpdateShopLink shopId={shop.id} />
            <DeleteShopButton shopId={shop.id.toString()} />
        </div>
    </div>
  )
}
export default ShopDetails