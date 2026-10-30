import { UserDataObject } from "@/lib/models/UserDataObject";
import User from "@/lib/models/userModel";

const DashboardUserAnalytics = ({user, userDataObject}: {user: User, userDataObject: UserDataObject | null}) => {
    const salesStats = userDataObject?.userData.shops.reduce(
        (acc, shop) => {
            acc.totalRevenue += shop.sales.reduce(
            (sum, sale) => sum + sale.sale_info.total,
            0
            );
            acc.totalEmployees += shop.employees?.length ?? 0;
            acc.totalProducts += shop.products.length;

            acc.totalTransactions += shop.sales.length;

            return acc;
        },
        {
            totalRevenue: 0,
            totalTransactions: 0,
            totalProducts: 0,
            totalEmployees: 0,
        }
    );


    // if (loading) {
    //     return <p>Loading dashboard...</p>;
    // }

    if (!userDataObject) {
        return <p>Unable to load user data.</p>;
    }

  return (
    <>
        <div className="w-[calc(25%-1rem)] h-[calc(50%-1rem)] p-1 flex flex-col items-center justify-center">
            <p className="underline decoration-1 underline-offset-2">Total Shops </p>

            <p>{user.shops.length}</p>
        </div>
        
        <div className="w-[calc(25%-1rem)] h-[calc(50%-1rem)] p-1 flex flex-col items-center justify-center">
            <p className="underline decoration-1 underline-offset-2">Total Employees {}</p>

            <p>{salesStats?.totalEmployees}</p>
        </div>

        <div className="w-[calc(25%-1rem)] h-[calc(50%-1rem)] p-1 flex flex-col items-center justify-center">
            <p className="underline decoration-1 underline-offset-2">Total Transactions {}</p>
            <p>
                {salesStats?.totalTransactions}
            </p>
            {/* <p>{userDataObject?.shops.map(shop => shop.sales.length)}</p> */}
            
        </div>

        <div className="w-[calc(25%-1rem)] h-[calc(50%-1rem)] p-1 flex flex-col items-center justify-center">
            <p className="underline decoration-1 underline-offset-2">Total Avg Sale {}</p>
            <p>{((salesStats?.totalRevenue ?? 0) / (salesStats?.totalTransactions ?? 1)).toFixed(2)}</p>
            {/* <p>{userDataObject?.shops.map(shop => shop.sales.length)}</p> */}
            
        </div>

        <div className="w-[calc(25%-1rem)] h-[calc(50%-1rem)] p-1 flex flex-col items-center justify-center">
            <p className="underline decoration-1 underline-offset-2">Total Revenue {}</p>

            <p>{salesStats?.totalRevenue}</p>
            {/* {userDataObject?.userData.shops.flatMap((shop: ShopDTO) => shop.sales).reduce((total, sale) => total + sale.sale_info.total, 0)} */}
        </div>

        <div className="w-[calc(25%-1rem)] h-[calc(50%-1rem)] p-1 flex flex-col items-center justify-center">
            <p className="underline decoration-1 underline-offset-2">Total Products {}</p>

            <p>{salesStats?.totalProducts}</p>
        </div>
        
        <div className="w-[calc(50%-1rem)] h-[calc(50%-1rem)] flex flex-col items-center justify-start">
            <p className="text-center underline decoration-1 underline-offset-2">Top Product {}</p>

            <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Maybe make this a table or something more spaced out */}
            <p>{}Burger - 10 units - Burger Town</p>
            <p>{}Fries - $100 - Burger Town 2</p>
            </div>
        </div>
    </>
  );

}

export default DashboardUserAnalytics