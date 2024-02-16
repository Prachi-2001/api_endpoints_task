// src/routes/clientRoutes.js
const express = require("express");
const router = express.Router();
const clientService = require("../services/clientService");

// Create a Client
router.post("/clients", async (req, res) => {
  try {
    const newClient = await clientService.createClient(req.body);
    res.json(newClient);
  } catch (error) {
    console.error("Error creating client:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a Client by ID
router.patch("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClient = await clientService.updateClient(id, req.body);
    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
