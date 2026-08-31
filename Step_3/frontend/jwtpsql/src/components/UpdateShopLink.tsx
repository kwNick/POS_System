import Link from "next/link"

const UpdateShopLink = ({shopId}:{shopId: number}) => {
  return (
    <Link className="px-1 py-2 rounded-md bg-primary-purple text-neutral-white hover:bg-accent-purple hover:scale-110 duration-300" href={`/shops/${shopId}/update`}>Update</Link>
  )
}
export default UpdateShopLink