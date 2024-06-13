import express from "express";
import checkUserAuth from "../middlewares/auth-middleware.js";
import { LoginUser, RegisterUser, loggedUser } from "../controller/auth.js";

const authUserRouter = express.Router();

authUserRouter.use("/loggeduser", checkUserAuth);

authUserRouter.post("/register", RegisterUser);
authUserRouter.post("/login", LoginUser);

authUserRouter.get("/loggeduser", loggedUser);

export default authUserRouter;
