import Link from "next/link"

const AddShopButton = () => {
  return (
    <Link href="#" className="group w-fit h-full flex items-center justify-center gap-2 rounded-lg px-2 underline decoration-primary-blue hover:decoration-primary-blue/80 duration-300">
        {/* <div className="relative rounded-full bg-primary-blue group-hover:bg-primary-blue/80 duration-300 w-10 h-10">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">+</span>
        </div> */}
        <div><span className="font-bold text-primary-blue group-hover:text-primary-blue/80"> + </span> Add Shop</div>
    </Link>
  )
}
export default AddShopButton