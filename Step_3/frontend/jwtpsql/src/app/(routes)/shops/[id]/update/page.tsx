import UpdateShopButton from "@/components/UpdateShopButton"

const page = async ({params}:{ params: Promise<{ id: string }> }) => {
  const {id} = await params;
  console.log(id);

  return (
    <div>
      Update Shop
      <UpdateShopButton name={"asdf"} location={"asdf"} shopId={id} />
    </div>
  )
}
export default page