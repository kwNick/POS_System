'use client';

import { ShopDTO, EmployeeDTO, ProductDTO } from "@/lib/models/UserDataObject";
import { useAuth } from "@/context/AuthContext";

const ShopProductsAndEmployees = ({ shopId }: {shopId: string}) => {
    const { userDataObject } = useAuth();
    
  return (
    <>
        <div className="w-full h-full p-6 flex flex-col items-center justify-start">
            <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Employees</h1>
            <ul>
                {userDataObject?.userData.shops.map((shop: ShopDTO) => {
                    if(shop.shop_info.id.toString() === shopId) {
                        return (
                            shop.employees.map((employee: EmployeeDTO) => (
                                <li key={employee.id}>{employee.first_name} {employee.last_name} - {employee.position}</li>
                            ))
                        );
                    }
                    return null;
                })}
            </ul>
            
            <div>
                Add employee
            </div>
        </div>

        <div className="w-full h-full p-6 flex flex-col items-center justify-start">
            <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Products</h1>
            
            <ul>
                {userDataObject?.userData.shops.map((shop: ShopDTO) => {
                    if(shop.shop_info.id.toString() === shopId) {
                        return (
                            shop.products.map((product: ProductDTO) => (
                                    <li key={product.id}>{product.name} - {product.stockQuantity} units - {product.price} price - SKU: {product.sku}</li>
                                ))
                            );
                        }
                    return null;
                })}
            </ul>

            <div>
                Add Product
            </div>
            
        </div>
    </>
  );
}
export default ShopProductsAndEmployees