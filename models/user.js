// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  role: {
    type: String,
    enum: ["ROLE_ADMIN", "ROLE_USER"],
    default: "ROLE_USER",
  },
});

module.exports = mongoose.model("User", userSchema);
