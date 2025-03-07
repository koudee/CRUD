"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/verify");
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return null;
  }

  if (pathname === "/auth/login") {
    return null;
  }

  const handleTitleClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 px-8 py-6 shadow-2xl border-b border-gray-800 relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {isLoggedIn && (
            <Link
              className={`text-red-400 font-semibold px-6 py-4 rounded-2xl hover:bg-red-800 transition duration-300 text-lg shadow-lg border border-red-600`}
              href={"/"}
            >
              Log Out
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-8">
          <span
            onClick={handleTitleClick}
            className="font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 tracking-wide uppercase shadow-xl cursor-pointer"
          >
            CRUD Application
          </span>
        </div>
        {isLoggedIn && (
          <div className="flex items-center space-x-6">
            <Link
              className={`text-gray-300 font-semibold px-6 py-4 rounded-2xl hover:bg-gray-800 transition duration-300 text-lg shadow-lg border border-gray-700`}
              href={"/dashboard"}
            >
              Dashboard
            </Link>
            <Link
              className={`text-green-300 font-semibold px-8 py-5 rounded-2xl hover:bg-green-800 transition duration-300 text-xl shadow-2xl border border-green-600`}
              href={"/addTopic"}
            >
              ADD
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}