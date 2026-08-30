'use client';

import { useAuth } from "@/context/AuthContext";
import DashboardUserData from "./DashboardUserData";
import DashboardShopData from "./DashboardShopData";

const ProfileDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-w-3/5"><p>Loading...</p></div>;
  if (!user && !loading) return <div className="min-w-3/5"><p>You are not logged in.</p></div>;
  return (
    <>
        {user && (
          <>
            <div className="">
              <h1 className="text-3xl font-semibold mb-4 lg:mb-8">
                <span className="capitalize underline">Hello, {user.username}{" "}</span>
                <span className="text-xs">-{user.roles.map(r => r.name).join(", ")}</span>
              </h1>
            </div>

            <div className="flex flex-col gap-12 lg:gap-14 lg:flex-row">

              <DashboardUserData user={user} />

              <DashboardShopData user={user} />

            </div>
          </>
        )}
    </>
  )
}
export default ProfileDashboard