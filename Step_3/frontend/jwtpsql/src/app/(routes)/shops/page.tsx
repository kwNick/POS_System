import AddShopButton from "@/components/AddShopButton"
import ShopsList from "@/components/ShopsList"

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-2">
        <div>
            <h1>shopsPage</h1>
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-screen w-full py-2">
            <AddShopButton />
            <ShopsList />
        </div>
    </div>
  )
}
export default page