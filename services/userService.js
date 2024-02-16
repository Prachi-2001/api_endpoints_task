const User = require("../models/user");

const userService = {
  getUsers: async (username) => {
    try {
      let query = {};
      if (username) {
        query = { username: { $regex: username, $options: "i" } };
      }
      return await User.find(query);
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  },

  updateUser: async (id, userData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, userData, {
        new: true,
      });
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  },

  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  },
};

module.exports = userService;
