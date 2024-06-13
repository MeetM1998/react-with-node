import { Schema, model } from "mongoose";

const schema = new Schema({
  user: String,
  email: String,
  age: String,
});

export default model("newdatabases", schema);
