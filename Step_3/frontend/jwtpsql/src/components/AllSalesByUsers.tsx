import { useAuth } from "@/context/AuthContext";
import { AllSalesByUsersModel } from "@/lib/models/AllSalesByUsers";

const AllSalesByUsers = () => {
    const { allSalesByUsers } = useAuth();
    console.log("All Sales By Users: ", allSalesByUsers);

  return (
    <div>
        <h2>All Sales By Users</h2>

        <ul>
            {allSalesByUsers?.map((sale: AllSalesByUsersModel) => (
                <li key={sale.saleId}>
                    Sale ID: {sale.saleId}, User: {sale.username}, Subtotal: {sale.subtotal}, Tax: {sale.tax}, Total: {sale.total}, Created At: {sale.created_at}
                </li>
            ))}
        </ul>
    </div>
  )
}
export default AllSalesByUsers