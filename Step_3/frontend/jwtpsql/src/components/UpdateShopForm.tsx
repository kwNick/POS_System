'use client';

import { useAuth } from "@/context/AuthContext";
import Shop from "@/lib/models/shopModel";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateShopForm = ({shopId}:{shopId: string}) => {
    const {fetchShop} = useAuth();
    const [shop, setShop] = useState<Shop | null>(null);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [disabled, setDisabled] = useState(true);
    const [formMessage, setFormMessage] = useState("Must update fields to login!");

    const { updateShop, user } = useAuth();
    const router = useRouter();
    const pathName = usePathname();
    // console.log("Current path:", pathName); // Log the current path for debugging

    const handleClick = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(disabled) return;

        if (!confirm("Are you sure you want to update this shop? This action cannot be undone.")) {
            return;
        }
        setLoading(true);

        const success = await updateShop(name, location, shopId);

        setLoading(false);

        if(success) {
            alert("Shop updated successfully!");
            // router.back();
            if(pathName.startsWith('/shops/')){
                router.back();
            }
        }else {
            alert("Failed to update shop.");
        }
        
    };

    useEffect(()=>{
        if(loading){
            setFormMessage("...Pending Update!");
        }
        if(!loading && !disabled){
            setFormMessage("");
        }
        if(disabled){
            setFormMessage("Must Update A Field to submit!");
        }
    },[loading, disabled])

    useEffect(() =>{
        if(name == shop?.name && location == shop?.location){
            setDisabled(true);
        }else{
            setDisabled(false);
        }
    },[name, location])

    useEffect(() => {
        const getShop = async () => {
            const shopData = await fetchShop(shopId);
            // console.log(shopData);
            if (shopData) {
                setShop(shopData);
                setName(shopData.name);
                setLocation(shopData.location);
                // console.log("set Shop");
            }
        };

        getShop();
        // console.log(shop);

    }, []);

    if (!shop) {
        return <div>Loading...</div>;
    }

  return (
    <form onSubmit={handleClick} className="flex flex-col items-center justify-around gap-8 p-10 lg:p-14 xl:p-16 mb-12 lg:mb-16 w-[clamp(400px, 80%, 1000px)] h-[60vh] bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">
      <div className="w-3/4 h-3/4 flex flex-col items-center justify-around gap-8">
        <input
        id="name"
        name="name"
        type="text"
        placeholder="Shop Name"
        value={name}
        onChange={(e) => {setName(e.target.value); setError(null);}}
        className="w-full p-4 rounded-lg border-neutral-gray border-1 border-b-2 focus:outline-accent-purple"
        required
      />

      <input
        id="location"
        name="location"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-4 rounded-lg border-neutral-gray border-1 border-b-2 focus:outline-accent-purple"
        required
      />
      </div>
      <div>
            <button
                type="submit"
                disabled={loading || disabled}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 hover:scale-110 duration-300 rounded disabled:opacity-50 disabled:bg-gray-400 disabled:pointer-events-none not-disabled:cursor-pointer"
            >
                {loading ? 'Updating...' : 'Update'}
            </button>
        </div>
        {error && <p className="text-cta text-center">{error}</p>}

        <p className={`relative opacity-0 text-cta text-xs text-center duration-300 ${(loading || disabled) && "opacity-100"}`}>
          {formMessage}
        </p>
    </form>
  );
}
export default UpdateShopForm