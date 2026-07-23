"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

function AddShopForm() {
  const { addShop } = useAuth();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const success = await addShop(name, location);

    setLoading(false);

    if (success) {
        alert("Shop added successfully!");
    } else {
      alert("Failed to add shop.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-10 lg:p-14 xl:p-16 w-[clamp(400px, 90%, 1000px)] bg-neutral-surface rounded-lg shadow-md">
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Shop Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        id="location"
        name="location"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Shop"}
      </button>
    </form>
  );
}
export default AddShopForm