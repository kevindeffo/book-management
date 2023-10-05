const app = require('./server')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const data = require('./datas')
const books = data.books;
const users = data.users;

// get config vars
dotenv.config();




//CREATE NEW BOOK
app.post('/api/save',authenticateToken, (req, res) => {
    books.push(req.body);
    res.status(200).json("book save successfully");
});


//GET A BOOK WITH HIS ID
app.get('/api/:id',authenticateToken , (req, res) => {
    const id = req.params.id
    let book ={}

    //GET  ID OF THE ELEMENT
    let index = books.findIndex(book=> book.id.toString() === id.toString())
    book = books[index];
    res.status(200).json({book});
});


//GET ALL THE BOOKS
app.get('/api',authenticateToken, (req, res) => {
    res.status(200).json({books});
});


//UPDATE AN EXISTING BOOK
app.put('/api/:id',authenticateToken, (req, res) => {
    const id = req.params.id

    //GET  ID OF THE ELEMENT TO UPDATE
    let index = books.findIndex(book => book.id.toString() === id.toString());
    books[index] = req.body;
    res.status(200).json({message: "book update successfully", book: req.body});
});


//DELETE A BOOK
app.delete('/api/:id',authenticateToken, (req, res)=>{
    const id = req.params.id

    //GET  ID OF THE ELEMENT TO DELETE
    let index = books.findIndex(book=> book.id.toString() === id.toString())

    books.splice(index, 1);
    res.status(200).json({message: "book delete successfully"});
});


//GENERATE A TOKEN
function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


app.post('/api/user/signin', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    let index = users.findIndex(user=>user.username === username)
    if(index !== -1){
        if(password === users[index].password){
            const token = generateAccessToken({ username: username });
            res.json(token);
        }else {
            res.status(403).json({message: "Username or password incorrect"});
        }
    }else {
        res.status(403).json({message: "Username or password incorrect"});
    }

});

//VERIFY TOKEN
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    console.log(token);

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}
