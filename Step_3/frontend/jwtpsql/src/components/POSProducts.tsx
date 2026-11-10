'use client';

import { useAuth } from "@/context/AuthContext";
import { ProductSalesReportModel } from "@/lib/models/ProductSalesReport";
import { ProductDTO, ShopDTO } from "@/lib/models/UserDataObject";
import { useEffect, useState } from "react";

const POSProducts = ({id}:{id: string}) => {
    const { userDataObject, fetchPSRByShopIdAndDateRange } = useAuth();

    const [display, setDisplay] = useState<(ProductDTO|{id: number, name: string, price: number})[]|ProductDTO[] | ProductSalesReportModel[] | null>(null);
    const [cart, setCart] = useState<{id: number, name: string, price: number, amt: number}[]>([]);
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [shop, setShop] = useState<ShopDTO | null>(null);
    const [mostRecent, setMostRecent] = useState<(ProductDTO|{id: number, name: string, price: number})[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    const TopProductsDisplay = async () => {
        setLoading(true);
        const psrData = await fetchPSRByShopIdAndDateRange(id, "2026-01-01", "2026-12-31", "unitsSold");
        console.log("psrData: ", psrData);
        setDisplay(psrData);
        setLoading(false);
    };

    const ProductsDisplay = () => {
        setLoading(true);
        setDisplay(products);
        setLoading(false);
    };
    const MostRecentDisplay = () => {
        setLoading(true);
        setDisplay(mostRecent);
        setLoading(false);
    };

    useEffect(()=>{
        setDisplay(userDataObject?.userData.shops.filter((shop) => shop.shop_info.id == Number(id))[0]?.products ?? null)
        setProducts(userDataObject?.userData.shops.filter((shop) => shop.shop_info.id == Number(id))[0]?.products ?? []);
        setShop(userDataObject?.userData.shops.filter((shop) => shop.shop_info.id == Number(id))[0] ?? null)

        const getPSRByUnitsShopIdAndDateRange = async () => {
            const psrData = await fetchPSRByShopIdAndDateRange(id, "2026-01-01", "2026-12-31", "unitsSold");
            // if (psrData) {
            //     setPsrByUnitsShopIdAndDateRange(psrData);
            // }
        };

        getPSRByUnitsShopIdAndDateRange()
        setLoading(false);
    }, []);

    console.log(display);
    console.log(products);
    console.log(mostRecent);
    console.log(cart);
    console.log(shop);

  return (
    <>
        <div className="w-full h-[10%] flex flex-col items-center justify-center pb-2">
            <h1>POS For {shop?.shop_info.name}</h1>
            
            <p>
                Need Products List for shop and a method for categorizing the products. Then you need a method, redux, useState, useContext, for adding updating and removing products from a cart for checkout.
            </p>
            <div className="w-full h-full flex items-center justify-center gap-4">
                <input 
                type="search"
                placeholder="Search Products..."
                className="w-1/2 bg-neutral-white rounded placeholder:text-accent-blue"/>
                <button type="submit" className="w-[5%] px-2 py-1 bg-accent-blue rounded cursor-pointer">Search</button>
            </div>
        </div>

        <div className="w-full h-[calc(90%-1rem)] flex items-center justify-center">
            <div className="w-[20%] h-full flex items-center justify-center border-1">
                <ul className="w-full h-full flex flex-col items-center justify-center gap-5 lg:gap-8 p-6 lg:p-8">
                    {/* Can make this a list/type/model with index */}
                    <li className="w-full h-[calc(20%-.5rem)] flex items-center justify-center text-center bg-neutral-surface rounded-lg shadow-md shadow-neutral-white cursor-pointer underline" onClick={ProductsDisplay}>
                        <span>Products</span>
                    </li>

                    <li className="w-full h-[calc(20%-.5rem)] flex items-center justify-center text-center bg-neutral-surface rounded-lg shadow-md shadow-neutral-white cursor-pointer underline">
                        <span>Discounts</span>
                    </li>

                    <li className="w-full h-[calc(20%-.5rem)] flex items-center justify-center text-center bg-neutral-surface rounded-lg shadow-md shadow-neutral-white cursor-pointer underline">
                        <span>Categories</span>
                    </li>

                    <li className="w-full h-[calc(20%-.5rem)] flex items-center justify-center text-center bg-neutral-surface rounded-lg shadow-md shadow-neutral-white cursor-pointer underline" onClick={TopProductsDisplay}>
                        <span>Top Products</span>
                    </li>

                    <li className="w-full h-[calc(20%-.5rem)] flex items-center justify-center text-center  bg-neutral-surface rounded-lg shadow-md shadow-neutral-white cursor-pointer underline" onClick={MostRecentDisplay}>
                        <span>Most Recent</span>
                    </li>
                </ul>
            </div>
            
            <div className="w-[calc(50%-1rem)] h-full flex flex-col items-start justify-start border-1 overflow-y-auto">

                {!loading ? (
                    display ? (
                        <ul className="w-full h-full flex flex-wrap content-start items-center justify-center gap-5 lg:gap-8 p-2">
                            {display.map((product: ProductDTO|ProductSalesReportModel|{id: number, name: string, price: number}, index: number) => {
                                const isSalesReport = "productPrice" in product; 
                                return (
                                    <li 
                                    key={index} 
                                    onClick={() => {
                                        setMostRecent(current => [
                                            {
                                                id: isSalesReport ? product.productId : product.id,
                                                name: isSalesReport ? product.productName : product.name,
                                                price: isSalesReport ? product.productPrice : product.price
                                            },
                                            ...current.filter(
                                                prod => prod.id !== (isSalesReport ? product.productId : product.id)
                                            )
                                        ]);
                                        let newAmt = 0;
                                        if(cart.find(prod => prod.id === (isSalesReport ? product.productId : product.id))){
                                            setCart(currentCart => 
                                                currentCart.map((prod) => prod.id === (isSalesReport ? product.productId : product.id) ? { ...prod, amt: prod.amt+1} : prod ));
                                        }else{
                                            setCart([...cart, { 
                                                id: isSalesReport ? product.productId : product.id,
                                                name: isSalesReport ? product.productName : product.name, 
                                                price: isSalesReport ? product.productPrice : product.price, 
                                                amt: ++newAmt
                                            }]);
                                        }
                                    }}
                                    className={`w-[calc(30%-1rem)] h-[calc(25%-1rem)] flex flex-col items-center justify-center bg-neutral-surface rounded-lg shadow-md shadow-neutral-white cursor-pointer ${index%2==0 ? 'bg-neutral-black' : ''}`}>
                                        <span>{isSalesReport ? product.productName : product.name}</span>
                                        <span>{isSalesReport ? product.productPrice : product.price}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    ):(    
                        <div className="w-full h-full flex items-center justify-center">
                            <p>No Product Data!</p> 
                        </div>
                    )
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <p>Loading Data</p>
                    </div>
                )}

            </div>
            
            <div className="w-[calc(30%-1rem)] h-full flex flex-col items-center justify-center border-1 ">

                <div className="w-full h-[calc(80%)] flex flex-col items-center justify-center px-2 lg:px-4 pb-2 pt-4 lg:pt-6">
                    {cart.length > 0 ? (
                        <ul className="w-full h-full flex flex-wrap content-start items-start justify-start gap-5 lg:gap-7 p-2 overflow-y-auto border-1">
                            {cart.map((product, index) => {
                                // const isSalesReport = "productPrice" in product;
                                return(
                                    <li 
                                    key={index}
                                    className={`w-full h-[20%] border-1 bg-neutral-surface rounded-lg shadow-md shadow-neutral-white ${index%2==0 ? 'bg-neutral-surface' : ''}`}>
                                        <div className="w-[100%] h-[70%] flex items-center justify-between border-b-1 p-1">
                                            <span>{product.name} - {product.price}</span>
                                            <button 
                                            className="p-1 border-1 rounded cursor-pointer"
                                            onClick={() => {const newCarts = cart.filter(prod => prod.id !== product.id); setCart(newCarts); }}
                                            
                                            >
                                                remove
                                            </button>
                                        </div>

                                        <div className="w-[30%] h-[30%] flex items-center justify-around">
                                            <button className="w-[calc(25%)] h-[80%] rounded border-1 flex items-center justify-center"
                                            onClick={() => {setCart(currentCart =>
                                                currentCart.map(prod =>
                                                    prod.id === product.id ? {...product, amt: prod.amt+1} : prod));
                                                }}>
                                                    +
                                                </button>

                                            <span className="w-[calc(25%)] h-[80%] rounded flex items-center justify-center" >
                                                {product.amt}
                                            </span>

                                            <button 
                                            className="w-[calc(25%)] h-[80%] rounded border-1 flex items-center justify-center"
                                            onClick={() => {
                                                setCart(currentCart =>
                                                    currentCart.map(prod => {
                                                        return (prod.id === product.id) ? {...prod, amt: prod.amt-1} : prod
                                                    }).filter(prod => prod.amt > 0));
                                                }}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No Items in Cart!</p>
                    )}
                </div>

                <div className="w-full h-[calc(40%)] flex flex-col items-start justify-center border-t-1 px-2">
                    <div className="w-full h-[calc(100%)] flex items-start justify-between border-b-1">
                        <p>Total Items: </p>
                        <p>{cart.reduce((acc, product) => acc += product.amt, 0)}</p>
                    </div>

                    <div className="w-full h-[calc(100%)] flex items-start justify-between border-b-1">
                        <p>subtotal: </p>
                        <p>{cart.reduce((acc, product) => acc += product.price*product.amt, 0).toFixed(2)}</p>
                    </div>

                    <div className="w-full h-[calc(100%)] flex items-start justify-between border-b-1">
                        <p>tax: </p>
                        <p>{(cart.reduce((acc, product) => acc += product.price*product.amt, 0)*.075).toFixed(2)}</p>
                    </div>
                    
                    <div className="w-full h-[calc(100%)] flex items-start justify-between border-b-1">
                        <p>total: </p>
                        <p>{(cart.reduce((acc, product) => acc += product.price*product.amt, 0) + cart.reduce((acc, product) => acc += product.price*product.amt, 0)*.075).toFixed(2)}</p>
                    </div>

                    <div className="w-full h-[calc(50%)] flex items-center justify-center">
                        <button className="w-[calc(40%)] h-[75%] flex items-center justify-center border-1 p-2 rounded">Checkout</button>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}
export default POSProducts