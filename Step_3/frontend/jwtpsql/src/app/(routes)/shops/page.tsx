import AddShopButton from "@/components/AddShopButton"
import ShopsList from "@/components/ShopsList"

const page = () => {
  return (
    <div className="flex flex-col items-center gap-8 min-h-[80vh] w-full p-4 lg:p-6">
        <div className="w-full h-[10vh] flex items-center justify-start">
            <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">
              shopsPage
            </h1>
        </div>
        
        <div className="h-[90%] w-3/4 flex flex-col items-center justify-center py-2 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">
          <div className="w-full flex items-center justify-end pt-6 pr-8">
            <AddShopButton />
          </div>
          
          <ShopsList />
        </div>
    </div>
  )
}
export default page