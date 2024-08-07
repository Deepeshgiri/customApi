const express = require('express');
const router = express.Router();
const Holiday = require('../models/holiday');
const Company = require('../models/company');

// Create a new holiday
router.post('/holidayscreate', async (req, res) => {
  try {
    const { holidayDate, refDate, holidayType, holidayName, code, refNum, remarks, companyName } = req.body;

    // Check if companyName is provided
    if (!companyName) {
      return res.status(400).json({ message: 'Company name is required' });
    }

    // Find the company by name
    const company = await Company.findOne({ name: companyName });

    // If company not found, return an error
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Create a new holiday with the company ID
    const holiday = new Holiday({
      holidayDate,
      refDate,
      holidayType,
      holidayName,
      code,
      refNum,
      remarks,
      company: company._id // Use the company's ObjectId
    });

    // Save the holiday
    await holiday.save();

    res.status(201).json(holiday);
  } catch (error) {
    console.error('Error creating holiday:', error);
    res.status(400).json({ message: error.message });
  }
});

// List holidays by company
router.post('/holidayslist', async (req, res) => {
  try {
    const { companyName } = req.body; // Get companyName from request body

    if (!companyName) {
      return res.status(400).json({ message: 'Company name is required' });
    }

    // Find the company by name
    const company = await Company.findOne({ name: companyName });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Create the aggregation pipeline
    const holidays = await Holiday.aggregate([
      {
        $lookup: {
          from: 'companies', // The name of the collection in MongoDB
          localField: 'company', // The field in the holiday document
          foreignField: '_id', // The field in the company document
          as: 'companyInfo' // The name of the new array field to add
        }
      },
      {
        $unwind: {
          path: '$companyInfo',
          preserveNullAndEmptyArrays: true // If you want to include holidays without a company
        }
      },
      {
        $match: {
          'companyInfo.name': companyName
        }
      },
      {
        $project: {
          _id: 1,
          holidayDate: 1,
          refDate: 1,
          holidayType: 1,
          holidayName: 1,
          code: 1,
          refNum: 1,
          remarks: 1,
          company: '$companyInfo.name', // Only include the company name
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    res.json(holidays);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a specific holiday by ID
router.get('/holidays/:id', async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id).populate('company');
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });
    res.json(holiday);
  } catch (error) {
    console.error('Error fetching holiday:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update a holiday
router.put('/holidays/:id', async (req, res) => {
  try {
    const { holidayDate, refDate, holidayType, holidayName, code, refNum, remarks, companyName } = req.body;
    
    // Find the company by name if companyName is provided
    let companyId;
    if (companyName) {
      const company = await Company.findOne({ name: companyName });
      if (!company) return res.status(404).json({ message: 'Company not found' });
      companyId = company._id;
    }

    // Update the holiday
    const updateData = { holidayDate, refDate, holidayType, holidayName, code, refNum, remarks };
    if (companyId) updateData.company = companyId;

    const holiday = await Holiday.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });
    res.json(holiday);
  } catch (error) {
    console.error('Error updating holiday:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a holiday
router.delete('/holidays/:id', async (req, res) => {
  try {
    const holiday = await Holiday.findByIdAndDelete(req.params.id);
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });
    res.json({ message: 'Holiday deleted successfully' });
  } catch (error) {
    console.error('Error deleting holiday:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new company
router.post('/companies', async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all companies
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a specific company by ID
router.get('/companies/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update a company
router.put('/companies/:id', async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a company
router.delete('/companies/:id', async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
