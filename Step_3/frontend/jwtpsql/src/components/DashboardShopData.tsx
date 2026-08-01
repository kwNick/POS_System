import User from "@/lib/models/userModel"
import AddShopButton from "./AddShopButton"
// import DeleteShopButton from "./DeleteShopButton"
import Shop from "@/lib/models/shopModel"
import Link from "next/link"

const DashboardShopData = ({ user }: { user: User }) => {
  return (
    <div className=" p-10 lg:p-14 xl:p-16 w-full bg-neutral-surface rounded-lg shadow-md">
                        
        <div className="flex gap-5 items-center justify-center">
            <h2 className="text-3xl font-semibold mb-4"><Link href={`/shops`}>Your Shops</Link></h2>
                <AddShopButton />
        </div>

        <div>
            {user.shops.length > 0 ? (
                <ul>
                    {user.shops.map((shop: Shop) => (
                        <div key={shop.name} >
                            <Link href={`/shops/${shop.id}`} key={shop.name}>
                                    <li className="italic underline" >{shop.name} - {shop.location}</li>
                            </Link>
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