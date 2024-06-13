import express from "express";
import {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
} from "../controller/user.js";

const router = express.Router();

router.get("/getAllUser", getAllUser);

router.post("/createUser", createUser);

router.get("/getUserById/:id", getUserById);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser/:id", deleteUser);

router.get("/search/:key", searchUser);

export default router;
