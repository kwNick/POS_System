'use client';

import { useAuth } from "@/context/AuthContext";
import Role from "@/lib/models/roleModel";
import Shop from "@/lib/models/shopModel";
import User from "@/lib/models/userModel";
import DashboardUserData from "./DashboardUserData";
import DashboardShopData from "./DashboardShopData";

const AdminDashboard = () => {
    const {user, usersWDetails, users, shops, roles, loading} = useAuth();

    if(loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
    if(!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
    
  return (
    <>
        {user && (
            <>
                <div className="">
                    <h1 className="text-3xl font-semibold mb-4">
                        <span className='capitalize underline'>Hello, Admin - {user?.username}</span>
                        <span className='text-xs'>-{user?.roles.map((role: Role) => role.name)}</span>
                    </h1>
                </div>

                <div className="flex flex-col gap-12 lg:gap-14 lg:flex-row">
                    <DashboardUserData user={user} />
                    
                    <DashboardShopData user={user} />
                </div>
            </>
        )}


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