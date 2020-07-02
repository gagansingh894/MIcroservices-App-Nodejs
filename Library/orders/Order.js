const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Order = new Schema({
    CustomerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    BookID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Order', Order);
