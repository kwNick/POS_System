import User from "@/lib/models/userModel"
import Link from "next/link"

const DashboardAnalytics = ({user}:{user: User}) => {
  return (
    <div className=" p-10 lg:p-14 xl:p-16 w-full bg-neutral-surface rounded-lg shadow-md shadow-neutral-white ">
        <div className="flex gap-5 items-center justify-between mb-8 border-b-2">
            <h2 className="text-3xl font-semibold mb-4">
                <Link href={`/shops`}>Analytics</Link>
            </h2>
            {/* <AddShopButton /> */}
        </div>
        <div className="w-full flex items-center justify-start p-2">
            <p>
                Today's Sales       $4,382.25 
                SELECT *
                FROM sales
                WHERE shop_id == shop.id
            </p>
            <p>
                Transactions             127
                SELECT COUNT(*)
                FROM sales
                WHERE shop_id == shop.id
            </p>
            <p>
                Average Order          $34.51
                SELECT AVG(total)
                FROM sales
                WHERE shop_id == shop.id
            </p>
            <p>
                
                Top Product
                └── Widget A          83 sold
                SELECT product, COUNT(*)
                FROM sales
                WHERE shop_id == shop.id
                GROUP BY product
                ORDER BY COUNT(*) DESC
                LIMIT 1
            </p>
            <p>
                Sales by Shop
                ├── Shop A          $2,431
                ├── Shop B          $1,284
                └── Shop C            $667
                SELECT shop, SUM(total)
                FROM sales
                WHERE shop_id == shop.id
                GROUP BY shop
                ORDER BY SUM(total) DESC
            </p>
            <p>
                Most Selling Product
                └── Widget A          83 sold
                SELECT product, COUNT(*)
                FROM sale_items
                WHERE sale_id IN (SELECT id FROM sales WHERE shop_id == shop.id)
                GROUP BY product
                ORDER BY COUNT(*) DESC
                LIMIT 1
            </p>
            <p>
                SELECT
                    p.name,
                SUM(si.quantity) AS units_sold
                FROM sale_items si
                JOIN products p 
                    ON p.id = si.product_id
                GROUP BY p.id, p.name
                ORDER BY units_sold DESC;
            </p>
            <p>
                SELECT
                DATE(created_at) AS sale_date,
                SUM(total) AS revenue
                FROM sales
                GROUP BY DATE(created_at)
                ORDER BY sale_date;
            </p>
            <p>
                "Show me every product sold"
                SELECT
                    p.name,
                    si.quantity,
                    si.unit_price,
                    si.subtotal
                FROM sale_items si
                JOIN products p
                    ON si.product_id = p.id;
            </p>
            <p>
                "Show me every sale and who made it"
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
            </p>
            <p>
                "How many of each product have we sold?"
                SELECT
                    p.name,
                    SUM(si.quantity) AS units_sold,
                    SUM(si.subtotal) AS revenue
                FROM sale_items si
                JOIN products p
                    ON si.product_id = p.id
                GROUP BY p.id, p.name
                ORDER BY revenue DESC;
            </p>

            <p>
                What are the top 5 products sold at shop #1?
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
  )
}
export default DashboardAnalytics
