import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

    return (
    <div className="w-full h-[100vh] flex items-start justify-center p-6 lg:p-10 gap-8 lg:gap-12">
        <div className="w-[calc(50%-1rem)] h-full flex flex-col items-center justify-start p-6 lg:p-8 xl:p-12 mb-4 lg:mb-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">

        </div>

        <div className="w-[calc(50%-1rem)] h-full flex flex-col items-center justify-center p-6 lg:p-8 xl:p-12 mb-4 lg:mb-8 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">

          <ul className="w-full h-full flex flex-col items-center justify-center gap-4">
            <li className="w-3/4 text-3xl p-2 text-center"><Link href={`/shops/${id}/pos/sale`} >POS</Link></li>
            <li className="w-3/4 text-3xl p-2 text-center"><Link href={`/data`} >Sales</Link></li>
            <li className="w-3/4 text-3xl p-2 text-center"><Link href={`/data`} >Employees</Link></li>
            <li className="w-3/4 text-3xl p-2 text-center"><Link href={`/data`} >Products</Link></li>
            <li className="w-3/4 text-3xl p-2 text-center"><Link href={`/data`} >Exit</Link></li>
          </ul>
          
        </div>
    </div>
  )
}
export default page