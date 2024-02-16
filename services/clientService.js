// src/services/clientService.js
const Client = require("../models/client");

const clientService = {
  createClient: async (clientData) => {
    try {
      const newClient = new Client(clientData);
      await newClient.save();
      return newClient;
    } catch (error) {
      throw new Error("Error creating client: " + error.message);
    }
  },

  updateClient: async (id, clientData) => {
    try {
      const updatedClient = await Client.findByIdAndUpdate(id, clientData, {
        new: true,
      });
      if (!updatedClient) {
        throw new Error("Client not found");
      }
      return updatedClient;
    } catch (error) {
      throw new Error("Error updating client: " + error.message);
    }
  },
};

module.exports = clientService;
