import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findAll = (req, res) => {
    res.json(dao.findAllEnrollments());
  };

  const enroll = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.body;
    const newE = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(newE);
  };

  const unenroll = (req, res) => {
    const { enrollmentId } = req.params;
    const result = dao.unenroll(enrollmentId);
    res.json(result);
  };

  const findMyEnrollments = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const data = dao.findEnrollmentsForUser(currentUser._id);
    res.json(data);
  };

  app.get("/api/enrollments", findAll);
  app.post("/api/enrollments", enroll);
  app.delete("/api/enrollments/:enrollmentId", unenroll);
  app.get("/api/users/current/enrollments", findMyEnrollments);
}
