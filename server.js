const express = require('express')
const app = express()
const cors = require("cors");
const dotenv = require('dotenv');

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