// Import the express module
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

// Load the variable from .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Set EJS as our view engine 
app.set('view engine', 'ejs');

// Enable static file serving
app.use(express.static('public'));

// Allow the app to parse form data (req.body)
app.use(express.urlencoded({ extended: true }));

// Create an array to store orders
const orders = [];

// Define the port number where our server will listen
const PORT = 3000;

// Define a route to test database connection 
app.get('/db-test', async (req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders');
        res.send(orders);
    } catch (err) {
        console.error('Database error:', err);
    }
});

// Define a deafult "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {

    // Send a response to the client
    // res.send('<h1>Welcome to Poppa\'s Pizza!</h1>');
    res.render('home');
});

// Define a "contact-us" route
app.get('/contact-us', (req, res) => {
    res.render('contact');
});

// Define a "confirmation" route
app.get('/confirm', (req, res) => {
    res.render('confirmation');
});

// Define an "admin" route
app.get('/admin', async (req, res) => {

    try {
        const [orders] = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');
        res.render('admin', { orders });
    } catch (err) {
        console.error('Database error:', err);
    }

    //res.send(orders);
    //res.sendFile(`${import.meta.dirname}/views/admin.html`);
});

// Define a "submit-order" route
app.post('/submit-order', async (req, res) => {
    //console.log(req.body);

    // Create a JSON Object to store the data 
    // const order = {
    // fname: req.body.fname,
    // lname: req.body.lname,
    // email: req.body.email,
    // method: req.body.method,
    // toppings: req.body.toppings,
    // size: req.body.size,
    // comment: req.body.comment,
    // timestamp: new Date()
    // };

    const order = req.body;
    order.timestamp = new Date();

    if (Array.isArray(order.toppings)) {
        order.toppings = order.toppings.join(", ");
    } else if (typeof order.toppings === "string") {
        try {
            const parsed = JSON.parse(order.toppings);
            if (Array.isArray(parsed)) {
                order.toppings = parsed.join(", ");
            }
        } catch {
            // not JSON, leave it alone
        }
    }

    // Write a query to insert oder into DB
    const sql = "INSERT INTO orders (fname, lname, email, size, method, toppings, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Create array of parameters for each placeholder
    const params = [
        order.fname,
        order.lname,
        order.email,
        order.size,
        order.method,
        order.toppings,
        order.timestamp
    ];

    try {
        const [result] = await pool.execute(sql, params);

        // Send user to confirmation page
        res.render('confirmation', { order });

    } catch (err) {
        console.log("Database Error");
    }

    // // Add order to array
    // orders.push(order);
    // console.log(orders);
});

// Start the server and listen on the specified port 
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});