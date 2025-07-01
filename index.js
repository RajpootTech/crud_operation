const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const config = require('./config/config.json');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Start server after DB is ready
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync(); // create tables if not exist
  })
  .then(() => {
    app.listen(8000, () => {
      console.log(`${config.env} server is running on port 8000`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });
