import User from "@/lib/models/userModel"
import Link from "next/link"
import ProductSalesReport from "./ProductSalesReport"
import AllSalesByUsers from "./AllSalesByUsers"
import DailyRevenue from "./DailyRevenue"
import ProductSalesReportUnitsSold from "./ProductSalesReportUnitsSold"
import UnitsSoldPerProduct from "./UnitsSoldPerProduct"
import AverageSaleByShopId from "./AverageSaleByShopId"
import { UserData } from "@/lib/models/UserDataObject"

const DashboardAnalytics = ({user, userDataObject}:{user: User, userDataObject: UserData | null}) => {
    const component_styles = "min-w-[calc(100%/3-2rem)] max-h-[calc(60vh-2rem)] flex gap-4 items-start justify-start p-6 lg:p-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 hover:scrollbar-thumb-neutral-400 transition-all duration-300 ease-in-out";
    console.log("user: ", user);
    console.log("userDataObject: ", userDataObject);

  return (
    <div className=" p-10 lg:p-14 xl:p-16 w-full ">
        <div className="flex gap-5 items-center justify-between mb-8 border-b-2">
            <h2 className="text-3xl font-semibold mb-4">
                <Link href={`/shops`}>Analytics</Link>
            </h2>
            {/* <AddShopButton /> */}
        </div>

        <div className="max-w-full h-full flex flex-wrap gap-4 items-center justify-center p-2">

            {/* Done these vv start ^^ above needs to be done ^^ */}
            
            <div className={component_styles}>
                <div>
                    <h2>
                        Average Order
                    </h2>
                    <p>
                        SELECT AVG(total) <br />
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
            
            <div className={component_styles}>
                <div>
                    <h2>Total Units Sold for Each Product</h2>
                    <p>
                        SELECT<br />
                            &emsp;p.name,<br />
                            &emsp;SUM(si.quantity) AS units_sold<br />
                        FROM sale_items si<br />
                        JOIN products p <br />
                            &emsp;ON p.id = si.product_id <br />
                        GROUP BY p.id, p.name <br />
                        ORDER BY units_sold DESC; <br />
                        {/* This query shows the total units sold for each product  -->  This goes in ProductRepository*/}
                    </p>
                </div>
                <div>
                    <UnitsSoldPerProduct />
                </div>
            </div>

            <div className={component_styles}>
                <div>
                    <h2>Daily Revenue</h2>
                    <p>
                    SELECT<br />
                        &emsp;DATE(created_at) AS sale_date,<br />
                        &emsp;SUM(total) AS revenue<br />
                    FROM sales<br />
                    GROUP BY DATE(created_at)<br />
                    ORDER BY sale_date;<br />
                    {/* This query shows the daily revenue for each sale date   -->  This goes in SalesRepository */}
                    </p>
                </div>
                <div>
                    <DailyRevenue />
                </div>
            </div>

            <div className={component_styles}>
                <div>
                    <h2>
                        Show me every sale and who made it
                    </h2>
                    <p>
                        SELECT<br />
                            &emsp;s.id AS sale_id,<br />
                            &emsp;u.username,<br />
                            &emsp;s.subtotal,<br />
                            &emsp;s.tax,<br />
                            &emsp;s.total,<br />
                            &emsp;s.created_at<br />
                        FROM sales s<br />
                        JOIN users u<br />
                            &emsp;ON s.user_id = u.id<br />
                        ORDER BY s.created_at DESC;<br />
                        {/* This query shows every sale and who made it  -->  This goes in SalesRepository */}
                    </p>
                </div>
                <div>
                    <AllSalesByUsers />
                </div>
            </div>


            <div className={component_styles}>
                <div>
                    <h2>
                        How many of each product have we sold?
                    </h2>
                    <p>
                        SELECT<br />
                            &emsp;p.name,<br />
                            &emsp;SUM(si.quantity) AS units_sold,<br />
                            &emsp;SUM(si.subtotal) AS revenue<br />
                        FROM sale_items si<br />
                        JOIN products p<br />
                            &emsp;ON si.product_id = p.id<br />
                        GROUP BY p.id, p.name<br />
                        ORDER BY revenue DESC;<br />
                        {/* This query shows how many of each product have been sold and the revenue generated */}
                    </p>
                </div>
                <div>
                    <ProductSalesReport />
                </div>
            </div>
            
            <div className={component_styles}>
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
                    <ProductSalesReportUnitsSold />
                </div>
            </div>

            {/* This query shows today's sales for a specific shop   -->  This goes in SalesRepository */}
            {/* <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white ">
                <div>
                    <h2>
                        Today's Sales       $4,382.25 
                    </h2>
                    <p>
                        SELECT *
                        FROM sales
                        WHERE shop_id == shop.id
                    </p>
                </div>
                <div>

                </div>
            </div> */}

            {/* This query shows the top product for a specific shop   -->  This goes in ProductRepository */}
            {/* <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white ">
                <div>
                    <h2>
                        Top Product
                            └── Widget A          83 sold
                    </h2>
                    <p>
                        SELECT product, COUNT(*)
                        FROM sales
                        WHERE shop_id == shop.id
                        GROUP BY product
                        ORDER BY COUNT(*) DESC
                        LIMIT 1
                    </p>
                </div>
                <div>

                </div>

            </div> */}

            {/* This query shows the sales by shop for a specific shop   -->  This goes in SalesRepository */}
            {/* <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white ">
                <div>
                    <h2>
                        Sales by Shop
                            ├── Shop A          $2,431
                            ├── Shop B          $1,284
                            └── Shop C            $667
                    </h2>
                    <p>
                        SELECT shop, SUM(total)
                        FROM sales
                        WHERE shop_id == shop.id
                        GROUP BY shop
                        ORDER BY SUM(total) DESC
                    </p>
                </div>
                <div>

                </div>
            </div> */}

            {/* This query shows the most selling product for a specific shop   -->  This goes in ProductRepository */}
            {/* <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white ">

                <div>
                    <h2>
                        Most Selling Product
                            └── Widget A          83 sold
                    </h2>
                    <p>
                        SELECT product, COUNT(*)
                        FROM sale_items
                        WHERE sale_id IN (SELECT id FROM sales WHERE shop_id == shop.id)
                        GROUP BY product
                        ORDER BY COUNT(*) DESC
                        LIMIT 1
                    </p>
                </div>
                <div>

                </div>
            </div> */}



            {/* This query shows every product sold with its quantity, unit price, and subtotal   -->  This goes in ProductRepository*/}
            {/* <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white ">
                <div>
                    <h2>
                        "Show me every product sold"
                    </h2>
                    <p>
                        SELECT
                            p.name,
                            si.quantity,
                            si.unit_price,
                            si.subtotal
                        FROM sale_items si
                        JOIN products p
                            ON si.product_id = p.id;
                    </p>
                </div>
                <div>

                </div>
            </div> */}
            
        </div>
    </div>
  )
}
export default DashboardAnalytics
