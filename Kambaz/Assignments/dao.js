import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao(db) {
  // 某个课程的所有作业
  async function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  // 根据作业 ID 查一个
  async function findAssignmentById(assignmentId) {
    return model.findById(assignmentId);
  }

  // 为某个课程创建新作业
  async function createAssignment(courseId, assignment) {
    const newAssignment = {
      ...assignment,
      _id: uuidv4(),
      course: courseId,
    };
    return model.create(newAssignment);
  }

  // 更新作业
  async function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdates }
    );
  }

  // 删除作业
  async function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
