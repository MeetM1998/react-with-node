import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import "./src/db/config.js";
import router from "./src/router/index.js";
import authUserRouter from "./src/router/authUser.js";
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
  resp.send("API is running now");
});

app.use("/", authUserRouter);
app.use("/user", router);

app.listen(PORT, () => {
  console.log("server is listing", PORT);
});
