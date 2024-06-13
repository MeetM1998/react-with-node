import User from "../models/UserSchema.js";

const getAllUser = async (req, res) => {
  User.find({})
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

const createUser = async (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(
    { _id: id },
    { user: req.body.user, email: req.body.email, age: req.body.age }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

const searchUser = async (req, res) => {
  let result = await User.find({
    $or: [
      { user: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
      { age: { $regex: req.params.key } },
    ],
  });
  res.send(result);
};

export {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
};
