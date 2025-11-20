"use client";

import Role from "@/lib/models/roleModel";
import Shop from "@/lib/models/shopModel";
import User from "@/lib/models/userModel";
import { jwtVerify } from "jose";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  role: string[] | null;
  user: User | null;
  usersWDetails: User[] | null;
  users: User[] | null;
  shops: Shop[] | null;
  roles: Role[] | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean | null>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean | null>;
  deleteProfile: () => void;
  fetchProfile: () => Promise<User | null>;
  fetchUsersWithDetails: () => Promise<User[] | null>;
  fetchUsers: () => Promise<User[] | null>;
  fetchShops: () => Promise<Shop[] | null>;
  fetchRoles: () => Promise<Role[] | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_JWT_AUTH_API_DOMAIN;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [usersWDetails, setUsersWDetails] = useState<User[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [shops, setShops] = useState<Shop[] | null>(null);
  const [roles, setRoles] = useState<Role[] | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  /* - - - - - Authentication Functions - - - - - */
  
  // Login function
  const login = async (username: string, password: string): Promise<boolean | null> => {
    if (!API_URL) return null;
    try {
      const res = await fetch(`http://${API_URL}/auth/login-refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // sets HttpOnly refresh token
      });

      if (!res.ok) return false;

      const data = await res.json();

      // console.log("Logged in: "+ JSON.stringify(data));

      const { payload }: { payload: { roles: string[], username: String } } = await jwtVerify(data.fullToken, new TextEncoder().encode("secret-key-making-it-very-strong"));

      setToken(data.fullToken);
      setRole(payload.roles);

      document.cookie = `role=${payload.roles.join(",")}; max-age=180; path=/; secure; samesite=strict`; // Store roles in a non-HttpOnly cookie for middleware access

      await fetchProfile(data.fullToken);
      return true;

    } catch (err) {
      console.error("Failed to fetch Login: " + err);
      return false;
    }

  };

  // Register a User
  const register = async (username: string, email: string, password: string): Promise<boolean | null> => {
    if (!API_URL) return null;

    try {
      const res = await fetch(`http://${API_URL}/auth/register-refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });
      if (!res.ok) return false;

      const data = await res.json();

      // console.log("Registered: " + JSON.stringify(data));

      const { payload }: { payload: { roles: string[], username: String } } = await jwtVerify(data.fullToken, new TextEncoder().encode("secret-key-making-it-very-strong"));

      setToken(data.fullToken);
      setRole(payload.roles);

      document.cookie = `role=${payload.roles.join(",")}; max-age=180; path=/; secure; samesite=strict`; // Store roles in a non-HttpOnly cookie for middleware access

      await fetchProfile(data.fullToken);
      return true;

    } catch (err) {
      console.error("Failed to fetch Register: " + err);
      return false;
    }

  };

  // logout function
  const logout = async () => {
    setToken(null);
    setRole(null);
    setUser(null);

    document.cookie = `role=; max-age=0; path=/`; // Store roles in a non-HttpOnly cookie for middleware access

    // optionally call backend /auth/logout-refresh to clear refreshToken
    try {
      await fetch(`http://${API_URL}/auth/logout-refresh`, {
        method: "POST",
        credentials: "include", // sets HttpOnly refresh token
      });
    } catch (error) {
      console.error("Logout Request Failed: " + error);
    }
  };

  // delete profile function
  const deleteProfile = async () => {
    setToken(null);
    setRole(null);
    setUser(null);
    setUsersWDetails(null);
    setUsers(null);
    setShops(null);
    setRoles(null);

    document.cookie = `role=; max-age=0; path=/`; // Store roles in a non-HttpOnly cookie for middleware access
    try {
      await fetch(`http://${API_URL}/api/delete`, {
        method: "DELETE",
        credentials: "include", // sets HttpOnly refresh token
      });
    } catch (error) {
      console.error("Delete Request Failed: " + error);
    }
  };

  /* - - - - - Fetch Data Functions - - - - - */

  // Fetch profile from backend, refresh access token if needed
  const fetchProfile = async (overrideToken?: string): Promise<User | null> => {
    if (!API_URL) return null;

    const authToken = overrideToken ?? token;
    try {
      let res = await fetch(`http://${API_URL}/api/profile`, {
        credentials: "include", // sends HttpOnly refresh token
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
      });

      // If token expired, refresh
      if (res.status == 403) {
        const refreshRes = await fetch(`http://${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include", // refreshToken cookie
        });

        if (!refreshRes.ok) {
          console.log("Logging out due to failed refresh!");
          logout();
          return null;
        }

        const data = await refreshRes.json();

        const { payload }: { payload: { roles: string[], username: String } } = await jwtVerify(data.fullToken, new TextEncoder().encode("secret-key-making-it-very-strong"));
        setRole(payload.roles);
        setToken(data.fullToken);

        document.cookie = `role=${payload.roles.join(",")}; max-age=180; path=/; secure; samesite=strict`; // Store roles in a non-HttpOnly cookie for middleware access

        // Retry profile fetch with new token
        res = await fetch(`http://${API_URL}/api/profile`, {
          credentials: "include",
          headers: { Authorization: `Bearer ${data.fullToken}` },
        });
      }

      if (!res.ok) throw new Error("Failed to fetch profile again after refresh.");

      const profileData: User = await res.json();

      setUser(profileData);
      return profileData;

    } catch (err) {
      console.error("Failed to fetch Profile: " + err);
      logout();
      return null;
    }
  };

  const fetchUsersWithDetails = async (overrideToken?: string): Promise <User[] | null> => {
    if (!API_URL) return null;

    const authToken = overrideToken ?? token;
    try {
      let res = await fetch(`http://${API_URL}/api/users`, {
        credentials: "include", // sends HttpOnly refresh token
        headers: authToken ? { Authorization: `Bearer ${authToken}`} : undefined,
      });

      // If token expired, refresh
      if (res.status == 403) {
        const refreshRes = await fetch(`http://${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include", // refreshToken cookie
        });

        if (!refreshRes.ok) {  // If refresh also fails, logout
          console.log("Logging out due to failed refresh!");
          logout();
          return null;
        }

        const data = await refreshRes.json();

        const { payload }: {payload: {roles: string[], username: string}} = await jwtVerify(data.fullToken, new TextEncoder().encode("secret-key-making-it-very-strong"));
        setRole(payload.roles);
        setToken(data.fullToken);

        document.cookie = `role=${payload.roles.join(",")}; max-age=180; path=/; secure; samesite=strict`; // Store roles in a non-HttpOnly cookie for middleware access

        // Retry profile fetch with new token
        res = await fetch(`http://${API_URL}/api/users`, {
          credentials: "include",
          headers: { Authorization: `Bearer ${data.fullToken}` },
        });
      }

      if (!res.ok) throw new Error("Failed to fetch Users with Details again, after refresh.");

      const usersData: User[] = await res.json();

      setUsersWDetails(usersData);
      return usersData;
    
    } catch (err) {
      console.error("Failed to fetch Users with details: "+err);
      return null;
    }
  };

  const fetchUsers = async (overrideToken?: string): Promise <User[] | null> => {
    if (!API_URL) return null;

    const authToken = overrideToken ?? token;
    try {
      let res = await fetch(`http://${API_URL}/users`, {
        credentials: "include", // sends HttpOnly refresh token
        headers: authToken ? { Authorization: `Bearer ${authToken}`} : undefined,
      });

      // If token expired, refresh
      if (res.status == 403) {
        const refreshRes = await fetch(`http://${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include", // refreshToken cookie
        });

        if (!refreshRes.ok) {  // If refresh also fails, logout
          console.log("Logging out due to failed refresh!");
          logout();
          return null;
        }

        const data = await refreshRes.json();

        const { payload }: {payload: {roles: string[], username: string}} = await jwtVerify(data.fullToken, new TextEncoder().encode("secret-key-making-it-very-strong"));
        setRole(payload.roles);
        setToken(data.fullToken);

        document.cookie = `role=${payload.roles.join(",")}; max-age=180; path=/; secure; samesite=strict`; // Store roles in a non-HttpOnly cookie for middleware access

        // Retry profile fetch with new token
        res = await fetch(`http://${API_URL}/users`, {
          credentials: "include",
          headers: { Authorization: `Bearer ${data.fullToken}` },
        });
      }

      if (!res.ok) throw new Error("Failed to fetch Users again, after refresh.");

      const usersData: {_embedded: {users: User[] } }= await res.json();

      setUsers(usersData._embedded.users);
      return usersData._embedded.users;
    
    } catch (err) {
      console.error("Failed to fetch Users: "+err);
      return null;
    }
  };

  const fetchShops = async (overrideToken?: string): Promise <Shop[] | null> => {
    if (!API_URL) return null;

    const authToken = overrideToken ?? token;
    try {
      let res = await fetch(`http://${API_URL}/shops`, {
        credentials: "include", // sends HttpOnly refresh token
        headers: authToken ? { Authorization: `Bearer ${authToken}`} : undefined,
      });

      // If token expired, refresh
      if (res.status == 403) {
        const refreshRes = await fetch(`http://${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include", // refreshToken cookie
        });

        if (!refreshRes.ok) {  // If refresh also fails, logout
          console.log("Logging out due to failed refresh!");
          logout();
          return null;
        }

        const data = await refreshRes.json();

        const { payload }: {payload: {roles: string[], username: string}} = await jwtVerify(data.fullToken, new TextEncoder().encode("secret-key-making-it-very-strong"));
        setRole(payload.roles);
        setToken(data.fullToken);

        document.cookie = `role=${payload.roles.join(",")}; max-age=180; path=/; secure; samesite=strict`; // Store roles in a non-HttpOnly cookie for middleware access

        // Retry profile fetch with new token
        res = await fetch(`http://${API_URL}/shops`, {
          credentials: "include",
          headers: { Authorization: `Bearer ${data.fullToken}` },
        });
      }

      if (!res.ok) throw new Error("Failed to fetch Users again, after refresh.");

      const shopsData: {_embedded: {shops: Shop[] } } = await res.json();

      setShops(shopsData._embedded.shops);
      return shopsData._embedded.shops;
    
    } catch (err) {
      console.error("Failed to fetch Shops: " + err);
      return null;
    }
  };

  const fetchRoles = async (overrideToken?: string): Promise <Role[] | null> => {
    if (!API_URL) return null;

    const authToken = overrideToken ?? token;
    try {
      let res = await fetch(`http://${API_URL}/roles`, {
        credentials: "include", // sends HttpOnly refresh token
        headers: authToken ? { Authorization: `Bearer ${authToken}`} : undefined,
      });

      // If token expired, refresh
      if (res.status == 403) {
        const refreshRes = await fetch(`http://${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include", // refreshToken cookie
        });

        if (!refreshRes.ok) {  // If refresh also fails, logout
          console.log("Logging out due to failed refresh!");
          logout();
          return null;
        }

        const data = await refreshRes.json();

        const { payload }: {payload: {roles: string[], username: string}} = await jwtVerify(data.fullToken, new TextEncoder().encode("secret-key-making-it-very-strong"));
        setRole(payload.roles);
        setToken(data.fullToken);

        document.cookie = `role=${payload.roles.join(",")}; max-age=180; path=/; secure; samesite=strict`; // Store roles in a non-HttpOnly cookie for middleware access

        // Retry profile fetch with new token
        res = await fetch(`http://${API_URL}/roles`, {
          credentials: "include",
          headers: { Authorization: `Bearer ${data.fullToken}` },
        });
      }

      if (!res.ok) throw new Error("Failed to fetch Roles again, after refresh.");

      const rolesData:{_embedded: {roles: Role[]}} = await res.json();

      setRoles(rolesData._embedded.roles);
      return rolesData._embedded.roles;
    
    } catch (err) {
      console.error("Failed to fetch Roles: " + err);
      return null;
    }
  };

  // On mount, attempt to refresh access token automatically
  useEffect(() => {
    (async () => {
      await fetchProfile();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if(role?.includes("ROLE_ADMIN")){
      (async () => { //you run them all in parallel but still get a single await for completion.
          await Promise.all([
            fetchUsersWithDetails(),
            fetchUsers(),
            fetchShops(),
            fetchRoles(),
          ]);

        })();
      }
      router.refresh()
  }, [role]);

  return (
    <AuthContext.Provider value={{ token, role, user, usersWDetails, users, shops, roles, loading, login, register, logout, deleteProfile, fetchProfile,  fetchUsersWithDetails, fetchUsers, fetchShops, fetchRoles}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
