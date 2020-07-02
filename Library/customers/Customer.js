const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Customer = new Schema( {
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Customer', Customer);