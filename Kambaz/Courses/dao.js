import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {

  // ======================================================
  // GET all courses
  // ======================================================
  const findAllCourses = () => {
    // 返回全部字段，或你也可以只选部分属性
    return model.find();
  };

  // ======================================================
  // CREATE a new course
  // ======================================================
  const createCourse = (course) => {
    const newCourse = {
      ...course,
      _id: uuidv4(),     // keep your UUID style
    };
    return model.create(newCourse);
  };

  // ======================================================
  // UPDATE a course (correct MongoDB syntax)
  // ======================================================
  const updateCourse = (courseId, courseUpdates) => {
    return model.updateOne(
      { _id: courseId },
      { $set: courseUpdates }
    );
  };

  // ======================================================
  // DELETE a course
  // ======================================================
  const deleteCourse = (courseId) => {
    return model.deleteOne({ _id: courseId });
  };

  // ======================================================
  // EXPORT DAO API
  // ======================================================
  return {
    findAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
