import User from "@/lib/models/userModel"
import AddShopButton from "./AddShopButton"
// import DeleteShopButton from "./DeleteShopButton"
import Shop from "@/lib/models/shopModel"
import Link from "next/link"
import DeleteShopButton from "./DeleteShopButton"
import UpdateShopLink from "./UpdateShopLink"

const DashboardShopData = ({ user }: { user: User }) => {
  return (
    <div className="w-full h-full p-10 lg:p-14 xl:p-16">
                        
        <div className="h-[15%] w-full flex gap-5 items-center justify-between mb-2 lg:mb-6 pb-2 border-b-1">
            <h2 className="text-3xl font-semibold mb-4">
                <Link href={`/shops`}>Your Shops : {user.shops.length}</Link>
            </h2>
            <AddShopButton />
        </div>

        <div className="h-full w-full flex items-center justify-start">
            {user.shops.length > 0 ? (
                <ul className="w-full h-full flex flex-col overflow-y-auto border rounded-lg">
                    {user.shops.map((shop: Shop, idx: number) => (
                        <div key={shop.name} className={`w-full h-full flex items-center justify-between border-b-1 border-neutral-400 p-2 lg:p-4 ${idx%2 == 0 ? ' bg-neutral-black': ''}`}>

                            <Link href={`/shops/${shop.id}`} key={shop.name} className="h-full w-[75%] flex items-center justify-start ">
                                    <li className=" italic underline decoration-1" ><span>{shop.name} - {shop.location}</span></li>
                            </Link>

                            <div className="h-full w-[25%] flex items-center justify-around gap-4 lg:gap-8">
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