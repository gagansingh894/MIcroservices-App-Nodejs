const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const mongoose = require("mongoose");

const Customer = require("./Customer");
const connectionString = "mongodb+srv://gagan:password123456@cluster0.txmc2.mongodb.net/customerservice?retryWrites=true&w=majority";
mongoose.connect(connectionString, 
    {useUnifiedTopology: true, useNewUrlParser: true}, () => {
        console.log("Database Connected");
    });

// Create Customer
app.post("/customer", (req, res) => {
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    var customer = new Customer(newCustomer);
    customer.save().then(() => {
        console.log("New Customer Created");
        console.log(req.body);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Get Customers
app.get("/customers", (req, res) => {
    Customer.find().then((customers) => {
        console.log(customers);
        res.json(customers);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

//  Get Customer BY ID
app.get("/customer/:id", (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer);
        }
        else {
            res.send("OOPS Wrong ID");
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Delete Customer
app.delete("/customer/:id", (req, res) => {
    Customer.findOneAndRemove(req.params.id).then(() => {
        console.log("Customer removed successfuly");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

// STARTT SERVER
app.listen("5555", () => {
    console.log("Up and running - Customers service")
})