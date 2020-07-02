const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const axios = require("axios");
app.use(bodyParser.json());

const mongoose = require("mongoose");
const Order = require('./Order');
const connectionString = "mongodb+srv://gagan:password123456@cluster0.txmc2.mongodb.net/orderservice?retryWrites=true&w=majority";

mongoose.connect(connectionString, 
    {useUnifiedTopology: true, useNewUrlParser: true}, () => {
        console.log("Database Connected");
    })

// Create new order
app.post("/order", (req, res) => {
    var newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate                
    }
    
    var order = new Order(newOrder);
    order.save().then(() => {
        console.log("Order created with success!");
    }).catch((err) => {
        if(err){
            throw err;
        }
    });     
});

// Get orders
app.get("/orders", (req, res) => {
    Order.find().then((orders) => {
        console.log(orders);
        res.json(orders);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Get order by
app.get("/order/:id", (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if (order) {
            axios.get("http://localhost:5555/customer/" + order.CustomerID).then((response) => {
                
                var orderObject = {customerName: response.data.name, bookTitle: ''}
                
                axios.get("http://localhost:4545/book/" + order.BookID).then((response) => {
                    
                    orderObject.bookTitle = response.data.title
                    res.json(orderObject);
                })
                
            })

        } else {
            res.send('Invalid Order')
        }
    })
})

// START SERVER
app.listen(7777, () => {
    console.log("Up and Running - order service");
})