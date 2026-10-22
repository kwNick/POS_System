import { useAuth } from "@/context/AuthContext";
import { AllSalesByUsersModel } from "@/lib/models/AllSalesByUsers";

const AllSalesByUsers = () => {
    const { allSalesByUsers } = useAuth();
    console.log("All Sales By Users: ", allSalesByUsers);
    console.log("Count of sales: ", allSalesByUsers?.length);

  return (
    <div>
        <h2>All Sales By Users</h2>
        <p>Total Sales Count: {allSalesByUsers?.length}</p>

        {/* <ul>
            {allSalesByUsers?.map((sale: AllSalesByUsersModel) => (
                <li key={sale.saleId}>
                    Sale ID: {sale.saleId}, User: {sale.username}, Subtotal: {sale.subtotal}, Tax: {sale.tax}, Total: {sale.total}, Created At: {sale.created_at}
                </li>
            ))}
        </ul> */}

        <table>
            <thead>
                <tr>
                    <th>Sale ID</th>
                    <th>Username</th>
                    <th>Subtotal</th>
                    <th>Tax</th>
                    <th>Total</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                {allSalesByUsers?.map((sale: AllSalesByUsersModel) => (
                    <tr key={sale.saleId}>
                        <td>{sale.saleId}</td>
                        <td>{sale.username}</td>
                        <td>{sale.subtotal}</td>
                        <td>{sale.tax}</td>
                        <td>{sale.total}</td>
                        <td>{sale.createdAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
export default AllSalesByUsers