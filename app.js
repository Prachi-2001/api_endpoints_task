const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoute");
const clientRoutes = require("./routes/clientRoute");
const companyRoutes = require("./routes/companyRoute");

// Middleware
app.use(express.json());

// Mount routes
app.use("/api", userRoutes);
app.use("/api", clientRoutes);
app.use("/api", companyRoutes);

module.exports = app;
