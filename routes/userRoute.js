// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.post("/users", async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// List app Users with optional username filter
router.get("/users", async (req, res) => {
  try {
    const { username } = req.query;
    const users = await userService.getUsers(username);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Assume you have a route for updating users using PUT method, e.g., /users/:id
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
