// server/models/Company.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  industry: {
    type: String,
    required: true,
  },
  employees: {
    type: Number,
    required: true,
  },
});

// Define inverse side relationship named 'users' to retrieve all users for the company
companySchema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "company",
});

module.exports = mongoose.model("Company", companySchema);
