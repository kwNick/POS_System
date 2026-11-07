'use client';

import { ShopDTO, EmployeeDTO, ProductDTO } from "@/lib/models/UserDataObject";
import { useAuth } from "@/context/AuthContext";

const ShopProductsAndEmployees = ({ shopId }: {shopId: string}) => {
    const { userDataObject } = useAuth();
    
  return (
    <>
        <div className="w-full h-full p-6 flex flex-col items-center justify-start">
            <div className=" w-full flex items-center justify-center gap-8">
                <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Employees</h1>
                <div className="border-1 p-1">
                    Add employee
                </div>
            </div>

            <ul className="w-full h-full flex flex-col items-center justify-start overflow-y-auto rounded">
                {userDataObject?.userData.shops.map((shop: ShopDTO) => {
                    if(shop.shop_info.id.toString() === shopId) {
                        return (
                            shop.employees.map((employee: EmployeeDTO, index) => (
                                <li key={employee.id} className={`w-full flex items-center justify-center ${index%2==0 ? 'bg-neutral-black' : ''} rounded`}>
                                    <span className="w-[calc(33%-.5rem)] flex items-center justify-center">{employee.first_name}</span>
                                    <span className="w-[calc(33%-.5rem)] flex items-center justify-center">{employee.last_name}</span>
                                    <span className="w-[calc(33%-.5rem)] flex items-center justify-center">{employee.position}</span>
                                </li>
                            ))
                        );
                    }
                    return null;
                })}
            </ul>
            
            
        </div>

        <div className="w-full h-full p-6 flex flex-col items-center justify-start">
            <div className=" w-full flex items-center justify-center gap-8">
                <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Products</h1>
                <div className="border-1 p-1">
                    Add Product
                </div>
            </div>

            <ul className="w-full h-full flex flex-col items-center justify-start overflow-y-auto rounded">
                {userDataObject?.userData.shops.map((shop: ShopDTO) => {
                    if(shop.shop_info.id.toString() === shopId) {
                        return (
                            shop.products.map((product: ProductDTO, index) => (
                                    <li key={product.id} className={`w-full flex items-center justify-center ${index%2==0 ? 'bg-neutral-black' : ''} rounded`}>
                                        <span className="w-[calc(25%-.5rem)] flex items-center justify-center">{product.name}</span>
                                        <span className="w-[calc(25%-.5rem)] flex items-center justify-center">{product.stockQuantity} units</span>
                                        <span className="w-[calc(25%-.5rem)] flex items-center justify-center">{product.price} price</span>
                                        <span className="w-[calc(25%-.5rem)] flex items-center justify-center">SKU: {product.sku}</span>
                                    </li>
                                ))
                            );
                        }
                    return null;
                })}
            </ul>
        </div>
    </>
  );
}
export default ShopProductsAndEmployees