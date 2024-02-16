// src/app.js
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoute");
const clientRoutes = require("./routes/clientRoute");

// Middleware
app.use(express.json());

// Mount routes
app.use("/api", userRoutes);
app.use("/api", clientRoutes);

module.exports = app;
