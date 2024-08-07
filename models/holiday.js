
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the holiday schema
const holidaySchema = new Schema({
  holidayDate: {
    type: Date,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
 
  refDate: {
    type: Date,
    required: true
  },
  holidayType: {
    type: String,
    enum: ['Public', 'Company', 'Others'],
    required: true
  },
  holidayName: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  refNum: {
    type: String
  },
  remarks: {
    type: String
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export the model
const Holiday = mongoose.model('Holiday', holidaySchema);

module.exports = Holiday;
