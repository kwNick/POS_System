'use client';

import { useAuth } from "@/context/AuthContext";
import DashboardUserData from "./DashboardUserData";
import DashboardShopData from "./DashboardShopData";
import DashboardAnalytics from "./DashboardAnalytics";
import Shop from "@/lib/models/shopModel";

const ProfileDashboard = () => {
  const { user, userDataObject, loading } = useAuth();
  console.log("user: ", user);
  console.log("userDataObject: ", userDataObject); // Why is userDataObject null?

  if (loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
  if (!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
  return (
    <>
        {user && (
          <>
            <div className="w-full flex items-center justify-start">
              <h1 className="text-7xl font-semibold mb-4 lg:mb-8">
                <span className="capitalize underline">Hello, {user.username}{" "}</span>
                <span className="text-xs">-{user.roles.map(r => r.name).join(", ")}</span>
              </h1>
            </div>

            <div className="w-full h-[65vh] flex flex-col gap-12 lg:gap-14 lg:flex-row bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">

              <DashboardUserData user={user} />

              <DashboardShopData user={user} />

            </div>
            <div className="w-full h-full flex flex-wrap items-center justify-center gap-4 lg:gap-8">
              
              {user.shops.length > 0 && (
                  user.shops.map((shop: Shop) => (
                    <section key={shop.id} className="w-[calc(33%-1rem)] lg:w-[calc(33%-2rem)] h-[75vh] items-start justify-start p-2 lg:p-4 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">
                      <div  className="w-full h-[14%] flex justify-between border-b-2 mb-1 lg:mb-2">
                        <div className="w-full flex flex-col items-start justify-start">
                          <h1 className="text-2xl lg:text-3xl"><span>{shop.name}</span></h1>
                          <h2 className="italic text-lg lg:text-xl"><span>{shop.location}</span></h2>
                        </div>
                        <div className="w-[25%] flex items-center justify-center">
                          <button className="px-2 py-3 border">POS</button>
                        </div>
                      </div>

                      <div className="w-full h-[44%] flex flex-wrap items-start justify-center gap-1 lg:gap-2 mb-1 lg:mb-2">

                        <div className="min-w-[calc(50%-.5rem)] h-[calc(50%-.5rem)] flex flex-col items-center justify-center ">
                          <div className="w-full h-full flex flex-col items-center justify-center gap-1 lg:gap-2 text-center">
                            <h2 className=" bold underline ">Sales</h2>
                          </div>

                          <div className="w-full h-full flex flex-col items-center justify-center gap-1 lg:gap-2 text-center">
                            Today: {}<br/>
                            ...<br/>
                            All Time: {}<br/>
                          </div>
                        </div>

                        <div className="min-w-[calc(50%-.5rem)] h-[calc(50%-.5rem)] flex flex-col items-center justify-center">
                          <div>
                            <h2 className=" bold underline ">Transactions</h2>
                          </div>

                          <div className="w-full h-full flex flex-col items-center justify-center gap-1 lg:gap-2 text-center">
                            Today: {}<br/>
                            ...<br/>
                            All Time: {}<br/>
                          </div>
                        </div>

                        <div className="min-w-[calc(50%-.5rem)] h-[calc(50%-.5rem)] flex flex-col items-center justify-center">
                          <div>
                            <h2 className=" bold underline ">Average Order</h2>
                          </div>

                          <div className="w-full h-full flex flex-col items-center justify-center gap-1 lg:gap-2 text-center">
                            Today: {}<br/>
                            ...<br/>
                            All Time: {}<br/>
                          </div>
                        </div>

                        <div className="min-w-[calc(50%-.5rem)] h-[calc(50%-.5rem)] flex flex-col items-center justify-center">
                          <div>
                            <h2 className=" bold underline ">Top Products</h2>
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

                      <div className="w-full h-[39%] flex items-start justify-center gap-1 lg:gap-2 mb-1 lg:mb-2">
                        <div className="w-[calc(50%-.5rem)] h-[calc(99%-1rem)] flex flex-col items-start justify-start gap-4 lg:gap-6"> 
                          {/* {shop.products.length > 0 ? ( */}
                            {/* <ul className="w-full flex flex-col gap-2"> */}
                              {/* {shop.products.map((product) => ( */}
                                {/* <li key={product.id} className="w-full flex justify-between items-center">
                                  <span className="italic">{product.name} - {product.price}</span> */}
                                  {/* <span className="italic">{product.description}</span> */}
                                {/* </li> */}
                              {/* ))} */}
                            {/* </ul> */}
                          {/* ) : ( */}
                            {/* <p className="text-gray-500">No products available.</p> */}
                          {/* )} */}
                        </div>
                        
                        <div className="w-[calc(50%-.5rem)] h-[calc(99%-1rem)] flex flex-col items-start justify-start gap-4 lg:gap-6">
                          {/* {shop.employees.length > 0 ? ( */}
                            {/* <ul className="w-full flex flex-col gap-2"> */}
                              {/* {shop.employees.map((employee) => ( */}
                                {/* <li key={employee.id} className="w-full flex justify-between items-center">
                                  <span className="italic">{employee.name} - {employee.position}</span> */}
                                  {/* <span className="italic">{employee.description}</span> */}
                                {/* </li> */}
                              {/* ))} */}
                            {/* </ul> */}
                          {/* ) : ( */}
                            {/* <p className="text-gray-500">No employees available.</p> */}
                          {/* )} */}
                        </div>
                      </div>
                    </section>
                  ))
                )}
              
              <section className=" w-[calc(33%-1rem)] lg:w-[calc(33%-2rem)] h-[50vh] p-6 lg:p-10 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">

              </section>

              <section className=" w-[calc(33%-1rem)] lg:w-[calc(33%-2rem)] h-[50vh] p-6 lg:p-10 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">

              </section>

              <section className=" w-[calc(33%-1rem)] lg:w-[calc(33%-2rem)] h-[50vh] p-6 lg:p-10 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">

              </section>

            </div>

            <div className="w-full min-h-[85vh] flex flex-col gap-12 lg:gap-14 lg:flex-row">
              <DashboardAnalytics user={user} userDataObject={userDataObject} />
            </div>
          </>
        )}
    </>
  )
}
export default ProfileDashboard