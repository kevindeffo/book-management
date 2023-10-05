const app = require('./server')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Book = require('./book_model')

const data = require('./datas')
const books = data.books;
const users = data.users;

// get config vars
dotenv.config();




//CREATE NEW BOOK
app.post('/api/save',authenticateToken, (req, res) => {
    if(req.body.title === null || req.body.author ===null ||  req.body.publishedDate){
        res.status(400).json({message: "The book object is Invalid"});
    }
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate
    });

    book.save().then(r => {
        res.status(200).json("book save successfully");
    }).catch(err => {
        console.log('error:', err)
        res.status(400).json(err)
    });
});


//GET A BOOK WITH HIS ID
app.get('/api/:id',authenticateToken , (req, res) => {
    const id = req.params.id;
    let book ={};

    if(id === null){
        res.status(404).json({message: "The Book ID is null"})
    }

    Book.findById(id).then((result)=>{
        console.log(result)
        res.status(200).json({result});
    })
        .catch((e)=>{
            res.status(404).json({message: "Book not found"})
        })

});


//GET ALL THE BOOKS
app.get('/api',authenticateToken, (req, res) => {
    Book.find().then((result)=>{
        res.status(200).json({result});
    }).catch((e)=>{
        console.log(e);
        res.status(500).json(e)
    })
    // res.status(200).json({books});
});


//UPDATE AN EXISTING BOOK
app.put('/api/:id',authenticateToken, (req, res) => {
    const id = req.params.id

    Book.findByIdAndUpdate(id, req.body)
        .then((r)=>{
            console.log(r);
            res.status(200).json({message: "book update successfully", book: req.body});
    })
        .catch((e)=>{
            console.log(e);
            res.status(500).json({message: "Book not found"})
        })

});


//DELETE A BOOK
app.delete('/api/:id',authenticateToken, (req, res)=>{
    const id = req.params.id

    Book.findOneAndDelete(id).then((r)=>{
        console.log(r);
        res.status(200).json({message: "book delete successfully"});
    }).catch((e)=>{
        console.log(e);
        res.status(500).json({message: "Book not found"})
    })

});


//GENERATE A TOKEN
function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
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

    const token = authHeader && authHeader.split(' ')[1];

    console.log(token)


    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

        if (err) return res.status(403).json({message: err.toString()})
        console.log(err);
        req.user = user

        next()
    })
}
