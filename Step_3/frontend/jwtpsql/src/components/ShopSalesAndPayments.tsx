'use client';

import { useAuth } from "@/context/AuthContext";
import { SaleDTO, ShopDTO } from "@/lib/models/UserDataObject";

const ShopSalesAndPayments = ({ shopId }: {shopId: string}) => {
    const {userDataObject} = useAuth();
    
  return (
    <>
        <div className="w-full h-full p-6 flex flex-col items-center justify-start">
            <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Sales</h1>
            <ul className="w-full h-full flex flex-col items-center justify-start overflow-y-auto rounded">
                {userDataObject?.userData.shops.map((shop: ShopDTO) => {
                    if(shop.shop_info.id.toString() === shopId) {
                        return (
                            shop.sales.map((sale: SaleDTO,index) => (
                                <li key={sale.sale_info.id} className={`w-full flex items-center justify-center ${index%2==0 ? 'bg-neutral-black' : ''} rounded`}>
                                    <span className="w-[calc(25%-.5rem)] flex items-center justify-center">{sale.sale_info.created_at}</span>
                                    <span className="w-[calc(25%-.5rem)] flex items-center justify-center">{sale.sale_info.subtotal.toFixed(2)}</span>
                                    <span className="w-[calc(25%-.5rem)] flex items-center justify-center">${sale.sale_info.total.toFixed(2)}</span>
                                    <span className="w-[calc(25%-.5rem)] flex items-center justify-center">{sale.sale_info.employeeName}</span>
                                </li>
                            ))
                        );
                    }
                    return null;
                })}
            </ul>
        </div>

        <div className="w-full h-full p-6 flex flex-col items-center justify-start">
            <h1 className="text-3xl font-semibold mb-4 lg:mb-8 underline">Payments</h1>
            <ul className="w-full h-full flex flex-col items-center justify-start overflow-y-auto rounded">
                {userDataObject?.userData.shops.map((shop: ShopDTO) => {
                    if(shop.shop_info.id.toString() === shopId) {
                        return (
                            shop.sales.map((sale: SaleDTO,index) => {
                                return sale.payments.map((payment) => (
                                    <li key={payment.id} className={`w-full flex items-center justify-center ${index%2==0 ? 'bg-neutral-black' : ''} rounded`}>
                                        <span className="w-[calc(20%-.5rem)] flex items-center justify-center">{payment.created_at}</span>
                                        <span className="w-[calc(20%-.5rem)] flex items-center justify-center">${payment.amount.toFixed(2)}</span>
                                        <span className="w-[calc(20%-.5rem)] flex items-center justify-center">{payment.payment_method}</span>
                                        <span className="w-[calc(20%-.5rem)] flex items-center justify-center">{payment.status}</span>
                                        <span className="w-[calc(20%-.5rem)] flex items-center justify-center">{payment.transaction_reference}</span>
                                    </li>
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