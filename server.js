const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const uri = "mongodb+srv://deffokevin14:admindb@cluster0.grrpo4s.mongodb.net/?retryWrites=true&w=majority";

try {
    mongoose.connect(uri, { useNewUrlParser: true });
    console.log('Connexion à MongoDB réussie !');
} catch (e) {
    console.log(e);
    console.log('Connexion à MongoDB échouée !');
}

// get config vars
dotenv.config();

const port = process.env.PORT || 5000;

// formatting incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable CORS
app.use(cors());

// JWT authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: err.toString() });
        req.user = user;
        next();
    });
}

// Apply authenticateToken middleware before defining routes
app.use(authenticateToken);

// Start application
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = app;