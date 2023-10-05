const express = require('express')
const app = express()
const cors = require("cors");
const port = 4000


// formatting incoming data
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



//Start application
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.use(cors());

module.exports = app;