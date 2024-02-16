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

  findClientsByUser: async (userId) => {
    try {
      const clients = await Client.find({ user: userId });
      return clients;
    } catch (error) {
      throw new Error("Error finding clients by user ID: " + error.message);
    }
  },

  findClientsByName: async (companyName) => {
    try {
      const clients = await Client.find({
        "company.name": { $regex: companyName, $options: "i" },
      });
      return clients;
    } catch (error) {
      throw new Error(
        "Error finding clients by company name: " + error.message
      );
    }
  },
};

module.exports = clientService;
