import ShopDetails from "@/components/ShopDetails";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // console.log(id);

  return (
    <div className="w-3/4 h-[110vh] flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Shop Details:</h1>
      </div>
      <div className="w-3/4 h-1/2 flex items-center justify-center p-6 lg:p-8 xl:p-12 bg-neutral-surface rounded-lg shadow-md ">
        <ShopDetails shopId={id} />
      </div>
    </div>
  )
}
export default page