// server/models/ClientUser.js
const mongoose = require("mongoose");

const clientUserSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
  // Add other clientUser fields here
});

module.exports = mongoose.model("ClientUser", clientUserSchema);
