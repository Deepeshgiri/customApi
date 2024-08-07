const mongoose = require('mongoose');
const config = require('../config');
 
const connectDB = async () => {
  try {
    await mongoose.connect(config.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Deprecated in mongoose v6+
      // useFindAndModify: false // Deprecated in mongoose v6+
    });
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
