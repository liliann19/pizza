// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Enable static file serving
app.use(express.static('public'));

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

// Start the server and listen on the specified port 
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});