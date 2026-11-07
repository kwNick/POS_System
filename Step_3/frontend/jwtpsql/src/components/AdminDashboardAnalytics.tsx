import User from "@/lib/models/userModel"
import Link from "next/link"
import DailyRevenue from "./DailyRevenue"
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
            
        </div>
    </div>
  )
}
export default AdminDashboardAnalytics
