import Link from "next/link"

const HomeButton = () => {
    return (
        <div className="w-1/2 h-full flex items-center justify-left gap-x-8">
            <Link href="/" className="hover:text-neutral-gray hover:scale-110 duration-300 font-bold py-2 px-4" >
                POS
            </Link>

            <div className="w-fit h-full flex items-center justify-center">
                <ul className="w-fit flex items-center justify-center gap-x-6">
                    <li className="w-fit"><Link href={"#"}>Business Types</Link></li>
                    <li className="w-fit"><Link href={"#"}>Products</Link></li>
                    <li className="w-fit"><Link href={"#"}>Hardware</Link></li>
                    <li className="w-fit"><Link href={"#"}>Pricing</Link></li>
                </ul>
            </div>
        </div>
    )
}
export default HomeButton