'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterForm = () => {
    const { register } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formMessage, setFormMessage] = useState("Must update fields to login!");
    const [isUpdated, setIsUpdated] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Validate form fields
    useEffect(() => {
    if (username === "" || password === "" || email === "") {
        setIsUpdated(false);
    } else {
        setIsUpdated(true);
    }
    }, [username, email, password]);

    // Update form message
    useEffect(() => {
    if (isPending) setFormMessage("...Pending Registration");
    else if (isUpdated) setFormMessage("");
    else setFormMessage("Must update fields to register!");
    }, [isPending, isUpdated]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUpdated) return;

    setIsPending(true);
    setError(null);

    const success = await register(username, email, password);
    // console.log("success: " + success);

    setIsPending(false);

    if (success) {
        router.refresh(); // redirect after login
    } else {
        setError("Invalid username or password");
    }
    };

  return (
    <div className="relative p-10 lg:p-12 xl:p-14 w-[clamp(400px,2rem+38vw,700px)] h-[clamp(700px,2rem+60vh,1000px)] flex flex-col items-center justify-center gap-y-10 bg-neutral-surface shadow-md shadow-neutral-white rounded-md">
      
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-purple to-accent-blue opacity-10 rounded-md z-0 pointer-events-none"/>

        <div className="">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold underline">
            Register
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 w-full">
          <div className="w-1/2 flex flex-col gap-y-6 mx-auto">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 w-full"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={!isUpdated || isPending}
              className="px-4 py-2 rounded-md bg-primary-blue text-neutral-white hover:bg-accent-blue hover:scale-110 duration-300 disabled:bg-gray-400 disabled:pointer-events-none"
            >
              Register
            </button>
          </div>

          {error && <p className="text-cta text-center">{error}</p>}

          <p className={`relative opacity-0 text-cta text-xs text-center duration-500 ${(isPending || !isUpdated) && "opacity-100"}`}>
            {formMessage}
          </p>
        </form>
      </div>
  )
}
export default RegisterForm