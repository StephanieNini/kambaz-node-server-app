import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDao() {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);
  };

  const findAllUsers = () => model.find();
  const findUserById = (id) => model.findById(id);
  const findUserByUsername = (username) => model.findOne({ username });
  const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

  const updateUser = (id, user) =>
    model.updateOne({ _id: id }, { $set: user });

  const deleteUser = (id) => model.deleteOne({ _id: id });

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
