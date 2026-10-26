'use client';

import { useAuth } from "@/context/AuthContext";
import DashboardUserData from "./DashboardUserData";
import DashboardShopData from "./DashboardShopData";
import DashboardAnalytics from "./DashboardAnalytics";

const ProfileDashboard = () => {
  const { user, userDataObject, loading } = useAuth();
  console.log("user: ", user);
  console.log("userDataObject: ", userDataObject);

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
            <div className="w-full h-[70vh] flex items-start justify-center">
              <section className="w-[1/4] h-full p-6 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">

              </section>

              <section className="w-[1/4] h-full p-6 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">

              </section>

              <section className="w-[1/4] h-full p-6 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">

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