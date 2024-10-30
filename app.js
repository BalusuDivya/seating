const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For parsing application/json

// Session configuration
app.use(session({
    secret: 'your-secret-key', // Change to a secure secret
    resave: false,
    saveUninitialized: false,
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/arrangement')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Use the auth routes for login and signup
app.use(authRoutes);

// Route for booking seats
app.get('/seats', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'seats.html'));
});

// Route for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Home.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});
// Route for login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});
// Route for events page
app.get('/events', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'events.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
