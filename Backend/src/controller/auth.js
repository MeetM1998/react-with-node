import authUser from "../models/AuthenticationSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const RegisterUser = async (req, res) => {
  const { name, email, password, password_confirmation, tc } = req.body;
  const user = await authUser.findOne({ email: email });
  if (user) {
    res.send({ status: "failed", message: "Email already exists" });
  } else {
    if (name && email && password && password_confirmation && tc) {
      if (password === password_confirmation) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new authUser({
            name: name,
            email: email,
            password: hashPassword,
            tc: tc,
          });
          await doc.save();
          const saved_user = await authUser.findOne({ email: email });
          // Generate JWT Token
          const token = jwt.sign(
            { userID: saved_user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          res.status(201).send({
            status: "success",
            message: "Registration Success",
            token: token,
          });
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "Unable to Register" });
        }
      } else {
        res.send({
          status: "failed",
          message: "Password and Confirm Password doesn't match",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await authUser.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          // Generate JWT Token
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          res.send({
            status: "success",
            message: "Login Success",
            token: token,
          });
        } else {
          res.send({
            status: "failed",
            message: "Email or Password is not Valid",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "You are not a Registered User",
        });
      }
    } else {
      res.send({ status: "failed", message: "All Fields are Required" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", message: "Unable to Login" });
  }
};

const loggedUser = async (req, res) => {
  res.send({ user: req.user });
};

export { RegisterUser, LoginUser, loggedUser };
