// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Enable static file serving
app.use(express.static('public'));

// Allow the app to parse form data (req.body)
app.use(express.urlencoded({ extended: true}));

// Create an array to store orders
const orders = [];

// Define the port number where our server will listen
const PORT = 3000;

// Define a deafult "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    
    // Send a response to the client
    // res.send('<h1>Welcome to Poppa\'s Pizza!</h1>');
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

// Define a "contact-us" route
app.get('/contact-us', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

// Define a "confirmation" route
app.get('/confirm', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// Define an "admin" route
app.get('/admin', (req, res) => {
    
    res.send(orders);
    //res.sendFile(`${import.meta.dirname}/views/admin.html`);
});

// Define a "submit-order" route
app.post('/submit-order', (req, res) => {
    //console.log(req.body);

    // Create a JSON Object to store the data 
    const order = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    method: req.body.method,
    toppings: req.body.toppings,
    size: req.body.size,
    comment: req.body.comment
    };

    // Add order to array
    orders.push(order);
    console.log(orders);

    // Send user to confirmation page
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// Start the server and listen on the specified port 
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});