import Removebtn from "./removebtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopic = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading topics", error);
    return { topics: null, error: "Failed to load topics." };
  }
};

export default async function Topic() {
  const { topics, error } = await getTopic();

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!topics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-6 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl transition-transform duration-300 hover:scale-102"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{t.title}</h2>
              <p className="text-gray-400 text-lg">{t.description}</p>
            </div>
            <div className="flex gap-4 items-center">
              <Removebtn id={t._id} />
              <Link href={`/editTopic/${t._id}`} className="p-2 rounded-md hover:bg-gray-700 transition duration-200">
                <HiPencilAlt size={28} className="text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}