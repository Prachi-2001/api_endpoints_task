const express = require("express");
const router = express.Router();
const clientService = require("../services/clientService");

// Create a Client
router.post("/createClient", async (req, res) => {
  try {
    const newClient = await clientService.createClient(req.body);
    res.json(newClient);
  } catch (error) {
    console.error("Error creating client:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/clients/checkCompany", async (req, res) => {
  try {
    const { company } = req.body;

    // Check if the company is already used by other clients
    const existingClient = await Client.findOne({ company });
    if (existingClient) {
      return res
        .status(400)
        .json({ error: "Company is already taken by another client" });
    }

    // Create a new client
    const newClient = await clientService.createClient(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    console.error("Error creating client:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a Client field by ID
router.patch("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that the client exists
    const existingClient = await Client.findById(id);
    if (!existingClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    const updatedClient = await clientService.updateClient(id, req.body);
    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Find Clients by User ID
router.get("/clients/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const clients = await clientService.findClientsByUser(userId);
    res.json(clients);
  } catch (error) {
    console.error("Error finding clients by user ID:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/clients/by-name", async (req, res) => {
  try {
    const { companyName } = req.query;
    const clients = await clientService.findClientsByName(companyName);
    res.json(clients);
  } catch (error) {
    console.error("Error finding clients by company name:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
