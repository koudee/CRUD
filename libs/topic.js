import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";

export async function getTopics() {
  await connectMongoDB();
  const topics = await Topic.find();
  return JSON.parse(JSON.stringify(topics));
}


