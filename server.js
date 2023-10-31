const express = require('express');
const cors = require('cors');
const authController = require('./Controllers/authController');
const inventoryController = require("./Controllers/inventoryController");
const customerController = require("./Controllers/customerController")
const orderController = require("./Controllers/ordersController");
const categoryController = require("./Controllers/categoryController")
const mongoose = require('mongoose');

const app = express();

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

const MONGO_URI = 'mongodb+srv://kikbatovski123456:199Farad%21%40@my-store-faradyan.fc1dsgn.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Use the authentication routes
app.use('/auth', authController);
app.use('/inventory', inventoryController);
app.use('/customers', customerController)
app.use('/orders', orderController);
app.use('/categories', categoryController)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
