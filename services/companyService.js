// src/services/companyService.js
const Company = require("../models/company");

const companyService = {
  createCompany: async (companyData) => {
    try {
      const newCompany = new Company(companyData);
      await newCompany.save();
      return newCompany;
    } catch (error) {
      throw new Error("Error creating company: " + error.message);
    }
  },

  getCompaniesByEmployeesRange: async (minEmployees, maxEmployees) => {
    try {
      const companies = await Company.find({
        employees: { $gte: minEmployees, $lte: maxEmployees },
      });
      return companies;
    } catch (error) {
      throw new Error(
        "Error fetching companies by employees range: " + error.message
      );
    }
  },
  getCompaniesWithMaxEmployeesPerIndustry: async () => {
    try {
      const companies = await Company.aggregate([
        {
          $group: {
            _id: "$industry",
            maxEmployees: { $max: "$employees" },
            companies: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            _id: 0,
            industry: "$_id",
            maxEmployees: 1,
            companies: {
              $filter: {
                input: "$companies",
                as: "company",
                cond: { $eq: ["$$company.employees", "$maxEmployees"] },
              },
            },
          },
        },
      ]);
      return companies;
    } catch (error) {
      throw new Error(
        "Error fetching companies with max employees per industry: " +
          error.message
      );
    }
  },
};

module.exports = companyService;
