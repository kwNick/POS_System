import Link from "next/link"

const HomeButton = () => {
    return (
        <div className=" h-full flex items-center justify-center">
            <Link href="/" className="hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4" >
                POS
            </Link>
        </div>
    )
}
export default HomeButton