const express = require('express')
const app = express()
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const uri = "mongodb+srv://deffokevin14:admindb@cluster0.grrpo4s.mongodb.net/?retryWrites=true&w=majority";

try {
    mongoose.connect(uri,{  useNewUrlParser: true})
    console.log('Connexion à MongoDB réussie !')
}catch (e) {
    console.log(e)
    console.log('Connexion à MongoDB échouée !')
}

// get config vars
dotenv.config();

const port = process.env.PORT || 5000


// formatting incoming data
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



//Start application
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.use(cors());

module.exports = app;