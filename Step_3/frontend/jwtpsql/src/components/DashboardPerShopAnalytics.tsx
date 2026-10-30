import { EmployeeDTO, ProductDTO, ShopDTO, UserDataObject } from "@/lib/models/UserDataObject"
import User from "@/lib/models/userModel"
import Link from "next/link"

const DashboardPerShopAnalytics = ({user, userDataObject}: {user: User, userDataObject: UserDataObject|null}) => {
    if(!user || !userDataObject) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
  return (
    <>
        {userDataObject.userData.shops.length > 0 && (
            userDataObject?.userData.shops.map((shop: ShopDTO) => (
                <section key={shop.shop_info.id} className="w-[calc(100%-1rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33%-2rem)] h-[75vh] items-start justify-start pt-2 px-2 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">
                    <div  className="w-full h-[14%] flex justify-between border-b-2 pb-1 lg:pb-2">
                        <div className="w-[80%] h-full flex flex-col items-start justify-start">
                            <h1 className="text-2xl lg:text-3xl"><span>{shop.shop_info.name}</span></h1>

                            <h2 className="italic text-lg lg:text-xl"><span>{shop.shop_info.location}</span></h2>
                        </div>

                        <div className="w-[20%] flex items-center justify-center ">
                            <Link href={`#`} className="px-2 py-3 border rounded">POS</Link>
                        </div>
                    </div>

                    <div className="w-full h-[44%] flex flex-wrap items-start justify-center gap-1 lg:gap-2 py-1 lg:py-2">

                    <div className="min-w-[calc(50%-.5rem)] h-[calc(50%-.5rem)] flex flex-col items-center justify-center ">
                        <div className="w-full h-full flex flex-col items-center justify-center gap-1 lg:gap-2 text-center">
                            <h2 className=" bold underline decoration-1">Sales</h2>
                        </div>

                        <div className="w-full h-full flex flex-col items-center justify-center gap-1 lg:gap-2 text-center">
                            Today: {}<br/>
                            ...<br/>
                            All Time: {}<br/>
                        </div>
                    </div>

                    <div className="min-w-[calc(50%-.5rem)] h-[calc(50%-.5rem)] flex flex-col items-center justify-center">
                        <div>
                            <h2 className=" bold underline decoration-1">Transactions</h2>
                        </div>

                        <div className="w-full h-full flex flex-col items-center justify-center gap-1 lg:gap-2 text-center">
                            Today: {}<br/>
                            ...<br/>
                            All Time: {}<br/>
                        </div>
                    </div>

                    <div className="min-w-[calc(50%-.5rem)] h-[calc(50%-.5rem)] flex flex-col items-center justify-center">
                        <div>
                            <h2 className=" bold underline decoration-1">Average Order</h2>
                        </div>

                        <div className="w-full h-full flex flex-col items-center justify-center gap-1 lg:gap-2 text-center">
                            Today: {}<br/>
                            ...<br/>
                            All Time: {}<br/>
                        </div>
                    </div>

                    <div className="min-w-[calc(50%-.5rem)] h-[calc(50%-.5rem)] flex flex-col items-center justify-center">
                        <div>
                            <h2 className=" bold underline decoration-1">Top Products</h2>
                        </div>
                        
                        <div className="w-full flex items-center justify-center gap-1 lg:gap-2">
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                <h3>Revenue:</h3>

                                <div className="w-full h-full flex flex-col items-center justify-center gap-1 lg:gap-2 text-center">
                                    Today: {}<br/>
                                    ...<br/>
                                    All Time: {}<br/>
                                </div>
                            </div>

                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                <h3>Units:</h3>

                                <div className="w-full h-full flex flex-col items-center justify-center gap-1 lg:gap-2 text-center">
                                    Today: {}<br/>
                                    ...<br/>
                                    All Time: {}<br/>
                                </div>
                            </div>
                        </div>
                    </div>

                    </div>

                    <div className="w-full h-[39%] flex items-start justify-center gap-1 lg:gap-2 pb-1 ">
                        <div className="w-[calc(50%-.5rem)] h-[calc(99%-1rem)] flex flex-col items-start justify-start gap-1 lg:gap-2 ">
                            <div className="w-full h-[15%] flex items-start justify-center">
                                <h3 className="underline decoration-1">Products</h3>
                            </div>

                            {shop.products.length > 0 ? (
                            <ul className="w-full flex flex-col overflow-y-auto ">
                                {shop.products.map((product: ProductDTO, idx: number) => (
                                    <li key={product.id} className={`w-full h-full flex justify-between items-center ${idx%2==0 ? 'bg-neutral-black' : ''}`}>
                                        <span className="italic">{product.name} - {product.price}</span>
                                        {/* <span className="italic">{product.description}</span> */}
                                    </li>
                                ))}
                            </ul>
                            ) : (
                                <p className="text-gray-500 text-center">No products available.</p>
                            )}
                        </div>
                    
                        <div className="w-[calc(50%-.5rem)] h-[calc(99%-1rem)] flex flex-col items-start justify-start gap-1 lg:gap-2 ">
                            <div className="w-full h-[15%] flex items-start justify-center">
                                <h3 className="underline decoration-1">Employees</h3>
                            </div>

                            {shop.employees && shop.employees.length > 0 ? (
                            <ul className="w-full flex flex-col overflow-y-auto ">
                                {shop.employees.map((employee: EmployeeDTO, idx: number) => (
                                    <li key={employee.id} className={`w-full h-full flex justify-between items-center ${idx%2==0 ? 'bg-neutral-black' : ''}`}>
                                            <span className="italic">{employee.username} - {employee.position}</span>
                                        {/* <span className="italic">{employee.pin}</span> */}
                                    </li>
                                ))}
                            </ul>
                            ) : (
                                <p className="text-gray-500 text-center">No employees available.</p>
                            )}
                        </div>
                    </div>
                </section>
            ))
        )}
    </>
  )
}
export default DashboardPerShopAnalytics