import User from "@/lib/models/userModel"
import Link from "next/link"
import ProductSalesReport from "./ProductSalesReport"
import AllSalesByUsers from "./AllSalesByUsers"
import DailyRevenue from "./DailyRevenue"
import UnitsSoldPerProduct from "./UnitsSoldPerProduct"
import { UserDataObject } from "@/lib/models/UserDataObject"

const AdminDashboardAnalytics = ({user, userDataObject}:{user: User, userDataObject: UserDataObject | null}) => {
    const component_styles = "min-w-[calc(100%/3-2rem)] max-h-[calc(60vh-2rem)] flex flex-col gap-4 items-start justify-start p-6 lg:p-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 hover:scrollbar-thumb-neutral-400 transition-all duration-300 ease-in-out";
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
                    <p>
                        Admin Dashboard: Does all units across every shop no matter the owner
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
                    <p>
                        Admin Dashboard: Does all sales across every shop no matter the owner
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
                    <p>
                        Admin Dashboard: Does all sales across every shop no matter the owner
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
                    <p>
                        Admin Dashboard: Does all sales across every shop no matter the owner
                    </p>
                </div>

                <div>
                    <ProductSalesReport />
                </div>
            </div>
            
        </div>
    </div>
  )
}
export default AdminDashboardAnalytics
