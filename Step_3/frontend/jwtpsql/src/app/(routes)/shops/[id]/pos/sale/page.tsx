import POSProducts from "@/components/POSProducts";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="w-full h-[90vh] flex flex-col items-start justify-center p-6 lg:p-8">
        <POSProducts id={id} />
    </div>
  )
}
export default page