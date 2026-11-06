import ShopDetails from "@/components/ShopDetails";
import ShopProductsAndEmployees from "@/components/ShopProductsAndEmployees";
import ShopSalesAndPayments from "@/components/ShopSalesAndPayments";
import { SaleDTO, ShopDTO } from "@/lib/models/UserDataObject";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // console.log(id);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-4 lg:p-6">
      <div className="w-full h-[10vh] flex items-center justify-start">
        <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">
          Shop Details:
        </h1>
      </div>

      <div className="w-4/5 h-full flex items-center justify-center p-6 lg:p-8 xl:p-12 mb-4 lg:mb-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">
        <ShopDetails shopId={id} />
      </div>

      <div className="w-full h-[85vh] flex items-center justifty-start gap-6 lg:gap-8 p-6 lg:p-8 xl:p-12 mb-4 lg:mb-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">
        <ShopProductsAndEmployees shopId={id} />
        
      </div>

      <div className="w-full h-[85vh] flex items-center justifty-start gap-6 lg:gap-8 p-6 lg:p-8 xl:p-12 mb-4 lg:mb-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">
        <ShopSalesAndPayments shopId={id} />
      </div>
    </div>
  )
}
export default page