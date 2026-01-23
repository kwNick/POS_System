'use client';
import { useAuth } from "@/context/AuthContext";

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

                  <p>
                    <span className="font-semibold">Shops:<br /></span>
                    {user.shops !&& <span>No shops available.</span>}
                    {user.shops.map(shop => (
                      <span className="italic" key={shop.name}>
                        {shop.name} - {shop.location} - {shop.user_id}
                        <br />
                      </span>
                    ))}
                  </p>
                  
                </div>
              </div>
            </div>
          </>
        )}
    </>
  )
}
export default ProfileDashboard