const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const apiRoutes = require('./api/index');
const companyRoutes = require('./routes/companyRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', apiRoutes);
// Routes
app.use('/api', companyRoutes);
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
