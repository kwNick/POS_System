'use client';

import { useAuth } from "@/context/AuthContext";
import { SaleDTO, ShopDTO } from "@/lib/models/UserDataObject";

const ShopSalesAndPayments = ({ shopId }: {shopId: string}) => {
    const {userDataObject} = useAuth();
    
  return (
    <>
        <div className="w-full h-full p-6 flex flex-col items-center justify-start">
            <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Sales</h1>
            <ul>
                {userDataObject?.userData.shops.map((shop: ShopDTO) => {
                    if(shop.shop_info.id.toString() === shopId) {
                        return (
                            shop.sales.map((sale: SaleDTO) => (
                                <li key={sale.sale_info.id}>{sale.sale_info.created_at} - {sale.sale_info.subtotal.toFixed(2)} - ${sale.sale_info.total.toFixed(2)} - {sale.sale_info.employeeName}</li>
                            ))
                        );
                    }
                    return null;
                })}
            </ul>
        </div>

        <div className="w-full h-full p-6 flex flex-col items-center justify-start">
            <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Payments</h1>
            <ul>
                {userDataObject?.userData.shops.map((shop: ShopDTO) => {
                    if(shop.shop_info.id.toString() === shopId) {
                        return (
                            shop.sales.map((sale: SaleDTO) => {
                                return sale.payments.map((payment) => (
                                    <li key={payment.id}>{payment.created_at} - ${payment.amount.toFixed(2)} - {payment.payment_method} - {payment.status} - {payment.transaction_reference}</li>
                                ));
                            })
                        );
                    }
                    return null;
                })}
            </ul>
        </div>
    </>
  )
}
export default ShopSalesAndPayments