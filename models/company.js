const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  foundedYear: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear()
  },
  headquarters: {
    city: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    }
  },
  website: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v)
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  employees: {
    type: Number,
    min: 0
  },
  revenue: {
    type: Number,
    min: 0
  },
  stockSymbol: {
    type: String,
    uppercase: true,
    trim: true
  },
  ceo: {
    type: String,
    trim: true
  },
  products: [{
    type: String,
    trim: true
  }],
  competitors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }],
  socialMedia: {
    facebook: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    instagram: {
      type: String,
      trim: true
    }
  },
  logo: {
    type: String,
    trim: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  fundingRounds: [{
    round: {
      type: String,
      trim: true
    },
    amount: {
      type: Number,
      min: 0
    },
    date: {
      type: Date
    },
    investors: [{
      type: String,
      trim: true
    }]
  }],
  partnerships: [{
    partner: {
      type: String,  // Changed to String
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    }
  }],
  awards: [{
    name: {
      type: String,
      trim: true
    },
    year: {
      type: Number
    },
    description: {
      type: String,
      trim: true
    }
  }],
  sustainability: {
    carbonFootprint: {
      type: Number,
      min: 0
    },
    sustainabilityInitiatives: [{
      type: String,
      trim: true
    }]
  }
}, {
  timestamps: true
})

companySchema.index({ name: 'text', description: 'text', industry: 'text' })

const Company = mongoose.model('Company', companySchema)

module.exports = Company
