import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    course: String,      // 课程 ID，比如 "RS101"
    points: Number,
    dueDate: String,     // 直接存 "2025-12-20" 这样简单一点
    availableFrom: String,
    untilDate: String,
  },
  { collection: "assignments" }
);

export default schema;
