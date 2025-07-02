const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const config = require('./config/config.json');
const path = require('path');

const { sequelize } = require('./models');
const app = express();

// Middleware
app.set('view engine','ejs')
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => res.redirect('/api/user/get-all-user'));

// Routes
app.use('/api', routes);



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
