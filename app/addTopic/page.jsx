"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title || !description) {
      alert("Title and description are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full p-12 rounded-3xl shadow-2xl bg-gradient-to-r from-gray-900 via-black to-gray-900 space-y-10"
      >
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-6 tracking-tight">
            Add Topic
          </h2>
          <p className="text-gray-300 text-lg italic">Create a new topic with description</p>
        </div>

        <div className="space-y-5">
          <label
            htmlFor="title"
            className="block text-2xl font-semibold text-gray-200 tracking-wide uppercase transition-colors duration-300 hover:text-pink-300"
          >
            Topic
          </label>
          <input
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full px-6 py-5 rounded-2xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-300 text-xl transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-300"
            type="text"
            placeholder="Enter topic title"
          />
        </div>

        <div className="space-y-5">
          <label
            htmlFor="description"
            className="block text-2xl font-semibold text-gray-200 tracking-wide uppercase transition-colors duration-300 hover:text-pink-300"
          >
             Description
          </label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full px-6 py-5 rounded-2xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-300 resize-none text-xl transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-300"
            placeholder="Enter topic description"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-5 rounded-full text-white font-extrabold text-2xl tracking-wide uppercase transition-all duration-300 shadow-2xl ${
            isSubmitting
              ? "bg-gradient-to-r from-green-700 to-green-900 transform scale-95"
              : "bg-gradient-to-r from-gray-800 via-green-700 to-gray-800 hover:from-green-700 hover:to-green-900 hover:via-green-800 hover:shadow-inner"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add "}
        </button>
      </form>
    </div>
  );
}