import Role from "@/lib/models/roleModel"
import Shop from "@/lib/models/shopModel"
import User from "@/lib/models/userModel"

const DashboardUserData = ({ user }: { user: User }) => {
  return (
    <div className="p-6 lg:p-8 xl:p-12 w-full bg-neutral-surface rounded-lg shadow-md">
        <div className="w-[clamp(300px, 100%, 800px)]">
            <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Profile:</h1>

            <div className="flex flex-col gap-2">
                <p><span className="font-semibold">Username</span>: {user?.username}</p>
                <p><span className="font-semibold">Email</span>: {user?.email}</p>
                <p><span className="font-semibold">Password</span>: {user?.password}</p>

                <p><span className="font-semibold">Roles</span>:&nbsp;
                    {user.roles.map((role: Role) => {
                        return (
                            <span className="italic" key={role.name}>{role.name}</span>
                        )
                    })}
                </p>

                <div><span className="font-semibold">Shops</span>:
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
  )
}
export default DashboardUserData