'use client';

import { useAuth } from "@/context/AuthContext";
import Role from "@/lib/models/roleModel";
import Shop from "@/lib/models/shopModel";
import User from "@/lib/models/userModel";
import DashboardUserData from "./DashboardUserData";
import DashboardShopData from "./DashboardShopData";
import DashboardAnalytics from "./DashboardAnalytics";
import DashboardUserAnalytics from "./DashboardUserAnalytics";
import DashboardPerShopAnalytics from "./DashboardPerShopAnalytics";

const AdminDashboard = () => {
    const {user, userDataObject, usersWDetails, users, shops, roles, loading} = useAuth();
    console.log("user: ", user);
    console.log("userDataObject: ", userDataObject);

    if(loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
    if(!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
    
  return (
    <>
        {user && (
            <>
              <div className="w-full flex items-center justify-start">
                  <h1 className="text-7xl font-semibold mb-4 lg:mb-8">
                      <span className='capitalize underline'>Hello, Admin - {user?.username}</span>
                      <span className='text-xs'>-{user?.roles.map((role: Role) => role.name)}</span>
                  </h1>
              </div>

              <div className="w-full h-[65vh] flex flex-col bg-neutral-surface rounded-lg shadow-md shadow-neutral-white pb-1 lg:pb-3 ">
                  <div className="w-full h-[65%] flex flex-col lg:flex-row gap-6 lg:gap-8 p-1">
                      <DashboardUserData user={user} />
                  
                      <DashboardShopData user={user} />
                  </div>

                  <div className="w-full h-full flex flex-wrap items-center justify-between p-1 px-4 bg-neutral-surface border-t-1 border-neutral-surface">
                      <DashboardUserAnalytics user={user} userDataObject={userDataObject} />
                  </div>
              </div>

              {/* // Make this vv <DashboardPerShopAnalytics user={user} userDataObject={userDataObject} /> */}
              <div className="w-full h-full flex flex-wrap items-start justify-around gap-4 lg:gap-8 pb-1 lg:pb-3 ">
                <DashboardPerShopAnalytics user={user} userDataObject={userDataObject} />
              </div>

              <div className="w-full min-h-[85vh] flex flex-col gap-12 lg:gap-14 lg:flex-row p-2">
                  <DashboardAnalytics user={user} userDataObject={userDataObject} />
              </div>
            </>
        )}

        {/* All Admin stuff vv Every Shop from every user */}
        <div className='p-10 mt-10 lg:p-14 xl:p-16 flex flex-col gap-y-5 rounded-lg bg-neutral-surface shadow-md shadow-neutral-white'>
          {usersWDetails && (
            <div>
                <h1 className="text-3xl font-semibold ">All Connections: </h1>
                {/* <UsersList /> */}
                <ul>
                    {usersWDetails?.map((user: User) => (
                      <li key={user.username}>{user.username} - {user.email} - {user.password}  - {user.shops.map((shop: Shop) => {
                          return (
                              <span key={shop.name}>{shop.name} - {shop.location} - {shop.user_id}</span>
                          );
                      })} - {user.roles.map((role: Role) => {
                          return (
                              <span key={role.name}>{role.name}</span>
                          )
                      })}</li>
                    ))}
                  </ul>
              </div>
            )}

            {users && (
              <div>
                  <h1 className="text-3xl font-semibold ">All Users</h1>
                  {/* <UsersList /> */}
                  <ul>
                    {users?.map((user: User) => (
                      <li key={user.username}>{user.username} - {user.email} - {user.password}  - {user._links.self.href} - {user._links.user.href} - {user._links.shops.href}- {user._links.roles.href}</li>
                    ))}
                  </ul>
              </div>
            )}

            {shops && (
              <div>
                <h1 className="text-3xl font-semibold ">All Shops</h1>
                {/* <ShopsList /> */}
                <ul>
                  {shops?.map((shop: Shop) => (
                      <li key={shop.name}>{shop.name} - {shop.location}</li>
                  ))}
                </ul>
              </div>
            )}

            {roles && (
              <div>
                <h1 className="text-3xl font-semibold ">All Roles</h1>
                {/* <RolesList /> */}
                <ul>
                  {roles?.map((role: Role) => (
                      <li key={role.name}>{role.id} - {role.name}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>
    </>
  )
}
export default AdminDashboard