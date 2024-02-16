// src/routes/companyRoutes.js
const express = require("express");
const router = express.Router();
const companyService = require("../services/companyService");

// Create a Company
router.post("/createCompany", async (req, res) => {
  try {
    const newCompany = await companyService.createCompany(req.body);
    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Error creating company:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Companies by Employees Range
router.get("/getCompanyEmployees", async (req, res) => {
  try {
    const { minEmployees, maxEmployees } = req.query;
    const companies = await companyService.getCompaniesByEmployeesRange(
      minEmployees,
      maxEmployees
    );
    res.json(companies);
  } catch (error) {
    console.error(
      "Error fetching companies by employees range:",
      error.message
    );
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/companies/max-revenue-per-industry", async (req, res) => {
  try {
    const companies =
      await companyService.getCompaniesWithMaxEmployeesPerIndustry();
    res.json(companies);
  } catch (error) {
    console.error(
      "Error fetching companies with max revenue per industry:",
      error.message
    );
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
