"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function AddShopForm() {
  const { addShop, user } = useAuth();
  const router = useRouter();
  // console.log(user?.roles);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formMessage, setFormMessage] = useState("Must update fields to login!");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if(disabled) return;

    setLoading(true);
    setError(null);

    const success = await addShop(name, location);

    setLoading(false);

    if (success) {
        alert("Shop added successfully!");
        setName("");
        setLocation("");
        router.back();
        // if(user?.roles.filter((r) => r.name == 'ROLE_ADMIN')){
        //   // router.back();
        //   router.push('/admin');
        // }else{
        //   router.push('/dashboard');
        // }
    } else {
      console.log(success);
      alert("Failed to add shop.");
      setError("Shop with that name already exists!");
    }
  }

  useEffect(() => {
    if(name == "" && location == ""){
      setDisabled(true);
    }else if(name != "" && location != ""){
      setDisabled(false);
    }
  }, [name, location]);

  // Update form message
  useEffect(() => {
    if (loading) setFormMessage("...Pending Add Shop!");
    else if (!disabled) setFormMessage("");
    else setFormMessage("Must update fields to add shop!");
  }, [loading, disabled]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-around gap-8 p-10 lg:p-14 xl:p-16 mb-12 lg:mb-16 w-[clamp(400px, 80%, 1000px)] h-[60vh] bg-neutral-surface rounded-lg shadow-md shadow-neutral-white">
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

      <div className={`w-3/4 h-1/4 flex items-center justify-center `}>
        <button type="submit" disabled={loading || disabled} className="px-4 py-2 rounded-md bg-primary-purple text-neutral-white hover:bg-accent-purple hover:scale-110 duration-300 disabled:bg-gray-400 disabled:pointer-events-none not-disabled:cursor-pointer">
          {loading ? "Saving..." : "Add Shop"}
        </button>
      </div>
       {error && <p className="text-cta text-center">{error}</p>}

        <p className={`relative opacity-0 text-cta text-xs text-center duration-300 ${(loading || disabled) && "opacity-100"}`}>
          {formMessage}
        </p>
    </form>
  );
}
export default AddShopForm