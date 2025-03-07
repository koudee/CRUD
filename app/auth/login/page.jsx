"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post("/api/auth/login", { username, password });
      push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed. You sure you remembered your password? Or did you just type gibberish?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  flex flex-col items-center px-16">
      <div className="text-center mt-12 mb-16">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 tracking-tight">
          Welcome to the Data Manipulation Emporium (Where Dreams Go to Get CRUD-ed)
        </h1>
        <p className="text-2xl mt-6 text-gray-300">
          Where you can, at your whim: <span className="font-semibold">C</span>reate (and hope it doesn't break), <span className="font-semibold">R</span>ead (because knowledge is... something), <span className="font-semibold">U</span>pdate (because change is inevitable, even if it's a bad one), and <span className="font-semibold">D</span>elete (because sometimes, you just need to watch the world burn).
        </p>
      </div>
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-12 rounded-3xl shadow-2xl w-[40rem] text-gray-200">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-10 text-center tracking-tight">
          Login (If You Must. Or, You Know, If You Want To.)
        </h1>
        {error && <p className="text-red-400 mb-6 text-center italic">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-semibold mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username (or something vaguely resembling it)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password (the one you definitely remember)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-extrabold text-lg tracking-wide uppercase transition-all duration-300 shadow-2xl hover:shadow-inner ${
              loading ? "opacity-70 cursor-wait" : "hover:from-blue-800 hover:to-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging In... (Please be patient. Or go make a sandwich.)" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}