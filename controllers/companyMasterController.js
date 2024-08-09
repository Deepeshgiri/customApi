const CompanyMaster = require('../models/companyMaster');

// Create a new company
exports.createCompany = async (req, res) => {
    try {
        const company = new CompanyMaster(req.body);
        await company.save();
        res.status(201).send(company);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get companies (based on filters or fetching all)
exports.getCompanies = async (req, res) => {
    try {
        const filters = req.body || {};
        const companies = await CompanyMaster.find(filters);
        res.status(200).send(companies);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a company by ID
exports.updateCompany = async (req, res) => {
    try {
        const { id, update } = req.body;
        const company = await CompanyMaster.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        if (!company) return res.status(404).send('Company not found');
        res.status(200).send(company);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a company by ID
exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.body;
        const company = await CompanyMaster.findByIdAndDelete(id);
        if (!company) return res.status(404).send('Company not found');
        res.status(200).send('Company deleted');
    } catch (error) {
        res.status(500).send(error);
    }
};
