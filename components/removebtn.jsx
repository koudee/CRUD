'use client';

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function Removebtn({ id }) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm('Are you sure you want to delete this topic?');
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          router.refresh();
        } else {
          console.error("Failed to delete topic");
          // Optionally, show a user-friendly error message
        }
      } catch (error) {
        console.error("Error deleting topic:", error);
        // Optionally, show a user-friendly error message
      }
    }
  };

  return (
    <button
      onClick={removeTopic}
      className="p-2 rounded-md bg-red-700 hover:bg-red-600 transition duration-200"
    >
      <HiOutlineTrash size={24} className="text-white" />
    </button>
  );
}