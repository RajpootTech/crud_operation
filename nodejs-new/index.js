const express = require('express');
const app = express();
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

const routes = require('./routes/routes');

// middleware

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', routes);




