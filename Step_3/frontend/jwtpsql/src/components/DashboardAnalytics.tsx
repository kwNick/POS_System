import User from "@/lib/models/userModel"
import Link from "next/link"
import ProductSalesReport from "./ProductSalesReport"

const DashboardAnalytics = ({user}:{user: User}) => {
  return (
    <div className=" p-10 lg:p-14 xl:p-16 w-full bg-neutral-surface rounded-lg shadow-md shadow-neutral-white ">
        <div className="flex gap-5 items-center justify-between mb-8 border-b-2">
            <h2 className="text-3xl font-semibold mb-4">
                <Link href={`/shops`}>Analytics</Link>
            </h2>
            {/* <AddShopButton /> */}
        </div>

        <div className="max-w-full h-full flex flex-wrap gap-4 items-center justify-center p-2">

            <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8">
                <div>
                    <h2>
                        "Today's Sales"
                        Today's Sales       $4,382.25 
                    </h2>
                    <p>
                        SELECT *
                        FROM sales
                        WHERE shop_id == shop.id
                        {/* This query shows today's sales for a specific shop   -->  This goes in SalesRepository */}
                    </p>
                </div>
            </div>

            <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8">
                <div>
                    <h2>
                        "Average Order"
                        Average Order          $34.51
                    </h2>
                    <p>
                        SELECT AVG(total)
                        FROM sales
                        WHERE shop_id == shop.id
                        {/* This query shows the average order for a specific shop   -->  This goes in SalesRepository */}
                    </p>
                </div>
            </div>

            <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8">
                <div>
                    <h2>
                        "Top Product"
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
                        {/* This query shows the top product for a specific shop   -->  This goes in ProductRepository */}
                    </p>
                </div>
            </div>

            <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8">
                <div>
                    <h2>
                        "Sales by Shop"
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
                        {/* This query shows the sales by shop for a specific shop   -->  This goes in SalesRepository */}
                    </p>
                </div>
            </div>

            <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8">

                <div>
                    <h2>
                        "Most Selling Product"
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
                        {/* This query shows the most selling product for a specific shop   -->  This goes in ProductRepository */}
                    </p>
                </div>
            </div>

            <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8">
                <p>
                    SELECT
                        p.name,
                    SUM(si.quantity) AS units_sold
                    FROM sale_items si
                    JOIN products p 
                        ON p.id = si.product_id
                    GROUP BY p.id, p.name
                    ORDER BY units_sold DESC;
                    {/* This query shows the total units sold for each product   -->  This goes in ProductRepository*/}
                </p>
            </div>

            <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8">
                <p>
                    SELECT
                    DATE(created_at) AS sale_date,
                    SUM(total) AS revenue
                    FROM sales
                    GROUP BY DATE(created_at)
                    ORDER BY sale_date;
                    {/* This query shows the daily revenue for each sale date   -->  This goes in SalesRepository */}
                </p>
            </div>

            <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8">
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
                        {/* This query shows every product sold with its quantity, unit price, and subtotal   -->  This goes in ProductRepository*/}
                    </p>
                </div>
            </div>

            <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8">
                <div>
                    <h2>
                        "Show me every sale and who made it"
                    </h2>
                    <p>
                        SELECT
                            s.id AS sale_id,
                            u.username,
                            s.subtotal,
                            s.tax,
                            s.total,
                            s.created_at
                        FROM sales s
                        JOIN users u
                            ON s.user_id = u.id
                        ORDER BY s.created_at DESC;
                        {/* This query shows every sale and who made it  -->  This goes in SalesRepository */}
                    </p>
                </div>
            </div>

            {/* Done these vv start ^^ above needs to be done ^^ */}

            <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8">

                <div>
                    <h2>
                        "How many of each product have we sold?"
                    </h2>
                    <p>
                        SELECT
                            p.name,
                            SUM(si.quantity) AS units_sold,
                            SUM(si.subtotal) AS revenue
                        FROM sale_items si
                        JOIN products p
                            ON si.product_id = p.id
                        GROUP BY p.id, p.name
                        ORDER BY revenue DESC;
                        {/* This query shows how many of each product have been sold and the revenue generated */}
                    </p>
                </div>
                <div>
                    <ProductSalesReport />
                </div>
            </div>
            
            <div className="w-[calc(100%/3-4rem)] flex gap-4 items-center justify-center p-6 lg:p-8">
                <div>
                    <h2>
                        What are the top 5 products sold at shop #1?
                    </h2>
                    <p>
                        {/* This query shows the top 5 products sold at a specific shop */}
                        SELECT
                            p.id,
                            p.name,
                            SUM(si.quantity) AS units_sold,
                            SUM(si.subtotal) AS revenue
                        FROM sale_items si
                        JOIN products p
                            ON si.product_id = p.id
                        JOIN sales s
                            ON si.sale_id = s.id
                        WHERE s.shop_id = :shopId
                        GROUP BY p.id, p.name
                        ORDER BY units_sold DESC
                        LIMIT 5;
                    </p>
                </div>
            </div>
            
        </div>
    </div>
  )
}
export default DashboardAnalytics
