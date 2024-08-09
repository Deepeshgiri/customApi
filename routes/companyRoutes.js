const express = require('express');
const companyController = require('../controllers/companyMasterController');
const router = express.Router();

router.post('/companies/create', companyController.createCompany);
router.post('/companies/read', companyController.getCompanies);
router.post('/companies/update', companyController.updateCompany);
router.post('/companies/delete', companyController.deleteCompany);

module.exports = router;
