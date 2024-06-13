import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
// mongoose.connect("mongodb://localhost:27017/react-with-node");
const DBConnect = process.env.MONGODB_URI;
mongoose.connect(DBConnect);
