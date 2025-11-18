import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  const { enrollments } = db;

  function findAllEnrollments() {
    return db.enrollments;
  }

  function enrollUserInCourse(userId, courseId) {
    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    };
    db.enrollments = [...db.enrollments, newEnrollment];
    return newEnrollment;
  }

  function unenroll(enrollmentId) {
    db.enrollments = db.enrollments.filter(
      (e) => e._id !== enrollmentId
    );
    return { status: "ok" };
  }

  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }

  return {
    findAllEnrollments,
    enrollUserInCourse,
    unenroll,
    findEnrollmentsForUser
  };
}
