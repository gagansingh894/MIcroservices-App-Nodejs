const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json())

const mongoose = require("mongoose");

// Load Model
// require("./Book");
const Book = require("./Book");
// mongoose.model("Book");
const connectionString = "mongodb+srv://gagan:password123456@cluster0.txmc2.mongodb.net/bookservice?retryWrites=true&w=majority";
mongoose.connect(connectionString, 
    { useUnifiedTopology: true, useNewUrlParser: true}, () => {
        console.log('Database connected');
    });


app.get('/', (req, res) => {
    res.send("This is our main endpoint");
})

// Create book
app.post('/book', (req, res) => {
        var newBook = {
            title: req.body.title,
            author: req.body.author,
            numOfPages: req.body.numOfPages,
            publisher: req.body.publisher
        }
    var book = new Book(newBook);
    book.save().then(() => {
        console.log("New Book Created");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Get Books
app.get('/books', (req, res) => {
    Book.find().then((books) => {
        console.log(books)
        res.json(books)
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Get Book by ID
app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book){
            res.json(book)
        }
        else {
            res.send("OOPS Wrong ID");
        }
    }).catch(err => {
        if(err){
            throw err;
        }
    });
});

app.delete('/book/:id', (req, res) => {
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send("Book removed with success");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

app.listen(4545, () => {
    console.log("Up and running! - Books Service");
})

