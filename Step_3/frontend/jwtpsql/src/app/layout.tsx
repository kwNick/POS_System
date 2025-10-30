import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavAuth from "../components/NavAuth";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JWT + PostgreSQL Auth",
  description: "Template JWT Auth system with PostgreSQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen `}
      >
        <AuthProvider>
          <nav className=" w-full h-1/5 bg-neutral-black text-neutral-white flex items-center justify-center">
            <NavAuth />
          </nav>

          <div className="relative w-full h-full bg-neutral-black text-neutral-white flex flex-col items-center z-10">
            {children}
          </div>

          <footer className="w-full min-h-[35vh] flex items-center justify-around md:sticky md:bottom-0">
            <Footer />
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
