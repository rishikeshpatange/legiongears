// getting-started.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }


}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("User", UserSchema)

