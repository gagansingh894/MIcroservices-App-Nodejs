const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Book = new Schema( {
    // Title, author, numberofPages, publisher
    title :{
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numOfPages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('Book', Book);