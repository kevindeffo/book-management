const express = require('express')
const app = express()
const cors = require("cors");
const port = 4000


// formatting incoming data
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.use(cors());

module.exports = app;