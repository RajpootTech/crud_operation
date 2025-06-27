const express = require('express');
const app = express();
const client = require('./database');

// middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {})
app.get('/single-contentshow', (req, res) => {})
app.get('/add-content', (req, res) => {})
app.post('/add-content', (req, res) => {})
app.get('/Update-content', (req, res) => {})
app.post('/Update-content', (req, res) => {})
app.get('/delete-content', (req, res) => {})



app.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM your_table_name');
        res.render('home', { data: result.rows });
    } catch (err) {
        console.error('Query error', err);
        res.status(500).send('Database error');
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});





// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1> <p>This is a simple Node.js application using Express.</p>');
// });

// app.get('/context', (req, res) => {
//     res.send('<h1>Context page</h1> <p>This is a simple Node.js application using Express.</p>');
// });

// app.get('/context/mail', (req, res) => {
//     res.send('<h1>mail page</h1> <p>This is a simple Node.js application using Express.</p>');
// });

// app.set('view engine', 'ejs');

// app.get('/user/:Name-:Fathername-:Age-:status', (req, res) => {
//     res.send(req.params);
// });

// app.get('/search', (req, res) => {
//     const userId = [
//         { Id: 1, Name: 'John', Age: 30, Status: 'Active' },
//         { Id: 2, Name: 'Jane', Age: 25, Status: 'Inactive' },
//         { Id: 3, Name: 'Doe', Age: 22, Status: 'Active' }
//     ];
//     res.json(userId);
// });

// app.get('/about', (req, res) => {
//     res.redirect('http://localhost:3000/Form');
// });


// app.get('/random', (req, res) => {
//     res.render('home');
// });

// app.get('/download', (req, res) => {
//     res.download('./pics/133913510299763573.jpg', 'downloaded_image.jpg');
// });

// app.get('/sendfile', (req, res) => {
//     res.sendFile(__dirname + '/pics/133913510299763573.jpg');
// });

// app.get('/end', (req, res) => {
//     res.write('This is the first line.\n');
//     res.write('This is the second line.\n');
//     res.end();
// });
// app.get('/error', (req, res) => {
//     res.sendStatus(404);
// });