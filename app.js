const app = require('./server')
const data = require('./datas')


app.post('/api/save', (req, res) => {
    res.status(200).json("book save successfully");
})


app.put('/api/:id', (req, res) => {
    res.status(200).json("book update successfully");
})
app.get('/api', (req, res) => {

    const books = data.books
    res.status(200).json({books});
})

app.get('/api/:id', (req, res) => {
    book ={}
    res.status(200).json({book})
})

app.delete('api/:id', (req, res)=>{

})
