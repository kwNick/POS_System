'use client';
import { useAuth } from "@/context/AuthContext";
import Shop from "@/lib/models/shopModel";
import Link from "next/link";

const ProfileDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
  if (!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
  return (
    <>
        {user && (
          <>
            <div className="">
              <h1 className="text-3xl font-semibold mb-4">
                <span className="underline">Hello, {user.username}{" "}</span>
                <span className="text-xs">-{user.roles.map(r => r.name).join(", ")}</span>
              </h1>
            </div>

            <div className="flex gap-8">

              <div className="p-6 w-full flex bg-neutral-surface rounded-lg">
                <div className="w-[clamp(300px, 100%, 800px)] ">
                  <h1 className="text-xl font-semibold mb-4 lg:mb-8 underline">Profile:</h1>
                  <div className="flex flex-col gap-4">
                    <p><span className="font-semibold">Username</span>: {user.username}</p>
                    <p><span className="font-semibold">Email</span>: {user.email}</p>
                    <p><span className="font-semibold">Password</span>: {user.password}</p>
                    <p><span className="font-semibold">Roles: </span>
                      {user.roles.map(role => (
                        <span className="italic" key={role.name}>{role.name}<br /></span>
                      ))}
                    </p>

                    <div>
                      <span className="font-semibold">Shops:<br /></span>
                      {user.shops.length > 0 ? (
                        <ul>
                            {user.shops.map((shop: Shop) => (
                                <li className="italic" key={shop.name}>{shop.name} - {shop.location}</li>
                            ))}
                        </ul>
                        ) : (
                          <p>You have no shops.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 lg:p-14 xl:p-16 w-full bg-neutral-surface rounded-lg shadow-md">
                
                <div className="flex gap-5">
                  <h2 className="text-3xl font-semibold mb-4">Your Shops</h2> 
                    <Link href="#" className="group w-fit h-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-2 hover:bg-blue-500 duration-300">
                      <div className="relative rounded-full bg-blue-500 group-hover:bg-blue-400 duration-300 w-10 h-10">
                          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">+</span>
                      </div>
                      <div>Add Shop</div>
                  </Link>
              </div>
                
                <div>
                    {user.shops.length > 0 ? (
                        <ul>
                            {user.shops.map((shop: Shop) => (
                                <li className="italic" key={shop.name}>{shop.name} - {shop.location}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have no shops.</p>
                    )}
                </div>
              </div>

            </div>
          </>
        )}
    </>
  )
}
export default ProfileDashboard