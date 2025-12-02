import UsersDao from "./dao.js";

export default function UserRoutes(app) {
  const dao = UsersDao();

  // ===============================
  // 🔹 AUTH ROUTES
  // ===============================
// Get current profile
app.post("/api/users/profile", (req, res) => {
  const currentUser = req.session["currentUser"];
  if (!currentUser) {
    return res.sendStatus(401);
  }
  res.json(currentUser);
});

  // SIGNIN
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (!user) {
      res.sendStatus(401);
      return;
    }
    req.session["currentUser"] = user;
    res.json(user);
  };

  // SIGNUP
  const signup = async (req, res) => {
    const user = await dao.createUser(req.body);
    req.session["currentUser"] = user;
    res.json(user);
  };

  // PROFILE
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  // SIGNOUT
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // ===============================
  // 🔹 CRUD ROUTES
  // ===============================

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;

    if (role) {
      return res.json(await dao.findUsersByRole(role));
    }

    if (name) {
      return res.json(await dao.findUsersByPartialName(name));
    }

    res.json(await dao.findAllUsers());
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const createUser = async (req, res) => {
    const newUser = await dao.createUser(req.body);
    res.json(newUser);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    await dao.updateUser(userId, req.body);

    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...req.body };
    }

    res.json({ status: "OK" });
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  // ===============================
  // 🔹 REGISTER ROUTES
  // ===============================

  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
}
