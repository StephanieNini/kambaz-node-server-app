import UsersDao from "./dao.js";

export default function UserRoutes(app) {
  const dao = UsersDao();

  // GET all users
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  // GET user by id
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.id);
    res.json(user);
  };

  // SIGN IN
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);

    if (!currentUser) {
      res.status(401).json({ message: "Invalid login" });
      return;
    }

    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  // SIGN UP
  const signup = async (req, res) => {
    const existing = await dao.findUserByUsername(req.body.username);
    if (existing) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }

    const newUser = await dao.createUser(req.body);
    req.session.currentUser = newUser;
    res.json(newUser);
  };

  // PROFILE
  const profile = async (req, res) => {
    res.json(req.session.currentUser || null);
  };

  // SIGN OUT
  const signout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // UPDATE user
  const updateUser = async (req, res) => {
    const status = await dao.updateUser(req.params.id, req.body);
    res.json(status);
  };

  // DELETE user
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.id);
    res.json(status);
  };

  // register routes
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);
  app.put("/api/users/:id", updateUser);
  app.delete("/api/users/:id", deleteUser);
}
