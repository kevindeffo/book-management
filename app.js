const app = require('./server')
const data = require('./datas')
const books = data.books;


//CREATE NEW BOOK
app.post('/api/save', (req, res) => {
    books.push(req.body);
    res.status(200).json("book save successfully");
});


//GET A BOOK WITH HIS ID
app.get('/api/:id', (req, res) => {
    const id = req.params.id
    let book ={}

    //GET  ID OF THE ELEMENT
    let index = books.findIndex(book=> book.id.toString() === id.toString())
    book = books[index];
    res.status(200).json({book});
});


//GET ALL THE BOOKS
app.get('/api', (req, res) => {
    res.status(200).json({books});
});


//UPDATE AN EXISTING BOOK
app.put('/api/:id', (req, res) => {
    const id = req.params.id

    //GET  ID OF THE ELEMENT TO UPDATE
    let index = books.findIndex(book => book.id.toString() === id.toString());
    books[index] = req.body;
    res.status(200).json({message: "book update successfully", book: req.body});
});


//DELETE A BOOK
app.delete('/api/:id', (req, res)=>{
    const id = req.params.id

    //GET  ID OF THE ELEMENT TO DELETE
    let index = books.findIndex(book=> book.id.toString() === id.toString())

    books.splice(index, 1);
    res.status(200).json({message: "book delete successfully"});
});
