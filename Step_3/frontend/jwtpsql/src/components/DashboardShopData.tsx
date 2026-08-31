import User from "@/lib/models/userModel"
import AddShopButton from "./AddShopButton"
// import DeleteShopButton from "./DeleteShopButton"
import Shop from "@/lib/models/shopModel"
import Link from "next/link"
import DeleteShopButton from "./DeleteShopButton"
import UpdateShopLink from "./UpdateShopLink"

const DashboardShopData = ({ user }: { user: User }) => {
  return (
    <div className=" p-10 lg:p-14 xl:p-16 w-full bg-neutral-surface rounded-lg shadow-md shadow-neutral-white ">
                        
        <div className="flex gap-5 items-center justify-between mb-8 border-b-2">
            <h2 className="text-3xl font-semibold mb-4">
                <Link href={`/shops`}>Your Shops</Link>
            </h2>
            <AddShopButton />
        </div>

        <div className="w-full flex items-center justify-start p-2">
            {user.shops.length > 0 ? (
                <ul className="w-full flex flex-col gap-4">
                    {user.shops.map((shop: Shop) => (
                        <div key={shop.name} className="w-full flex justify-between">
                            <Link href={`/shops/${shop.id}`} key={shop.name} className="">
                                    <li className=" italic underline" ><span>{shop.name} - {shop.location}</span></li>
                            </Link>
                            <div className="flex gap-4 lg:gap-8">
                                <UpdateShopLink shopId={shop.id} />
                                <DeleteShopButton shopId={`${shop.id}`} />
                            </div>
                            {/* <DeleteShopButton shopId={shop.id.toString()} /> */}
                        </div>
                    ))}
                </ul>
            ) : (
                <p>You have no shops.</p>
            )}
        </div>
    </div>
  )
}
export default DashboardShopData